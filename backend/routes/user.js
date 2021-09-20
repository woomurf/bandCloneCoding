const express = require('express');
const router = express.Router();

router.get('/:id', get = (req, res) => {
  const { id } = req.params;
  try {
    res.json({ id });
  } catch (err) {
    console.error(`Failed to get user ${id} - ${err}`);
    res.status(500).json({
      message: 'Internal server error',
    });
  };
});

module.exports = router;