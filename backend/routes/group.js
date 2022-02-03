const express = require('express');
const router = express.Router();
const { GROUP, POST, MEMBER } = require('../models');

router.get('/:id', async (req,res) => {
  const { id } = req.params;
  try { 
    const group = await GROUP.findOne({
      where: {
        id,
      },
    });
    
    if (!group) {
      res.status(404).json({
        message: `Group(${id}) is not found.`,
      });
      return;
    }

    res.json(group);
  } catch (err) {
    console.error(`[GROUP][GET] ${err}`);
    res.status(500).json({
      message: 'Failed to get group',
    });
  }
});

router.post('/', async (req, res) => {
  const { name, description, profileImageUrl } = req.body;
  try {
    if (!name) {
      res.status(400).json({
        message: 'name is required.'
      });
      return;
    }

    const group = await GROUP.create({
      name,
      description,
      profileImageUrl,
    });

    // TODO(hyeonwoong): make user to member & admin.

    res.json(group);
  } catch (err) {
    console.error(`[GROUP][CREATE] ${err}`);
    res.status(500).json({
      message: 'Failed to create group.'
    });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, profileImageUrl } = req.body;
  try {
    // TODO(hyeonwoong): Need to check permission.

    const groups = await GROUP.update({
      name,
      description,
      profileImageUrl,
    }, {
      where: {
        id,
      }
    });

    if (groups.length !== 1) {
      res.status(404).json({
        message: `Not found group(${id}).`,
      });
      return;
    }

    res.json({
      message: 'OK',
    });
  } catch (err) {
    console.error(`[GROUP][UPDATE] ${err}`);
    res.status(500).json({
      message: 'Failed to update group.'
    });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // TODO(hyeonwoong): Need to check permission.
    // TODO(hyeonwoong): apply transaction.
    const count = await GROUP.destroy({
      where: {
        id,
      }
    });

    if (count !== 1) {
      res.status(404).json({
        message: `Not found group(${id}).`,
      });
      return;
    }

    res.json({
      message: 'OK',
    });
  } catch (err) {
    console.error(`[GROUP][DELETE] ${err}`);
    res.status(500).json({
      message: 'Failed to delete group.'
    });
  }
});

router.get('/:id/posts', async (req, res) => {
  const { id } = req.params;
  try {
    const posts = await POST.findAll({
      where: {
        groupId: id,
      }
    });

    res.json(posts);
  } catch (err) {
    console.error(`[GROUP][POSTS] ${err}`);
    res.status(500).json({
      message: 'Failed to get post list.'
    });
  }
});

router.get('/:id/members', async (req, res) => {
  const { id } = req.params;
  try {
    const members = await MEMBER.findAll({
      where: {
        groupId: id,
      }
    });

    res.json(members);
  } catch (err) {
    console.error(`[GROUP][MEMBERS] ${err}`);
    res.status(500).json({
      message: 'Failed to get group member list.'
    });
  }
});



module.exports = router;