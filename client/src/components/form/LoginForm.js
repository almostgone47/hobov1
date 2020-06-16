import React from 'react';
import { useForm, ErrorMessage } from 'react-hook-form';

const Error = ({children}) => {
   return <div className="alert alert-danger">{children}</div>
}

const EMAIL_PATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const LoginForm = ({loginUser}) => {

    const { register, handleSubmit, errors } = useForm();
    
    return (
        <form onSubmit={handleSubmit(loginUser)}>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    ref={register({
                        required: "Email is required", 
                        pattern: { value: EMAIL_PATTERN, message: "Invalid email format"} })}
                    name="email" 
                    type="email"
                    className="form-control"
                    id="email"
                    />
                    <ErrorMessage as={<Error />} errors={errors} name="email">
                        {({message}) => <p>{message}</p>}
                    </ErrorMessage>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    ref={register({required: "Password is required", minLength: {value: 6, message: "Minimum characters is 6"} })}
                    name="password" 
                    type="password"
                    className="form-control"
                    id="password"
                    />
                    <ErrorMessage as={<Error />} errors={errors} name="password">
                    {({message}) => <p>{message}</p>}
                    </ErrorMessage>
            </div>
            <button 
            type="submit" 
            className="btn btn-main">Submit</button>
        </form>
    )
}

export default LoginForm
