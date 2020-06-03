const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/dev');
const Rental = require('./models/rental');
const FakeDb = require('./models/seed');
const PORT = process.env.PORT || 3001;

const rentalRoutes = require('./routes/rentals');

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    // const fakeDb = new FakeDb();
    // fakeDb.seedDb();
});

const app = express();

app.use('/api/v1/rentals', rentalRoutes);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})