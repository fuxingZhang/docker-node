const Logger = require('@zhangfuxing/logger');

const logger = new Logger({
  dir: './logs',
  rotate: true
});

module.exports = logger