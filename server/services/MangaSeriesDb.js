const pool = require('../modules/pool');
const { default: logger } = require('redux-logger');

class MangaSeriesDb {
  constructor() {
    this.seriesDb = 'series';
    this.chaptersDb = 'chapters';
    this.pagesDb = 'pages';
  }

  fetchAllSeries() {
    const queryText = `SELECT * FROM "${this.seriesDb}";`;

    return pool.query(queryText);
  }

  fetchSeries(seriesId) {
    const queryText = `SELECT * FROM "${this.seriesDb}"
      WHERE id=$1;`;

    return pool.query(queryText, [seriesId]);
  }

  saveSeries(seriesData) {
    const queryText = `INSERT INTO "${this.seriesDb}" ("path", "thumbnail", "title", "author", "created_at")
      VALUES ($1, $2, $3, $4, current_timestamp);`;
    const {
      path,
      thumbnail,
      title,
      author,
    } = seriesData;
    console.log(seriesData);

    return pool.query(queryText, [path, thumbnail, title, author]);
  }

  saveAllChapters(chaptersList, seriesData) {
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

    return pool.query(queryText, dataForQuery);
  }

  static createSingleton() {
    return new MangaSeriesDb();
  }
}

module.exports = MangaSeriesDb.createSingleton();
