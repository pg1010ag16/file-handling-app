const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const isFileProcessed = (filePath, outputDir) => {
  const fileName = path.basename(filePath);
  const outputFilePath = path.join(outputDir, `${fileName}partaa`); // Check for the first chunk
  return fs.existsSync(outputFilePath);
};

const splitFile = (filePath, outputDir) => {
  return new Promise((resolve, reject) => {
    const fileName = path.basename(filePath);
    const inputFilePath = filePath.replace(/\\/g, '/'); // Replace backslashes with forward slashes for Git Bash
    const outputDirPath = outputDir.replace(/\\/g, '/'); // Replace backslashes with forward slashes for Git Bash

    const bashPath = '"C:\\Program Files\\Git\\bin\\bash.exe"';
    const command = `${bashPath} -c "split -b 10M '${inputFilePath}' '${outputDirPath}/${fileName}part'"`;

    exec(command, (err) => {
      if (err) {
        console.error('Error splitting file:', err);
        return reject(err);
      }
      resolve();
    });
  });
};

module.exports = { isFileProcessed, splitFile };
