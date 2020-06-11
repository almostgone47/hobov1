import React from 'react';
import { useForm } from 'react-hook-form';


const RentalForm = ({createNewRental}) => {

    const { register, handleSubmit } = useForm();

    const rentalTypes = ['apartment', 'condo', 'house'];

    return (
        <form onSubmit={handleSubmit(createNewRental)}>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                    ref={register}
                    name="title" 
                    type="text"
                    className="form-control"
                    id="title"/>
            </div>

            <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                    ref={register}
                    name="city" 
                    type="text"
                    className="form-control"
                    id="city"/>
            </div>

            <div className="form-group">
                <label htmlFor="street">Street</label>
                <input
                    ref={register}
                    name="street" 
                    type="text"
                    className="form-control"
                    id="street"/>
            </div>

            <div className="form-group">
                <label htmlFor="category">Category</label>

                <select 
                    ref={register}
                    name="category"
                    className="form-control"
                    id="category">
                {
                    rentalTypes.map(type => <option key={type}> {type} </option>)
                }        
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="bedrooms">Image Url</label>
                <input
                    ref={register}
                    name="image" 
                    type="text"
                    className="form-control"
                    id="image"/>
            </div>

            <div className="form-group">
                <label htmlFor="bedrooms">Rooms</label>
                <input 
                    ref={register}
                    name="bedrooms"
                    type="number"
                    className="form-control"
                    id="bedrooms"/>
            </div>

            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                    ref={register}
                    name="description" 
                    rows="5"
                    type="text"
                    className="form-control"
                    id="description">
                </textarea>
            </div>

            <div className="form-group">
                <label htmlFor="dailyRate">Daily Price</label>
                <div className="input-group">
                <div className="input-group-prepend">
                    <div className="input-group-text">$</div>
                </div>
                <input
                    ref={register}
                    name="dailyRate" 
                    type="number"
                    className="form-control"
                    id="dailyRate"/>
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="shared">Shared</label>
                <input
                    ref={register}
                    name="shared" 
                    type="checkbox"
                    className="form-control"
                    id="shared"/>
            </div>
            <button 
                type="submit"
                className="btn btn-bwm-main">Create
            </button>
        </form>
    );
};

export default RentalForm;