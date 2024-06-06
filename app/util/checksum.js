const { exec } = require('child_process');

const getMD5Checksum = (filePath) => {
  return new Promise((resolve, reject) => {
    const md5sumPath = "C:/Program Files/Git/usr/bin/md5sum.exe"; // Adjust the path as necessary
    exec(`"${md5sumPath}" "${filePath.replace(/\\/g, '/')}"`, (err, stdout, stderr) => {
      if (err) {
        console.error('Error executing md5sum command:', stderr);
        return reject(err);
      }
      const md5sum = stdout.split(' ')[0]; // Extract MD5 checksum from the output
      resolve(md5sum);
    });
  });
};

module.exports = { getMD5Checksum };
