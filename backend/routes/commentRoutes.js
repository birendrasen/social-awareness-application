const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// Add a comment
router.post('/', commentController.addComment);

// Get all comments for a specific post
router.get('/:postId', commentController.getCommentsByPostId);

// Update a comment by ID
router.put('/:id', commentController.updateComment);

// Delete a comment by ID
router.delete('/:id', commentController.deleteComment);

module.exports = router;
