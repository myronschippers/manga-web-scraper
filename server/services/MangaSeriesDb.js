const pool = require('../modules/pool');

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
    const queryText = `INSERT INTO "series" ("path", "thumbnail", "title", "author", "created_at")
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

  static createSingleton() {
    return new MangaSeriesDb();
  }
}

module.exports = MangaSeriesDb.createSingleton();
