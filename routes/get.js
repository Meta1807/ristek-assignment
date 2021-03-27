const express = require('express');
const router = express.Router();
const {
  getAllPosts,
  getPost,
} = require('../queries/queries')

/* User logout routes */
router.get('/user/logout', async (req, res, next) => {
  if (req.session.user) {
    req.session.destroy();
    res
      .json({
        message: 'You have successfully logged out.'
      })
  } else {
    res.json({
      message: 'You are not logged in.'
    })
  }
});

/* Post fetching routes */
router.get('/post/all', async (req, res, next) => {
  const posts = await getAllPosts();
  res.json(posts);
});

router.get('/post/:postId', async (req, res) => {
  const postId = req.params.postId;
  const post = await getPost(postId);
  if (post) {
    res.json(post);
  } else {
    res
      .status(404)
      .json({
        message: 'The requested post does not exist.',
      });
  }
});

module.exports = router;
