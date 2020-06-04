const fs = require('fs');
const minio = require('./minio');

async function upload(filepath, filename) {
  const stream = fs.createReadStream(filepath);
  const stats = fs.promises.stat(filepath);
  await minio.putObject('images', filename, stream, stats.size);
}

module.exports = upload