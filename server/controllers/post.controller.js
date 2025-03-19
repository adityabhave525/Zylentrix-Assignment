const Post = require("../models/post.models.js");

async function getAllPosts(req, res) {
  try {
    const posts = await Post.find().populate("author", "email");
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Error in fetching posts" });
  }
}

async function getSinglePost(req, res) {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "Error in fetching posts" });
  }
}

async function createPost(req, res) {
  const { title, content } = req.body;
  try {
    const post = new Post({ title, content, author: req.user.userId });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: "Error while creating post" });
  }
}

async function updatePost(req, res) {
  const { id } = req.params;
  const { title, content } = req.body;
  try {

    const post = await Post.findById(id);
    
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    if (post.author.toString() !== req.user.userId) {
      return res.status(403).json({ error: "Unauthorized: You can only update your own posts" });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ error: "Error updating post" });
  }
}

async function deletePost(req, res) {
  const { id } = req.params;
  
  try {
    const post = await Post.findById(id);
    
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    if (post.author.toString() !== req.user.userId) {
      return res.status(403).json({ error: "Unauthorized: You can only delete your own posts" });
    }
    
    await Post.findByIdAndDelete(id);
    
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error("Error in deletePost:", err);
    res.status(500).json({ error: "Error while deleting post" });
  }
}

module.exports = {
  getAllPosts,
  getSinglePost,
  createPost,
  updatePost,
  deletePost,
};
