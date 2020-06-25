const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/dev');
const bodyParser = require('body-parser');
const Rental = require('./models/rental');
const FakeDb = require('./models/seed');
const { onlyAuthUser } = require('./controllers/users');
const { dbErrorHandler } = require('./middleware');
const PORT = process.env.PORT || 3001;

// Routes
const rentalRoutes = require('./routes/rentals');
const userRoutes = require('./routes/users');
const bookingRoutes = require('./routes/bookings');

//Models what happens if I don't require models?????????????????

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // const fakeDb = new FakeDb();
    // fakeDb.seedDb();
  });

const app = express();
// Middleware for req.body property
app.use(bodyParser.json());
app.use(dbErrorHandler);

app.get('/api/v1/secret', onlyAuthUser, (req, res) => {
  return res.json({
    message: 'Shhhh, this is a  secret line!',
    user: res.locals.user,
  });
});
// API Routes
app.use('/api/v1/rentals', rentalRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/bookings', bookingRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
