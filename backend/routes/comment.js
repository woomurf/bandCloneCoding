const express = require('express');
const { authValidator } = require('../middleware/auth');
const { POST, USER, COMMENT } = require('../models');
const router = express.Router();

router.post('/', authValidator, async (req, res) => {
  const { user } = res.locals;
  const { content, postId } = req.body;
  try {
    const comment = await COMMENT.create({
      content,
      postId,
      userId: user.id,
    });
    res.json(comment);
  } catch (error) {
    console.error(`[comment] Failed to create comment(post:${postId}) - ${error}`);
    res.status(500).json({
      message: `Failed to create comment(postId: ${postId})`
    });
  }
});

router.put('/:id', authValidator, async (req, res) => {
  const user = res.locals.user;
  const { id } = req.params;
  const { content } = req.body;
  try {
    const comments = await COMMENT.update({
      content
    }, {
      where: {
        id,
        userId: user.id
      },
    });

    if (comments.length !== 1) {
      return res.status(404).json({
        message: `Not found user comments(${id})`,
      });
    }

    res.json({
      message: 'OK'
    });
  } catch (error) {
    console.error(`[comment] Failed to update comment(post:${postId}) - ${error}`);
    res.status(500).json({
      message: `Failed to update comment(postId: ${postId})`
    });
  }
});

router.delete('/:id', authValidator, async (req, res) => {
  const user = res.locals.user;
  const { id } = req.params;
  try {
    const count = await COMMENT.destroy({
      where: {
        id,
        userId: user.id
      }
    });

    if (count !== 1) {
      res.status(404).json({
        message: `Not found post(${id}).`,
      });
      return;
    }

    res.json({
      message: 'OK'
    });
  } catch (err) {
    console.error(`[COMMENT][DELETE] ${err}`);
    res.status(500).json({
      message: 'Failed to delete comment.',
    });
  }
});

module.exports = router;
