import React, { Component } from 'react'
import DateRangePicker from 'react-bootstrap-daterangepicker';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import { getBookings, createBooking} from '../../store/actions';
import HobovModal from '../shared/HobovModal';
import Errors from '../shared/Errors';

const moment = extendMoment(Moment);

class Booking extends Component {

    state = {
        booking: {
            startAt: '',
            endAt: '',
            price: '',
            nights: '',
            guests: 1,
            rental: '',
            dateString: (new Date()).toLocaleDateString('en-US')
        },
        bookings: this.props.bookings
    }

    // handles state for all reserveration details except number of guests
    handleDatePicker = (e, picker) => {
        const startDay =  Math.round(new Date(picker.startDate._d)/86400000);
        const endDay = Math.round(new Date(picker.endDate._d)/86400000);
        const startDate = new Date(picker.startDate._d)
        const endDate = new Date(picker.endDate._d)
        this.setState({
            booking: {
                ...this.state.booking,
                startAt: startDate,
                endAt: endDate,
                dateString: `${startDate.toLocaleDateString('en-US')} to ${endDate.toLocaleDateString('en-US')}`,
                nights: endDay - startDay,
                rental: this.props.rental._id,
                price: this.props.rental.dailyRate
            }
        })
    }
    // handles state for number of guests
    handleChange = e => {
        this.setState({
            booking: {
                ...this.state.booking,
                [e.target.name] : Number(e.target.value)
            }
        })
    }
    // checks end date comes after start date
    invalidDateHandler = date => { 
        let isBooked = false;

        isBooked = this.props.bookings.some(booking => 
            moment.range(booking.startAt, booking.endAt).contains(date)
        );
        return date < new Date() || isBooked;
    }
    // checks all required data is provided by user
    get isBookingValid() {
        const { startAt, endAt, guests } = this.state.booking;
        return startAt && endAt && guests && startAt < endAt;
    }
    // creates new bookign and executes callback to close booking modal
    reserveRental = closeModalCallback => {
        this.props.dispatch(createBooking(this.state.booking))
        if (!this.props.errors.length) {
            closeModalCallback();
            toast.success("Success!! You're all booked in!", {
                autoClose: 3000
            })
        }
    }

    // gets bookings for rental for the calendar to use 
    componentDidUpdate(prevProps) {
        if (prevProps.rental !== this.props.rental) {
            this.props.dispatch(getBookings(this.props.rental._id));
        }
    }

    render() {
        const { rental } = this.props;
        return (
            <div className='booking'>
                <h3 className='booking-price'>${rental.dailyRate}<span className='booking-per-night'> per night</span></h3>
                <ToastContainer />
                <hr></hr>
                {!this.props.auth && <Link 
                    to={{pathname: '/login'}}
                    className="btn btn-main btn-block">Login to book this place</Link>
                }
                {this.props.auth &&
                <>
                    <div className='form-group'>
                        <label htmlFor='dates'>Dates</label>
                        <DateRangePicker
                            isInvalidDate={this.invalidDateHandler}
                            onApply={this.handleDatePicker} 
                            opens="left" 
                            containerStyles={{display: 'block'}}>
                            <input
                                placeholder={this.state.booking.dateString}
                                type='text'
                                className='form-control'>
                            </input>
                        </DateRangePicker>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='guests'>Guests</label>
                        <input
                            onChange={this.handleChange} 
                            name="guests"
                            value={this.state.booking.guests}
                            type='number'
                            className='form-control'
                            id='guests'
                            aria-describedby='guests'>
                        </input>
                    </div>
                    <HobovModal
                        onSubmit={this.reserveRental}
                        title="Confirm Booking"
                        openBtn={
                            <button 
                                onClick={this.checkInputHandler}
                                disabled={!this.isBookingValid}
                                className='btn btn-main btn-block'>Reserve place now</button>
                        }
                    >
                        <p><em>Guests: </em>{this.state.booking.guests}</p>
                        <p><em>Nights: </em>{this.state.booking.nights}</p>
                        <p><em>Dates: </em>{this.state.booking.dateString}</p>
                        <p><strong>Total Price: </strong>${this.state.booking.guests * rental.dailyRate * this.state.booking.nights}</p>
                        { this.props.errors ? <Errors errors={this.props.errors} /> : '' }
                    </HobovModal>
                </>
                }
                <hr></hr>
                <p className='booking-note-title'>People are interested into this house</p>
                <p className='booking-note-text'>
                    More than 500 people checked this rental in last month.
                </p>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        rental: state.rentalData.rental,
        bookings: state.bookingData.bookings,
        errors: state.errorData.errors,
        auth: state.auth.currentUser
    }
}

export default connect(mapStateToProps)(Booking);
