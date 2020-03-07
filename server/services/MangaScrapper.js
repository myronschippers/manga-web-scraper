const puppeteer = require('puppeteer');
const axios = require('axios');

// external modules
const logger = require('../utilities/logger');

class MangaScapper {
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

    async _loadScan() {
        // open the headless browser
        // to run full version of chrome use { headless: false } as launch argument
        const browser = await puppeteer.launch();
        // logger.sample('SERVER, browser:', browser);
        // open a new browser page
        const page = await browser.newPage();
        // logger.sample('SERVER, page:', page);

        this._headlessChrome = {
            page,
            browser
        };
        this._isLoaded = true;
    }

    async _searchMangaSite(formattedSearchTerm) {
        const {
            page,
        } = this._headlessChrome;

        // enter url in page and navigate to that page
        // Navigates to the search results for the 
        await page.goto(`https://manganelo.com/search/${formattedSearchTerm}`);

        logger.label('SEARCH PAGE LOADED');
    
        const resultsDataList = await page.evaluate(() => {
            const searchResults = document.querySelectorAll(`.search-story-item > a`);
            const resultsList = [];
            searchResults.forEach((item) => {
                resultsList.push({
                    path: item.href,
                    title: item.title,
                    thumbnail: item.children[0] != null ? item.children[0].src : null,
                });
            });
    
            return Promise.resolve(resultsList);
        });

        return resultsDataList;
    
        // await browser.close();
    }

    async _scrapeChapterList(mangaData) {
        const {
            page
        } = this._headlessChrome;

        // SEARCH THUMBNAIL >> GOTO RESULT PAGE FOR CHAPTERS
    
        await page.goto(mangaData.path);
        const mangaChapterList = await page.evaluate(() => {
            const chapterLinks = document.querySelectorAll('.row-content-chapter > li > a.chapter-name');
            const chapterDataList = [];
            chapterLinks.forEach((item) => {
                const rawResultItemData = {
                    path: item.href,
                    chapterName: item.text,
                    title: item.title,
                };

                chapterDataList.push(rawResultItemData);
            });
    
            return Promise.resolve(chapterDataList);
        });

        return mangaChapterList;
    }

    async _scrapePagesForChapter(mangaChapterList) {
        const {
            page
        } = this._headlessChrome;

        mangaChapterList.forEach(async (item, index) => {
            const chapterPath = item.path;
            await page.goto(chapterPath);
            const chapterImagesData = await page.evaluate(() => {
                const chapterImageElem = document.querySelectorAll('.container-chapter-reader > img');
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
        const {
            browser,
        } = this._headlessChrome;

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
            // logger.label('SEARCHING');
            this._searchWords = searchWords;
            // logger.message('searchWords:', searchWords);
            const searchFormatted = this._makeSearchTermParam(searchWords);
            // logger.message('searchFormatted:', searchFormatted);

            await this._checkBrowser();

            const searchResults = await this._searchMangaSite(searchFormatted);

            await this._closeScanner();

            // logger.message('SEARCH RESULTS:');
            // console.log(searchResults)
            // logger.end('SEARCHING');
            return searchResults;
        } catch(err) {
            throw(err);
        }
    }

    async chaptersForSeries(seriesData) {
        try {
            await this._checkBrowser();

            const chapterCollection = await this._scrapeChapterList(seriesData);

            return chapterCollection;
        } catch(errSeries) {
            throw(errSeries);
        }
    }

    // TODO: Need to make function get all of the pages of a single chapter
    async pagesForChapter(chapterData) {}

    // TODO: Need to make the function get all pages for all chapters
    async pagesForChapterCollection(chapterCollection) {}

    //
    // KICKOFF FOR SINGLETON
    // ------------------------------

    static createSingleton() {
        return new MangaScapper();
    }
}

// tutorial
// https://blog.bitsrc.io/web-scraping-with-puppeteer-e73e5fee7474

module.exports = MangaScapper.createSingleton();
