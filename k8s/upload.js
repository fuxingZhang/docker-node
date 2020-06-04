const fs = require('fs');

async function upload(filepath, filename, minio) {
  const stream = fs.createReadStream(filepath);
  const stats = fs.promises.stat(filepath);
  await minio.putObject('images', filename, stream, stats.size);
}

module.exports = upload