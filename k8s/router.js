const upload = require('./upload');
const exec = require('./exec');
const {
  parseBody
} = require('./utils');

async function router(req, res) {
  res.setHeader('Content-Type', 'text/plain');

  const respond = (code, message) => {
    res.statusCode = code;
    res.end(message);
  };

  if (req.method.toLowerCase() !== "post" || req.url !== '/job') {
    return respond(404, 'Not Found');
  };

  try {
    const { containers } = await parseBody(req);

    for (const container of containers) {
      const { id, tag, name } = container;

      await exec(`docker commit ${id} ${tag}`);
      res.write(`commit: ${name}`);

      const imageName = `${name}.tar.gz`;
      const filepath = `./${imageName}`;
      await exec(`docker save -o ${filepath} ${tag}`);
      res.write(`save: ${name}`);

      await upload(filepath, imageName);
      res.write(`upload: ${name}`);
    }

    res.end('over');
  } catch (error) {
    respond(500, error.message);
  }
}

module.exports = router;