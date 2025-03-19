const express = require('express');
const { getAllPosts, getSinglePost, createPost, updatePost, deletePost } = require('../controllers/post.controller.js');
const authMiddleware = require('../middleware/auth.middleware.js');

const router = express.Router();

router.get('/', getAllPosts);
router.get('/:id', getSinglePost);
router.post('/', authMiddleware, createPost);
router.put('/:id', authMiddleware, updatePost);
router.delete('/:id', authMiddleware, deletePost);

module.exports = router;