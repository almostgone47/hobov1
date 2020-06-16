const Booking = require('../models/booking');

exports.getBookings = async (req, res) => {
    const rentalId = req.query.params;
    console.log('RENTAL ID: ', rentalId)
    const bookings = await Booking.find({rental: rentalId});
    console.log('GET BOOKINGS: ', bookings)
}

exports.createBooking = async (req, res) => {
    const bookingData = req.body
    const newBooking = new Booking(bookingData);
    newBooking.user = res.locals.user;
console.log('creating new BOOKING: ', newBooking)
    if (!checkValidBookingDates(newBooking)) {
        return res.json({message: 'The dates requested are invalid dates.'})
    };

    try {
        const bookings = await Booking.find({rental: newBooking.rental})
        const isValid = checkAvailability(newBooking, bookings);
        if (isValid) {
            const savedBooking = await newBooking.save();
            return res.json({ startAt: savedBooking.startAt, endAt: savedBooking.endAt })
        } else {
            return res.json({ message: 'These dates are already booked. Please try different dates.'})
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