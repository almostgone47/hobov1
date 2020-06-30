const express = require('express');
const router = express.Router();

const { dataUri } = require('../services/dataUri');
const { cloudUpload } = require('../services/cloudinary');
const { onlyAuthUser } = require('../controllers/users');
const upload = require('../services/multer');
const CloudinaryImage = require('../models/cloudinaryImage');

const singleUpload = upload.single('image');

const singleUploadMiddleware = (req, res, next) => {
  singleUpload(req, res, (err) => {
    if (err) {
      return res.send({
        errors: [
          {
            title: 'Could Not Upload Image',
            details: err.message,
          },
        ],
      });
    }
    next();
  });
};

router.post('', onlyAuthUser, singleUploadMiddleware, async (req, res) => {
  try {
    if (!req.file) {
      throw new Error('Image is not present.');
    }
    const file64 = dataUri(req.file);
    const result = await cloudUpload(file64.content);
    const cloudImage = new CloudinaryImage({
      url: result.secure_url,
      cloudinaryId: result.public_id,
    });
    const savedImage = await cloudImage.save();

    res.json({ _id: savedImage.id, url: savedImage.url });
  } catch (err) {
    return res.send({
      errors: [
        {
          title: 'Could Not Upload Image',
          details: err.message,
        },
      ],
    });
  }
});

module.exports = router;
