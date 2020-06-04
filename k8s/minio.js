const Minio = require('minio')
const ip = "172.24.134.3";

const minio = new Minio.Client({
  endPoint: ip,
  port: 9000,
  useSSL: false,
  accessKey: 'admin',
  secretKey: 'SWJ@ghj9'
});

module.exports = minio