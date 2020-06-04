const util = require('util');

exports.exec = util.promisify(require('child_process').exec);

exports.parseBody = async function (req) {
  return new Promise((resolve, reject) => {
    const chuncks = [];

    req.on('data', chunck => {
      chuncks.push(chunck);
    });

    req.on('end', () => {
      const data = Buffer.concat(chuncks).toString();
      console.log(data)
      resolve(JSON.parse(data));
    });

    req.on('error', err => {
      reject(err);
    })
  })
};