const Booking = require('../models/booking');

exports.getBooking = (req, res) => {
    Booking.find({booking: req.query.bookingId})
        .then(booking => res.send(booking))
        .catch(err => res.status(422).send({errors: [{title: 'Invalid Dates', details: 'Could not retreive the requested booking.'}] }))
}

exports.getBookings = (req, res) => {
    Booking.find({rental: req.query.rentalId})
        .then(bookings => res.send(bookings))
        .catch(err => res.status(422).send({errors: [{title: 'Invalid Dates', details: 'Could not retrieve the requested bookings.'}] }));
};

exports.createBooking = async (req, res) => {
    const bookingData = req.body
    const newBooking = new Booking(bookingData);
    newBooking.user = res.locals.user;
    if (!checkValidBookingDates(newBooking)) {
        return res.status(422).send({errors: [{title: 'Invalid Dates', details: 'The dates requested are invalid dates.'}] });
    };
    
    try {
        const bookings = await Booking.find({rental: newBooking.rental})
        const isValid = checkAvailability(newBooking, bookings);
        if (isValid) {
            const savedBooking = await newBooking.save();
            const allBookings = bookings.concat(savedBooking)
            return res.json({ bookings: allBookings })
        } else {
            return res.status(422).send({errors: [{title: 'Dates Unvailable', details: 'These dates are already booked. Please try different dates.'}]})
        }
    } catch (err) {
        return res.mongoError(err)
    }
}

const checkValidBookingDates = (newBooking) => {
    let isValid = true;
    
    if (!newBooking.startAt || !newBooking.endAt) {
        isValid = false;
    }
    if (newBooking.startAt > newBooking.endAt) {
        isValid = false;
    }
    
    return isValid;
}

const checkAvailability = (newBooking, bookings) => {
    let isValid = true;
    
    if (bookings && bookings.length > 0) {
        isValid = bookings.every(booking => {
            const checkStart = newBooking.startAt;
            const checkEnd = newBooking.endAt;

            const alreadyBookedStart = booking.startAt;
            const alreadyBookedEnd = booking.endAt;

            return ((alreadyBookedStart < checkStart) && alreadyBookedEnd < checkEnd || (checkEnd < alreadyBookedEnd && checkEnd < alreadyBookedStart))
        })

    }

    return isValid;
}