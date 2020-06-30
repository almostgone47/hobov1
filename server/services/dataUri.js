const DatauriParser = require('datauri/parser');
const dUri = new DatauriParser();
const path = require('path');

// converts bugger to 64 bit string to make it compatible with Cloudinary
exports.dataUri = (file) => {
  return dUri.format(path.extname(file.originalname).toString(), file.buffer);
};
