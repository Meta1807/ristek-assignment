const express = require('express');
const router = express.Router();

const {
  login,
} = require('../queries/queries')
const {
  register,
  createPost,
  editPost,
  removePost,
} = require('../queries/mutations')

/* User login and mutation routes */
router.post('/user/login', async (req, res, next) => {
  const user = await login(req.body.username, req.body.password);
  if (user) {
    req.session.user = user;
    res
      .status(200)
      .json({
        message: "You have successfully logged in!"
      });
  } else {
    res
      .status(401)
      .json({
        message: "You have entered an incorrect username or password."
      });
  }
});

router.post('/user/register', async (req, res, next) => {
  const registerUser = await register(req.body.username, req.body.password);
  if (registerUser) {
    res
      .status(201)
      .json({
        message: "You have successfully registered a new account.",
      });
  } else {
    res
      .status(500)
      .json({
        message: "An error has occurred while creating your account."
      })
  }
});

/* Post mutation routes */
router.post('/post/create', async (req, res, next) => {
  if (req.session.user) {
    const data = {
      title: req.body.title,
      content: req.body.content,
      time: Date.now(),
      authorId: req.session.user.id,
    };
    const createdPost = await createPost(data);
    if (createdPost) {
      res
        .status(201)
        .json({
          message: 'Post successfully created.',
        })
    } else {
      res
        .status(500)
        .json({
          message: 'An error occurred while creating the post.'
        })
    }
  } else {
    res
      .status(401)
      .json({
        message: 'You are not logged in.',
      })
  }
})

router.post('/post/edit', async (req, res, next) => {
  if (req.session.user) {
    const data = {
      title: req.body.title,
      content: req.body.content,
      postId: req.body.postId,
      authorId: req.session.user.id,
    };
    const editedPost = await editPost(data);
    if (editedPost) {
      res
        .status(201)
        .json({
          message: `Post with ID ${data.postId} successfully updated.`,
        })
    } else {
      res
        .status(500)
        .json({
          message: 'An error occurred while updating the post.'
        })
    }
  } else {
    res
      .status(401)
      .json({
        message: 'You are not logged in.',
      })
  }
})

router.post('/post/remove', async (req, res, next) => {
  if (req.session.user) {
    const data = {
      postId: req.body.postId,
      authorId: req.session.user.id,
    };
    const removedPost = await removePost(data);
    if (removedPost) {
      res
        .status(201)
        .json({
          message: `Post with ID ${data.postId} successfully deleted.`,
        })
    } else {
      res
        .status(500)
        .json({
          message: 'An error occurred while updating the post.'
        })
    }
  } else {
    res
      .status(401)
      .json({
        message: 'You are not logged in.',
      })
  }
})

router.post('/comment/create', async (req, res, next) => {
  
})

module.exports = router;
