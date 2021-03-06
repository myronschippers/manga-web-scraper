const puppeteer = require('puppeteer');

// external modules
const logger = require('../utilities/logger');

class MangaScraper {
  constructor() {
    this._baseUrl = 'https://manganelo.com/';
    this._searchParam = 'search/';
    this._searchWords = null;
    this._headlessChrome = {};
    this._isLoaded = false;
  }

  _init() {
    this._loadScan().then((scanner) => {
      this._headlessChrome = scanner;
    });
  }

  // filter for only latest chapters
  _pullOnlyLatestChapters(recentChapters, pastChapters) {
    // exit early if not getting a pastChapters list
    if (!pastChapters || pastChapters.length === 0) {
      return recentChapters;
    }

    let chapterMatchIndex = 0;
    let latestChapters = recentChapters;

    if (pastChapters.length > 0) {
      const lastSavedChapterPos = pastChapters.length - 1;
      const lastSavedChapter = pastChapters[lastSavedChapterPos];

      for (let i = 0; i < recentChapters.length; i++) {
        const chapterForMatch = recentChapters[i];
        if (
          chapterForMatch.title === lastSavedChapter.title &&
          chapterForMatch.name === lastSavedChapter.name
        ) {
          chapterMatchIndex = i;
        }
      }
      latestChapters = recentChapters.slice(chapterMatchIndex + 1);
    }

    return latestChapters;
  }

  /**
   * Takes an incoming array and completely reverses the order of the items
   * in the array.
   * @param {Array} originList
   */
  _reveresListOrder(originList) {
    // reverse array
    const reversedArry = [];
    for (let i = originList.length - 1; i > 0; i--) {
      const chapterData = originList[i];
      reversedArry.push(chapterData);
    }
    return reversedArry;
  }

  async _loadScan() {
    // open the headless browser
    // to run full version of chrome use { headless: false } as launch argument
    const browser = await puppeteer.launch();
    // open a new browser page
    const page = await browser.newPage();

    this._headlessChrome = {
      page,
      browser,
    };
    this._isLoaded = true;
  }

  async _searchMangaSite(formattedSearchTerm) {
    const { page } = this._headlessChrome;

    // enter url in page and navigate to that page
    // Navigates to the search results for the
    await page.goto(
      `https://manganelo.com/search/story/${formattedSearchTerm}`
    );

    const resultsDataList = await page.evaluate(() => {
      const searchResults = document.querySelectorAll(`.search-story-item > a`);
      const resultsList = [];

      searchResults.forEach((item) => {
        const elemSearchItem = item.parentElement;
        const elemAuthor = elemSearchItem.querySelector('.item-author');
        let author = elemAuthor != null ? elemAuthor.title : 'not available';

        resultsList.push({
          path: item.href,
          title: item.title,
          thumbnail: item.children[0] != null ? item.children[0].src : null,
          author,
        });
      });

      return Promise.resolve(resultsList);
    });

    return resultsDataList;

    // await browser.close();
  }

  async _scrapeChapterList(mangaData) {
    const { page } = this._headlessChrome;

    // SEARCH THUMBNAIL >> GOTO RESULT PAGE FOR CHAPTERS

    await page.goto(mangaData.path);
    const mangaChapterList = await page.evaluate(() => {
      const chapterLinks = document.querySelectorAll(
        '.row-content-chapter > li > a.chapter-name'
      );
      const chapterDataList = [];
      chapterLinks.forEach((item) => {
        const rawResultItemData = {
          path: item.href,
          name: item.text,
          title: item.title,
        };

        chapterDataList.push(rawResultItemData);
      });

      return Promise.resolve(chapterDataList);
    });

    return mangaChapterList;
  }

