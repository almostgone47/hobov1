import React from 'react';
import { useForm } from 'react-hook-form';
import { sameAs } from '../../helpers/validators';

const EMAIL_PATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const RegisterForm = ({registerUser}) => {

    const { register, errors, handleSubmit, getValues } = useForm();
    // Check react-hook-form documentation to see how form/inputs work
    return (
        <form onSubmit={handleSubmit(registerUser)}>
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                    ref={register({required: true })}
                    name="username" 
                    type="text"
                    className="form-control"
                    id="username" />
                    { errors.username &&
                        <div className="alert alert-danger">
                            {errors.username.type === 'required' && <span>Username is required!</span>}
                        </div>
                    }
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    ref={register({
                        required: "Email is required", 
                        pattern: { value: EMAIL_PATTERN, message: "Invalid email format"} })}
                    name="email" 
                    type="email"
                    className="form-control"
                    id="email" />
                    { errors.email  &&
                    <div className="alert alert-danger">
                        { errors.email.type === 'required' && 
                            <span>Email is required!</span> }
                        { errors.email.type === 'pattern' && 
                            <span>This is not a valid email format!</span> }
                    </div>
                    }
            </div>

            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    ref={register({required: true, minLength: 6})}
                    name="password" 
                    type="password"
                    className="form-control"
                    id="password" />
                    { errors.password &&
                    <div className="alert alert-danger">
                        {errors.password.type === 'required' && <span>Password is required!</span>}
                        {errors.password.type === 'minLength' && <span>Password must be at least 6 characters.</span>}
                    </div>
                    }
            </div>

            <div className="form-group">
                <label htmlFor="passwordConfirmation">Confirm Password</label>
                <input
                    ref={register({required: true, validate: {sameAs: sameAs('password', getValues)} })}
                    name="passwordConfirmation" 
                    type="password"
                    className="form-control"
                    id="passwordConfirmation"
                    />
                    { errors.passwordConfirmation &&
                    <div className="alert alert-danger">
                        {errors.passwordConfirmation.type === 'required' && <span>Password confirmation is required!</span>}
                        {errors.passwordConfirmation.type === 'sameAs' && <span>Password confirmation must be the same as password.</span>}
                    </div>
                }
            </div>
            <button 
            type="submit" 
            className="btn btn-main">Submit</button>
        </form>
    )
}


export default RegisterForm
