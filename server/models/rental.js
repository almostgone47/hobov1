const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rentalSchema = new Schema({
    title: { type: String, required: true, max: [128, 'Too long, max chars is 128!'] },
    city: { type: String, required: true, lowercase: true },
    street: { type: String, required: true, min: [4, 'Too short, must be a minium of 4 chars'] },
    category: { type: String, required: true, lowercase: true },
    image: { type: String, required: true },
    bedrooms: Number,
    shared: Boolean,
    description: { type: String, required: true },
    dailyRate: Number,
    owner: { type: Schema.Types.ObjectId, ref: 'User'},
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Rental',rentalSchema);