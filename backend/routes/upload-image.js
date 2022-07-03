const express = require('express');
const Multer = require('multer');
const path = require('path');
const { authValidator } = require('../middleware/auth');
const { authenticateGoogle, deleteLocalFile, uploadToGoogleDrive } = require('../utils/googleDrive');

const router = express.Router();

const rootDirectory = path.dirname(require.main.filename);

const multer = Multer({
  storage: Multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, `${rootDirectory}/image-files`);
    },
    filename: function (req, file, callback) {
      callback(null, file.fieldname + "_" + Date.now());
    }
  }),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

router.post('/', authValidator, multer.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const auth = authenticateGoogle();
    const filename = `${res.locals.user.name}_${Date.now()}`;
    const url = await uploadToGoogleDrive(req.file, auth, filename);
    deleteLocalFile(req.file.path);
    res.json({ url });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'File upload failed'
    });
  }
});

module.exports = router;
