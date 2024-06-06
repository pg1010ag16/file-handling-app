const fs = require('fs');
const path = require('path');
const { getMD5Checksum } = require('../../../util/checksum');
const { isFileProcessed, splitFile } = require('../services/fileService');
const { exec } = require('child_process');

const processFiles = async (inputDir, outputDir) => {
  const files = fs.readdirSync(inputDir);
  for (const file of files) {
    const filePath = path.join(inputDir, file);

    if (isFileProcessed(filePath, outputDir)) {
      console.log(`File ${file} is already processed.`);
      continue;
    }

    console.log(`Processing file: ${file}`);
    await splitFile(filePath, outputDir);
    console.log(`File ${file} split into chunks.`);

    const originalChecksum = await getMD5Checksum(filePath);
    const outputFilePath = path.join(outputDir, file);
    const combinedFilePath = `${outputFilePath}_combined`;

    const bashPath = '"C:\\Program Files\\Git\\bin\\bash.exe"';
    const command = `${bashPath} -c "cat '${outputFilePath.replace(/\\/g, '/')}part'* > '${combinedFilePath.replace(/\\/g, '/')}'"`;

    exec(command, async (err) => {
      if (err) {
        console.error(`Error combining chunks: ${err}`);
        return;
      }

      const combinedChecksum = await getMD5Checksum(combinedFilePath);
      if (originalChecksum === combinedChecksum) {
        console.log(`Integrity check passed for file: ${file}`);
      } else {
        console.error(`Integrity check failed for file: ${file}`);
      }

      fs.unlinkSync(combinedFilePath);
    });
  }
};

module.exports = { processFiles };
