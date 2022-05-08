const express = require('express');
const auth = require('../middleware/auth');
const { authValidator } = require('../middleware/auth');
const { POST, POST_LIKE, USER, COMMENT } = require('../models');
const router = express.Router();

router.get('/list', authValidator, async (req, res) => {
  const user = res.locals.user;
  try {
    const posts = await POST.findAll({
      include: {
        model: USER,
        as: 'user',
        attributes: ['id', 'name']
      },
      order: [['createdAt', 'DESC']]
    });

    const postsWithAuthor = posts.map((post) => {
      const postJson = post.toJSON();
      return {
        ...postJson,
        isAuthor: post.user.id === user.id
      }
    });
    res.json(postsWithAuthor);
  } catch (error) {
    console.error(`[POST list] ${error}`);
    res.status(500).json({
      message: 'Failed to get post list'
    });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const post = await POST.findOne({
      where: {
        id,
      },
      include: {
        model: USER,
        as: 'user',
        attributes: ['id', 'name']
      }
    });

    if (!post) {
      res.status(404).json({
        message: `Post(${id}) is not exists.`,
      });
      return;
    }

    // TODO(hyeonwoong): increase view count.

    res.json(post);
  } catch (err) {
    console.error(`[POST][GET] ${err}`);
    res.status(500).json({
      message: 'Failed to get post.',
    });
  }
});

router.post('/', authValidator, async (req, res) => {
  const user = res.locals.user;
  const { groupId, content, files } = req.body;
  // TODO(hyeonwoong): How to save files?
  if (!content) {
    res.status(400).json({
      message: 'Required content'
    });
    return;
  }
  try {
    const post = await POST.create({
      content,
      groupId,
      public: true,
      isPinned: false,
      userId: user.id,
    });

    res.json(post);
  } catch (err) {
    console.error(`[POST][CREATE] ${err}`);
    res.status(500).json({
      message: 'Failed to create post.',
    });
  }
});

router.put('/:id', authValidator, async (req, res) => {
  const user = res.locals.user;
  const { id } = req.params;
  const { title, content, files, public, isPinned } = req.body;
  try {
      if (public !== undefined || isPinned !== undefined) {
      // TODO(hyeonwoong): permission check (admin only can update public & isPinned).
    }
    const posts = await POST.update({
      title,
      content,
      public,
      isPinned,
    }, {
      where: {
        id,
        userId: user.id
      }
    });

    // TODO(hyeonwoong): How to update files?

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

router.delete('/:id', authValidator, async (req, res) => {
  const user = res.locals.user;
  const { id } = req.params;
  try {
    const count = await POST.destroy({
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
    console.error(`[POST][DELETE] ${err}`);
    res.status(500).json({
      message: 'Failed to delete post.',
    });
  }
});

router.post('/:id/like', authValidator, async (req, res) => {
  const user = res.locals.user;
  const { id } = req.params;
  try {
    console.log({ user });
    const post = await POST.findOne({
      where: {
        id,
      }
    });
    if (!post) {
      return res.status(404).json({
        message: 'Post does not exists'
      });
    }
    const postLike = await POST_LIKE.findOne({
      where: {
        id,
        userId: user.id
      }
    });
    if (postLike) {
      return res.status(400).json({
        message: 'Already like post.'
      });
    }
    await POST_LIKE.create({
      postId: id,
      userId: user.id
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

router.post('/:id/unlike', authValidator, async (req, res) => {
  const user = res.locals.user;
  const { id } = req.params;
  try {
    const post = await POST.findOne({
      where: {
        id,
      },
    });
    if (!post) { 
      res.status(404).json({
        message: 'Post does not exists',
      });
      return;
    }
    const postLikes = await POST_LIKE.destroy({
      postId: id,
      userId: user.id,
    })

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

router.get('/:id/comments', authValidator, async (req, res) => {
  console.log('hi');
  const user = res.locals.user;
  const { id } = req.params;
  try {
    const comments = await COMMENT.findAll({
      where: {
        postId: id,
      },
      include: {
        model: USER,
        as: 'user',
        attributes: ['id', 'name']
      }
    });

    const commentsWithAuthor = comments.map((comment) => {
      const commentJson = comment.toJSON();
      return {
        ...commentJson,
        isAuthor: comment.user.id === user.id
      }
    });

    console.log(commentsWithAuthor);

    res.json({ comments: commentsWithAuthor });
    
  } catch (error) {
    console.error(error);
  }
})


module.exports = router;