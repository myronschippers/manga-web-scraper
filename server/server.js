const express = require('express');

// routes
const scrapperRouter = require('./routes/scapper.router');
const mangaRouter = require('./routes/manga.router');

// external modules
const logger = require('./utilities/logger');

const app = express();
const PORT = process.env.PORT || 5500;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('build'));

// Register Routes
app.use('/api/scraper', scrapperRouter);
app.use('/api/manga', mangaRouter);

app.listen(PORT, () => {
  logger.edged(`Server is running on port: ${PORT}`);
});
