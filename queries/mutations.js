const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

const register = async (username, password) => {
  const register = await prisma.users.create({
    data: {
      username: username,
      password: await bcrypt.hash(password, 10),
    }
  })
  return register;
}

const createPost = async ({
  title,
  content,
  time,
  authorId,
}) => {
  if (title && content && time) {
    const createdPost = await prisma.posts
      .create({
        data: {
          title,
          content,
          time,
          users: {
            connect: {
              id: authorId,
            }
          }
        },
      })
    if (createdPost) {
      return true;
    }
    return false;
  }
  return false;
}


const editPost = async ({
  title,
  content,
  postId,
  authorId,
}) => {
  const postRef = prisma.posts;

  const post = await postRef.findUnique({
    where: {
      id: parseInt(postId)
    }
  })

  if (post.authorId == authorId) {
    const updatePost = await postRef
      .update({
        where: {
          id: post.id,
        },
        data: {
          title,
          content,
        }
      })
    return updatePost;
  } else {
    return false;
  }
}

const removePost = async ({
  postId,
  authorId,
}) => {
  const postRef = prisma.posts;
  
  const post = await postRef
    .findUnique({
      where: {
        id: postId,
      }
    })

  if (post.authorId === authorId) {
    const deleteStatus = await prisma.posts.delete({
      where: {
        id: post.id
      }
    })
    return deleteStatus;
  } else {
    return false;
  }
}

module.exports = {
  register,
  createPost,
  editPost,
  removePost,
}