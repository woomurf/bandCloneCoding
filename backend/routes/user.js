const express = require('express');
const auth = require('../middleware/auth');
const { authValidator } = require('../middleware/auth');
const router = express.Router();
const { USER } = require('../models');

router.get('/list', authValidator, async (req, res) => {
  try {
    const users = await USER.findAll({
      attributes: ['id', 'email', 'name', 'birth', 'profileImageUrl']
    });
    res.json(users);
  } catch (error) {
    console.error(`[USER] user list error: ${error}`);
    res.status(500).json({
      message: 'Failed to get user list'
    });
  };
});

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

router.put('/:id', authValidator, async (req, res) => {
  const { id } = req.params;
  const { name, birth, profileImageUrl } = req.body;
  try {
    const users = await USER.update({
      name,
      birth,
      profileImageUrl,
    }, {
      where: {
        id,
      }
    });
    if (users.length !== 1) {
      res.status(404).json({
        message: `Cannot found user(${id})`
      });
      return;
    }

    res.json({ message: 'OK' });
  } catch (error) {
    console.error(`Failed to update user(${id}) - ${error}`);
    res.status(500).json({
      message: `Failed to update user(${id})`
    });
  }
});

module.exports = router;