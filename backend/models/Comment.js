const mongoose = require('mongoose'); // Import mongoose
const { Schema } = mongoose

// Comment Model
const commentSchema = new Schema({
    post_id: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    parent_comment_id: { type: Schema.Types.ObjectId, ref: 'Comment' }
  });

module.exports = mongoose.model('Comment', commentSchema);