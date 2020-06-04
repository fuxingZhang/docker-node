const Minio = require('minio')

module.exports = function (config) {
  config.useSSL = false;

  const minio = new Minio.Client(config);

  return minio;
}