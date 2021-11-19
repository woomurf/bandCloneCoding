const express = require('express');
const router = express.Router();
const { POST, POST_LIKE } = require('../models');

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const post = await POST.findOne({
      where: {
        id,
      }
    });

    if (!post) {
      res.status(404).json({
        message: `Post(${id}) is not exists.`,
      });
      return;
    }

    // TODO(hyeonwoong): increse view count.

    res.json(post);
  } catch (err) {
    console.error(`[POST][GET] ${err}`);
    res.status(500).json({
      message: 'Failed to get post.',
    });
  }
});

router.post('/', async (req, res) => {
  const { groupId, title, content, files } = req.body;
  try {
    const post = await POST.create({
      title,
      content,
      groupId,
      public: true,
      isPinned: false,
    });

    res.json(post);
  } catch (err) {
    console.error(`[POST][CREATE] ${err}`);
    res.status(500).json({
      message: 'Failed to create post.',
    });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content, files, public, isPinned } = req.body;
  try {
    // TODO(hyeonwoong): permission check.
    
    if (public !== undefined || isPinned !== undefined) {
      // TODO(hyeonwoong): permission check.
    }
    const posts = await POST.update({
      title,
      content,
      public,
      isPinned,
    }, {
      where: {
        id,
      }
    });

    if (posts.length !== 1 ) {
      res.status(404).json({
        message: `Not found post(${id})`,
      });
      return;
    }

    res.json({
      message: 'OK',
    });
  } catch (err) {
    console.error(`[POST][UPDATE] ${err}`);
    res.status(500).json({
      message: 'Failed to update post.',
    });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const count = await POST.destroy({
      where: {
        id,
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
    console.error(`[POST][DELETE] ${err}`);
    res.status(500).json({
      message: 'Failed to delete post.',
    });
  }
});

router.post('/:id/like', async (req, res) => {
  const { id } = req.params;
  try {
    // TODO(hyeonwoong): check if user already like this post.
    const post = await POST.findOne({
      where: {
        id,
      },
    });

    if (!post) { 
      res.status(404).json({
        message: `Not found post(${id}).`,
      });
      return;
    }

    const postLike = await POST_LIKE.create({
      postId: id,
    });

    res.json({
      message: 'OK',
    });
  } catch (err) {
    console.error(`[POST][LIKE] ${err}`);
    res.status(500).json({
      message: 'Failed to like post.',
    });
  }
});

router.post('/:id/unlike', async (req, res) => {
  const { id } = req.params;
  try {
    // TODO(hyeonwoong): check if user like this post.
    const post = await POST.findOne({
      where: {
        id,
      },
    });

    if (!post) { 
      res.status(404).json({
        message: `Not found post(${id}).`,
      });
      return;
    }

    const postLikes = await POST_LIKE.destroy({
      postId: id,
      userId: 3, // user id need.
    });

    if (postLikes.length !== 1) {
      res.status(400).json({
        message: `Not found postLike(${id}).`,
      });
      return;
    }

    res.json({
      message: 'OK',
    });
  } catch (err) {
    console.error(`[POST][UNLIKE] ${err}`);
    res.status(500).json({
      message: 'Failed to unlike post.',
    });
  }
});



module.exports = router;