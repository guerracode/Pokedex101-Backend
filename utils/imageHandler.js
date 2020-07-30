const image = require('../lib/storage/images');
const errorHandler = require('./errorHandler');

module.exports = async file => {
  let urlImage;

  try {
    const { createReadStream, filename } = await file;
    urlImage = await image.sendUploadToGCS(createReadStream, filename);
  } catch (err) {
    errorHandler(`imageHandler Error: ${err}`, true);
  }
  console.log(`Image URL:: ${urlImage}`);
  return urlImage;
};