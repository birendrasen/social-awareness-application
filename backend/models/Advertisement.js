const mongoose = require('mongoose'); // Import mongoose
const { Schema } = mongoose

// Advertisement Model
const advertisementSchema = new Schema({
    business_id: { type: Schema.Types.ObjectId, ref: 'Business', required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    start_date: Date,
    end_date: Date,
    budget: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'active', 'completed'], default: 'pending' }
  });

module.exports = mongoose.model('Advertisement', advertisementSchema);