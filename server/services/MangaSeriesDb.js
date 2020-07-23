const pool = require('../modules/pool');

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
    const {
      path,
      thumbnail,
      title,
      author,
    } = seriesData;
    console.log(seriesData);

    const newSeries = await pool.query(queryText, [path, thumbnail, title, author]);

    return newSeries.rows;
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

    let placeHolderCount = 0;
    for (let i = 0; i < chaptersList.length; i++) {
      queryText = `${queryText} (`;

      for (let columnNum in pgPlaceholders) {
        placeHolderCount += 1;
        if (columnNum === 0) {
          queryText = `${queryText}$${placeHolderCount}`;
        } else {
          queryText = `${queryText}, $${placeHolderCount}`;
        }
      }

      const chapterItem = chaptersList[i];
      const chapterDataSet = [
        chapterItem.chapterName,
        chapterItem.path,
        chapterItem.title,
        (i + 1), // sequence should not start at a 0 count
        seriesData.id,
        currentDate,
      ];

      dataForQuery = [
        ...dataForQuery,
        ...chapterDataSet
      ];

      if (i === (chaptersList.length - 1)) {
        queryText = `${queryText});`;
      } else {
        queryText = `${queryText}),`;
      }
    }
    console.log('chapter list - queryText:', queryText);
    console.log('chapter list - dataForQuery:', dataForQuery);

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
    const queryText = `SELECT * FROM "${this.chaptersDb}" WHERE "series_id" = $1;`;

    const seriesDbData = await this.fetchSeries(seriesId);
    const chaptersDbData = await pool.query(queryText, [seriesData]);

    return {
      ...seriesDbData.rows[0],
      chapters: chaptersDbData.rows,
    };
  }

  static createSingleton() {
    return new MangaSeriesDb();
  }
}

module.exports = MangaSeriesDb.createSingleton();
