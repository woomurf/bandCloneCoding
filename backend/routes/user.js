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

router.get('/search/:name', authValidator, async (req, res) => {
  const { name } = req.params;
  try {
    const Sequelize = require('sequelize');
    const Op = Sequelize.Op;
    const user = await USER.findAll({
      where: {
        name : {
          [Op.like] : `%${name}%` 
        },
      },
      attributes: ['id', 'name', 'email', 'birth', 'profileImageUrl'],
    })
    res.json(user);
  } catch (err) {
    console.error(`Failed to get user ${name} - ${err}`);
    res.status(500).json({
      message: 'Internal server error',
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
      attributes: ['id', 'name', 'email', 'birth', 'profileImageUrl'],
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
    const updateBody = { name, birth, profileImageUrl };
    if (updateBody.birth) {
      updateBody.birth = new Date(birth);
    }
    const users = await USER.update(updateBody, {
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


router.delete('/:id', authValidator, async (req, res) => {
  const { id } = req.params;
  try {
    const user = await USER.destroy({
      where: {
        id,
      }
    });
    
    if (user !== 1) {
      res.status(404).json({
        message: `Cannot found user(${id}).`,
      });
      return;
    }

    res.json({ message: 'OK' });
  } catch (err) {
    console.error(`Failed to delete user(${id}) - ${error}`);
    res.status(500).json({
      message: `Failed to delete user(${id})`
    });
  }
});
module.exports = router;