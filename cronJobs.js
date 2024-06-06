const cron = require('node-cron');
const path = require('path');
const { processFiles } = require('./app/api/v1/controllers/fileController');

const inputDir = path.join(__dirname, 'input');
const outputDir = path.join(__dirname, 'output');
console.log(inputDir)
cron.schedule('*/5 * * * *', () => {
  console.log('Checking for new files...');
  processFiles(inputDir, outputDir).catch((err) => console.error(err));
});

console.log('File Handling Application started...');
