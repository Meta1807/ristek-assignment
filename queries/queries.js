const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

const login = async (username, password) => {
  const user = await prisma.users.findUnique({
    where: {
      username,
    }
  });

  if (user) {
    const correct = await bcrypt.compare(password, user.password);
    if (correct) {
      return {
        id: user.id,
        username: user.username,
      }
    }
    return false;
  }
}

const getAllPosts = async () => {
  const posts = await prisma.posts.findMany();
  return posts;
}

const getPost = async (postId) => {
  const post = await prisma.posts.findUnique({
    where: {
      id: parseInt(postId),
    },
    include: {
      comments: {
        include: {
          users: {
            select: {
              id: true,
              username: true,
            }
          },
        }
      }
    }
  })

  return post;
}

module.exports = {
  login,
  getAllPosts,
  getPost
}