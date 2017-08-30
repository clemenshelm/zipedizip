const express = require('express');
const request = require('request-promise');
const JSZip = require("jszip");
const router = express.Router();
const s3Url = 'https://s3.eu-central-1.amazonaws.com/zipedizip/'

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Zipedizip' });
});

const logoFileNames = ['chillbill.png', 'meteor.png', 'react.png', 'viennajs.jpeg'];

router.get('/zip-file.zip', function(req, res, next) {
  const zip = new JSZip();

  const zipPromises = logoFileNames.map(fileName =>
    request({ url: `${s3Url}${fileName}`, encoding: null })
      .then((content) => zip.file(fileName, content)));

  Promise.all(zipPromises).then(() => {
    zip.generateAsync({ type: 'nodebuffer' })
      .then(zipContent => res.end(zipContent));
  });
});

router.get('/zip-file-streamed.zip', function(req, res, next) {
  const zip = new JSZip();

  logoFileNames.forEach(fileName =>
    zip.file(fileName, request({ url: `${s3Url}${fileName}`, encoding: null })));

  zip.generateNodeStream({ streamFiles: true }).pipe(res);
});

module.exports = router;
