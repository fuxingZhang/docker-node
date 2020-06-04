'use strict';
const http = require('http');
const { port } = require('./config');
const hostname = '0.0.0.0';
const router = require('./router');

const server = http.createServer(router);

server.timeout = 0;

server.listen(port, hostname, () => {
  console.log(`Server running on port:${port}`);
});