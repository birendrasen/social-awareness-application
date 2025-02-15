const mongoose = require('mongoose'); // Import mongoose
const { Schema } = mongoose

const campaignSchema = new Schema({
    creator_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: String,
    status: { type: String, enum: ['draft', 'active', 'completed'], default: 'draft' },
    start_date: Date,
    end_date: Date,
    target_goal: Number,
    category: String,
    image_url: String,
    members: [{ type: Schema.Types.ObjectId, ref: 'CampaignMember' }],
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
  });

module.exports = mongoose.model('Campaign', campaignSchema);