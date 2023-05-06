import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import Validation from './Validation';

function Register(){

    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const [errors, setErrors] = useState({})

    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values));
    }

    return(
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2>Register</h2>
                <form action="" onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email">Email</label>
                        <input type="email" className='form-control rounded-0' 
                        onChange={handleInput} placeholder="Enter Email" name="email"/>
                        {errors.email && <span className='text-danger'> {errors.email}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password">Password</label>
                        <input type="password" className='form-control rounded-0' 
                        onChange={handleInput} placeholder="Enter Password" name="password"/>
                        {errors.password && <span className='text-danger'>{errors.password}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password">Confirm Password</label>
                        <input type="password" className='form-control rounded-0' 
                        onChange={handleInput} placeholder="Enter Password" name="password"/>
                        {errors.password && <span className='text-danger'>{errors.password}</span>}
                    </div>
                    <button className='btn btn-success w-100'>Register</button>
                    <Link to="/register" className='btn btn-default border w-100 bg-light'>Register</Link>
                </form>
            </div>
        </div>
    )
}

export default Register