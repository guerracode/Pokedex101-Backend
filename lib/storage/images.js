'use strict';

const { join } = require('path');
const { Storage } = require('@google-cloud/storage');
const config = require('../../config/config');

// const GOOGLE_CLOUD_PROJECT = process.env['GOOGLE_CLOUD_PROJECT'];
// const CLOUD_BUCKET = GOOGLE_CLOUD_PROJECT + '_bucket';
// const CLOUD_BUCKET = GOOGLE_CLOUD_PROJECT + config.gcp.bucket;

const gc = new Storage({
  keyFilename: join(__dirname, '../../Pokedex-101-18580e864ee2.json'),
  projectId: config.gcp.project_id,
});
const bucketGC = gc.bucket(config.gcp.bucket);

function sendUploadToGCS(createReadStream, filename) {
  return new Promise(resolve =>
    createReadStream()
      .pipe(
        bucketGC.file(filename).createWriteStream({
          resumable: false,
          gzip: true,
          // public: true,
        })
      )
      .on('finish', resolve(getPublicUrl(filename)))
  );
}

function getPublicUrl(filename) {
  return `https://storage.cloud.google.com/${config.gcp.bucket}/${filename}`;
}

module.exports = {
  sendUploadToGCS,
  getPublicUrl,
};
