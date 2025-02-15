
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose'); // Import mongoose
const { Schema } = mongoose

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password_hash: { type: String, required: true },
    full_name: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    created_at: { type: Date, default: Date.now },
    is_verified: { type: Boolean, default: false },
});
  


module.exports = mongoose.model('User', userSchema);

