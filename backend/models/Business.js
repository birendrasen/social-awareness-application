const mongoose = require('mongoose'); // Import mongoose
const { Schema } = mongoose

const businessSchema = new Schema({
    owner_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    description: String,
    contact_info: String,
    website: String,
    category: String,
    location: String,
    advertisements: [{ type: Schema.Types.ObjectId, ref: 'Advertisement' }]
  });

module.exports = mongoose.model('Business', businessSchema);