const mongoose = require('mongoose'); // Import mongoose
const { Schema } = mongoose

// Post Model
const postSchema = new Schema({
  campaign_id: { type: Schema.Types.ObjectId, ref: 'Campaign', required: true },
  author_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  media_url: String,
  created_at: { type: Date, default: Date.now },
  likes_count: { type: Number, default: 0 },
  is_pinned: { type: Boolean, default: false },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
});

module.exports = mongoose.model('Post', postSchema);