const express = require('express');
const bodyParser = require('body-parser');

// external modules
const logger = require('./modules/logger');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('build'));

app.listen(PORT, () => {
    logger.edged(`Server is running on port: ${PORT}`);
});