  // load chapter site URL and pull all page images off of the site
  async _scrapePagesForChapter(chapterInfo) {
    const { page } = this._headlessChrome;
    // chapterInfo = {
    //   id: 1,
    //   name: '',
    //   path: '',
    //   sequence: 1,
    //   title: '',
    //   created_at: '',
    //   series_id: 1,
    //   is_read: false,
    // }

    await page.goto(chapterInfo.path);
    const chapterPageImages = await page.evaluate(() => {
      const chapterImageElem = Array.from(
        document.querySelectorAll('.container-chapter-reader > img')
      );
      const chapterImageList = chapterImageElem.map((item) => {
        return {
          origin_img: item.getAttribute('src'),
          alt: item.title,
        };
      });

      return Promise.resolve(chapterImageList);
    });

    // chapterPageImages.forEach(async (pageItem, itemIndex) => {
    //   try {
    //     const viewSource = await page.goto(pageItem.origin_img);
    //     const imageFileName = `series_${chapterInfo.series_id}--chapter_${
    //       chapterInfo.sequence
    //     }--pg_${itemIndex + 1}`;
    //     const imageFilePath = `../page-images/${imageFileName}`;

    //     fs.writeFile(imageFilePath, await viewSource.buffer(), function (err) {
    //       if (err) {
    //         return console.log(err);
    //       }
    //     });

    //     chapterPageImages[itemIndex].img_src = imageFileName;
    //   } catch (err) {
    //     logger.error('_scrapePagesForChapter - ERROR:', err);
    //   }
    // });

    return chapterPageImages;
  }

  async _scrapePagesForChaptersList(mangaChapterList) {
    const { page } = this._headlessChrome;

    mangaChapterList.forEach(async (item, index) => {
      const chapterPath = item.path;
      await page.goto(chapterPath);
      const chapterImagesData = await page.evaluate(() => {
        const chapterImageElem = document.querySelectorAll(
          '.container-chapter-reader > img'
        );
        const chapterImageList = [];
        chapterImageElem.forEach((item) => {
          chapterImageList.push({
            imgSrc: item.scroll,
            title: item.title,
          });
        });

        return Promise.resolve(chapterImageList);
      });

      mangaChapterList[index].images = chapterImagesData;
    });
  }

  async _closeScanner() {
    const { browser } = this._headlessChrome;

    await browser.close();

    this._headlessChrome = {};
    this._isLoaded = false;
  }

  _makeSearchTermParam(searchTerm) {
    let searchParam = searchTerm.replace(' ', '_');
    return searchParam.toLowerCase();
  }

  async _checkBrowser() {
    if (!this._isLoaded) {
      await this._loadScan();
    }
  }

  //
  // PUBLIC METHODS
  // ------------------------------

  async search(searchWords) {
    try {
      this._searchWords = searchWords;
      const searchFormatted = this._makeSearchTermParam(searchWords);

      await this._checkBrowser();

      const searchResults = await this._searchMangaSite(searchFormatted);

      await this._closeScanner();

      return searchResults;
    } catch (err) {
      throw err;
    }
  }

  async chaptersForSeries(seriesData) {
    try {
      await this._checkBrowser();

      const chapterCollection = await this._scrapeChapterList(seriesData);

      await this._closeScanner();

      const reversedArry = this._reveresListOrder(chapterCollection);
      const chaptersToSave = this._pullOnlyLatestChapters(
        reversedArry,
        seriesData.chapters
      );

      return chaptersToSave;
    } catch (errSeries) {
      logger.error('chaptersForSeries - errSeries:', errSeries);
      throw new Error(
        `Failed to scrape chapters for ${seriesData.title}`,
        errSeries
      );
    }
  }

  // Scrape all pages for a single chapter
  async pagesForChapter(chapterData) {
    await this._checkBrowser();

    const pagesResults = await this._scrapePagesForChapter(chapterData);

    await this._closeScanner();

    return pagesResults;
  }

  // TODO: Need to make the function get all pages for all chapters
  async pagesForChapterCollection(chapterCollection) {}

  //
  // KICKOFF FOR SINGLETON
  // ------------------------------

  static createSingleton() {
    return new MangaScraper();
  }
}

// tutorial
// https://blog.bitsrc.io/web-scraping-with-puppeteer-e73e5fee7474

module.exports = MangaScraper.createSingleton();
