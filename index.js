const path = require('path');
const { processFiles } = require('./app/api/v1/controllers/fileController');

const inputDir = path.join(__dirname, '.', 'input');
const outputDir = path.join(__dirname, '.', 'output');

processFiles(inputDir, outputDir).catch((err) => console.error(err));
