const downloader = require('image-downloader');
const pool = require('../modules/pool');
const logger = require('../utilities/logger');

class MangaSeriesDb {
  constructor() {
    this.seriesDb = 'series';
    this.chaptersDb = 'chapters';
    this.pagesDb = 'pages';
  }

  /**
   * Retrieve the entire list of series that are currently stored
   * in the database
   */
  async fetchAllSeries() {
    const queryText = `SELECT * FROM "${this.seriesDb}";`;

    const allSeries = await pool.query(queryText);

    return allSeries.rows;
  }

  /**
   * Retrieving a specific series based on the `seriesId` passed
   * @param {number} seriesId
   */
  async fetchSeries(seriesId) {
    const queryText = `SELECT * FROM "${this.seriesDb}"
      WHERE id=$1;`;

    const singleSeries = await pool.query(queryText, [seriesId]);

    return singleSeries.rows;
  }

  /**
   * Saving new series to database.
   * @param {object} seriesData
   */
  async saveSeries(seriesData) {
    const queryText = `INSERT INTO "${this.seriesDb}" ("path", "thumbnail", "title", "author", "created_at")
      VALUES ($1, $2, $3, $4, current_timestamp);`;
    const { path, thumbnail, title, author } = seriesData;

    const newSeries = await pool.query(queryText, [
      path,
      thumbnail,
      title,
      author,
    ]);

    return newSeries.rows;
  }

  // TODO - create private method that creates multiple inserts based on config passed
  _createMultiValueInsert(dataList, tableName, isSequenced) {
    // dataList = [
    //   {} // object must have property keys matching table columns exactly
    // ];
    const columnNames = Object.keys(dataList[0]);
    let queryValues = [];
    let queryText = `INSERT INTO "${tableName}" ("${columnNames.join('", "')}")
    VALUES`;
    let queryValueOrder = 0;

    // ADD COLUMN NAMES TO QUERY
    dataList.forEach((dataForQuery, dataIndex) => {
      queryText = `${queryText}
      (`;
      columnNames.map((columnKey, keyIndex) => {
        queryValues.push(dataForQuery[columnKey]);

        // add value order to query
        queryValueOrder++;
        queryText = `${queryText} $${queryValueOrder}`;
        if (keyIndex !== columnNames.length - 1) {
          queryText = `${queryText},`;
        }
      });

      queryText = `${queryText})`;
      if (dataIndex !== dataList.length - 1) {
        queryText = `${queryText},`;
      }
    });
    queryText = `${queryText};`;

    return {
      query: queryText,
      values: queryValues,
    };
  }

  async saveAllPages(pagesList, chapterData) {
    // pagesList = [
    //   {
    //     origin_img: '',
    //     alt: '',
    //   }
    // ];
    // chapterData = {
    //   id: 1,
    //   name: '',
    //   path: '',
    //   sequence: 1,
    //   title: '',
    //   created_at: '',
    //   series_id: 1,
    //   is_read: false,
    // };
    const pageColumns = {
      sequence: null,
      alt: null,
      origin_img: null,
      img_src: null,
      created_at: new Date(),
      chapter_id: chapterData.id,
    };
    let placeholderCount = 0;

    const fullPageDataList = pagesList.map((originPageData) => {
      // TODO - loop through pages and add to insert queryText
      placeholderCount += 1;
      const imageFileName = `series-${chapterData.series_id}-chapter-${chapterData.sequence}-pg-${placeholderCount}`;
      return {
        ...pageColumns,
        sequence: placeholderCount,
        alt: originPageData.alt,
        origin_img: originPageData.origin_img,
        img_src: `/images/${imageFileName}`,
      };
    });

    const queryDataForDb = this._createMultiValueInsert(
      fullPageDataList,
      this.pagesDb,
      false
    );

    await Promise.resolve(queryDataForDb);
    return queryDataForDb;
    // await pool.query(queryDataForDb.query, queryDataForDb.values);
  }

  /**
   * Saves new chapters for associated series to the database.
   * @param {array.object} chaptersList
   * @param {object} seriesData
   */
  async saveAllChapters(chaptersList, seriesData) {
    let dataForQuery = [];
    let queryText = `INSERT INTO "${this.chaptersDb}"
      ("name", "path", "title", "sequence", "series_id", "created_at")
      VALUES`;
    const currentDate = new Date();
    const pgPlaceholders = [1, 2, 3, 4, 5, 6];
    logger.message('saveAllChapters - seriesData:', seriesData);
    logger.message('saveAllChapters - chaptersList[0]:', chaptersList[0]);

    let placeHolderCount = 0;
    for (let i = 0; i < chaptersList.length; i++) {
      const chapterItem = chaptersList[i];
      let sequenceValue = i + 1;

      if (seriesData.chapters != null && seriesData.chapters.length > 0) {
        const lastSavedChapter =
          seriesData.chapters[seriesData.chapters.length - 1];
        sequenceValue = i + 1 + lastSavedChapter.sequence;
      }

      const chapterDataSet = [
        chapterItem.name, // "name"
        chapterItem.path, // "path"
        chapterItem.title, // "title"
        sequenceValue, // "sequence" (should not start at a 0 count)
        seriesData.id, // "series_id"
        currentDate, // "created_at"
      ];

      dataForQuery = [...dataForQuery, ...chapterDataSet];

      let queryItems = '';
      for (let ii = 0; ii < pgPlaceholders.length; ii++) {
        placeHolderCount += 1;
        if (ii === 0) {
          queryItems = `$${placeHolderCount}`;
        } else {
          queryItems = `${queryItems}, $${placeHolderCount}`;
        }
      }
      queryText = `${queryText} (${queryItems})`;

      if (i === chaptersList.length - 1) {
        queryText = `${queryText};`;
      } else {
        queryText = `${queryText},`;
      }
    }

    // return {
    //   originData: chaptersList,
    //   query: queryText,
    //   data: dataForQuery,
    // }

    const chaptersResponse = await pool.query(queryText, dataForQuery);

    return chaptersResponse.rows;
  }

  /**
   * Retrieving all chapters for a specific series and the series data
   * form the database and then combining both into a single object to
   * send back.
   * @param {number} seriesId
   */
  async fetchSeriesChapters(seriesId) {
    const seriesDbData = await this.fetchSeries(seriesId);

    const queryText = `SELECT * FROM "${this.chaptersDb}" WHERE "series_id" = $1;`;
    const chaptersDbData = await pool.query(queryText, [seriesId]);

    return {
      ...seriesDbData[0],
      chapters: chaptersDbData.rows,
    };
  }

  /**
   * Retrieve all data related to a specific chapter
   * @param {number} chapterId - id value for a specific chapter
   */
  async fetchChapter(chapterId) {
    const queryText = `SELECT * FROM "${this.chaptersDb}" WHERE "id" = $1;`;

    const arrayWithChapter = await pool.query(queryText, [chapterId]);

    return arrayWithChapter.rows[0]; // should be only a single item in the array
  }

  async fetchPagesForChapter(chapterId) {
    const queryText = `SELECT * FROM "${this.pagesDb}" WHERE "chapter_id" = $1;`;
    const pagesList = await pool.query(queryText, [chapterId]);

    return pagesList.rows;
  }

  async fetchChapterWithPages(chapterId) {
    const chapterInfo = await this.fetchChapter(chapterId);
    const pages = await this.fetchPagesForChapter(chapterId);

    return {
      ...chapterInfo,
      pages,
    };
  }

  static createSingleton() {
    return new MangaSeriesDb();
  }
}

module.exports = MangaSeriesDb.createSingleton();
