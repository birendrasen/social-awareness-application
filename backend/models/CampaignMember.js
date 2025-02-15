const mongoose = require('mongoose'); // Import mongoose
const { Schema } = mongoose

// Campaign Member Model
const campaignMemberSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    campaign_id: { type: Schema.Types.ObjectId, ref: 'Campaign', required: true },
    joined_date: { type: Date, default: Date.now },
    role: { type: String, enum: ['member', 'moderator'], default: 'member' }
  });

module.exports = mongoose.model('CampaignMember', campaignMemberSchema);