const express = require('express');
const router = express.Router();
const { USER } = require('../models');

router.get('/:id', async (req, res) => {
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

router.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await USER.findOne({
      where: {
        email,
      }
    });

    if (user) {
      res.status(400).json({
        message: `${email} already used.`,
      });
      return;
    }
    const result = await USER.create({
      name,
      email, // TODO: Need to check email format.
      password, // TODO: Need to encryption.
    });
  
    res.json({ id: result.id });
  } catch (e) {
    console.error(`[USER CREATE] failed to create user: ${e}`);
    res.status(500).json({
      message: 'Failed to create user',
    });
  }
});

module.exports = router;