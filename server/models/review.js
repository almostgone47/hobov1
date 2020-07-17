const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  title: { type: String },
  body: { type: String },
  aveRating: { type: Number },
  cleanRating: { type: Number, required: true },
  socialRating: { type: Number, required: true },
  comfortRating: { type: Number, required: true },
  locationRating: { type: Number, required: true },
  serviceRating: { type: Number, required: true },
  sleepRating: { type: Number, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  booking: { type: Schema.Types.ObjectId, ref: 'Booking' },
  rental: { type: Schema.Types.ObjectId, ref: 'Rental' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Review', reviewSchema);
