const express = require('express');
const { FILE } = require('../models');
const { authValidator } = require('../middleware/auth');

const router = express.Router();

router.get('/list', authValidator, async (req, res) => {
  try {
    const files = await FILE.findAll();
    res.status(200).json({
      files
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;