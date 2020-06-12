const Booking = require('../models/booking');

exports.createBooking = (req, res) => {
    const bookingData = req.body
    const newBooking = new Booking(bookingData);
    newBooking.user = res.locals.user;

    if (!checkValidBookingDates(newBooking)) {
        return res.json({message: 'The dates requested are invalid dates.'})
    };

    Booking.find({rental: newBooking.rental}, (err, bookings) => {
        if (err) { return res.mongoError(err) }
        
        const isValid = checkAvailability(newBooking, bookings);
        if (isValid) {
            
            newBooking.save((err, savedBooking) => {
                if (err) { return res.mongoError(err) }
                return res.json({ startAt: savedBooking.startAt, endAt: savedBooking.endAt })
            })
        } else {
            return res.json({ message: 'These dates are already booked. Please try different dates.'})
        }
    })
}

const checkValidBookingDates = () => {
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