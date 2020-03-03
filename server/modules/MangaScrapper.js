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
        logger.sample('SERVER, page:', page);

        this._headlessChrome = {
            page,
            browser
        };
        this._isLoaded = true;
    }

    async _searchMangaSite(chromePkg) {
        const {
            page,
        } = chromePkg;

        // enter url in page and navigate to that page
        // Navigates to the search results for the 
        await page.goto(`https://manganelo.com/search/solo_leveling`);

        logger.label('PAGE LOADED');
    
        const resultsDataList = await page.evaluate(() => {
            const searchResults = document.querySelectorAll(`.search-story-item > a`);
            const resultsList = [];
            searchResults.forEach((item) => {
                resultsList.push({
                    path: item.href,
                    title: item.title,
                });
            });
    
            return Promise.resolve(resultsList);
        });
        console.log(resultsDataList);
    
        await page.goto(resultsDataList[0].path);
        const mangaChapterList = await page.evaluate(() => {
            const chapterLinks = document.querySelectorAll('.row-content-chapter > li > a.chapter-name');
            const chapterDataList = [];
            chapterLinks.forEach((item) => {
                chapterDataList.push({
                    path: item.href,
                    chapterName: item.text,
                    title: item.title,
                });
            });
    
            return Promise.resolve(chapterDataList);
        });
        console.log(mangaChapterList);
    
        // mangaChapterList.forEach(async (item, index) => {
        //     const chapterPath = item.path;
        //     await page.goto(chapterPath);
        //     const chapterImagesData = await page.evaluate(() => {
        //         const chapterImageElem = document.querySelectorAll('.container-chapter-reader > img');
        //         const chapterImageList = [];
        //         chapterImageElem.forEach((item) => {
        //             chapterImageList.push({
        //                 imgSrc: item.scroll,
        //                 title: item.title,
        //             });
        //         });
    
        //         return Promise.resolve(chapterImageList);
        //     });
    
        //     mangaChapterList[index].images = chapterImagesData;
        // });
    
        // await browser.close();
    }

    async _closeScanner(chromePkg) {
        const {
            browser,
        } = chromePkg;

        await browser.close();

        this._headlessChrome = {};
        this._isLoaded = false;
    }

    _makeSearchTermParam(searchTerm) {
        let searchParam = searchTerm.replace(' ', '_');
        return searchParam.toLowerCase();
    }

    search(searchWords) {
        this._searchWords = searchWords;
        const searchParam = this._makeSearchTermParam(searchWords);
    }

    //
    // GETTERS & SETTERS
    // ------------------------------

    /**
     * Only a getter is needed. External sources are not needed.
     */
    get isLoaded() {
        return this._isLoaded;
    }

    //
    // KICKOFF FOR SINGLETON
    // ------------------------------

    static createSingleton() {
        return new MangaScapper();
    }
}

const searchWord = 'Solo Leveling';
// axios({
//     method: 'POST',
//     url: `https://manganelo.com/getstorysearchjson?searchword=${searchWord}`,
//     accept: `application/json, text/javascript, */*; q=0.01`,
// })
//     .then((searchResponse) => {
//         logger.sample('SEARCH', searchResponse);
//     })
//     .catch((err) => {
//         logger.error(err);
//     });

// tutorial
// https://blog.bitsrc.io/web-scraping-with-puppeteer-e73e5fee7474

module.exports = MangaScapper.createSingleton();
