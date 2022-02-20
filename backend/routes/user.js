const express = require('express');
const { authValidator } = require('../middleware/auth');
const router = express.Router();
const { USER } = require('../models');

router.get('/:id', authValidator, async (req, res) => {
  const { id } = req.params;
  try {
    const user = await USER.findOne({
      where: {
        id,
      },
      attributes: ['name', 'email'],
    })
    res.json({ user });
  } catch (err) {
    console.error(`Failed to get user ${id} - ${err}`);
    res.status(500).json({
      message: 'Internal server error',
    });
  };
});

module.exports = router;