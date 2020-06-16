import React, { Component } from 'react'
import DateRangePicker from 'react-bootstrap-daterangepicker';
import HobovModal from '../shared/HobovModal';
import { createBooking, getBookings } from '../../store/actions';

class Booking extends Component {
    constructor() {
        super();
        this.bookedOutDates = [];
        this.state = {
            booking: {
                startAt: '',
                endAt: '',
                price: '',
                nights: '',
                guests: 1,
                rental: '',
                dateString: (new Date()).toLocaleDateString('en-US')
            }
        }
    }

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
                nights: endDay - startDay - 1,
                rental: this.props.rental._id,
                price: this.props.rental.dailyRate
            }
        })
    }

    handleChange = e => {
        this.setState({
            booking: {
                ...this.state.booking,
                [e.target.name] : Number(e.target.value)
            }
        })
    }

    invalidDateHandler = date => {
        return date < new Date();
    }

    get isBookingValid() {
        const { startAt, endAt, guests } = this.state.booking;
        return startAt && endAt && guests && startAt < endAt;
    }

    reserveRental = closeModalCallback => {
        createBooking(this.state.booking);
        closeModalCallback();
    }

    async componentDidMount() {
        const { rental } = this.props;
        console.log('componenetDIdMount: ', this.props)
        this.bookedOutDates = await getBookings(rental._id);
    }

    render() {
        const { rental } = this.props;
        return (
            <div className='booking'>
                <h3 className='booking-price'>${rental.dailyRate}<span className='booking-per-night'> per night</span></h3>
                <hr></hr>
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
                </HobovModal>
                <hr></hr>
                <p className='booking-note-title'>People are interested into this house</p>
                <p className='booking-note-text'>
                    More than 500 people checked this rental in last month.
                </p>
            </div>
        )
    }
}

export default Booking;
