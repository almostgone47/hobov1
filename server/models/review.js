const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  title: { type: String },
  body: { type: String },
  rating: { type: Number },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  booking: { type: Schema.Types.ObjectId, ref: 'Booking' },
  rental: { type: Schema.Types.ObjectId, ref: 'Rental' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Review', reviewSchema);
