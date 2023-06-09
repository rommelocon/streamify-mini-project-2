import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
	const [values, setValues] = useState({
		firstName: '',
		lastName: '',
		email: '',
		username: '',
		password: '',
		confirmPassword: '',
	});

	const [passwordMatch, setPasswordMatch] = useState(false);

	const handleInput = (e) => {
		setValues((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));

		if (e.target.name === 'password') {
			setPasswordMatch(e.target.value === values.confirmPassword);
		} else if (e.target.name === 'confirmPassword') {
			setPasswordMatch(e.target.value === values.password);
		}
	};

	const navigate = useNavigate();
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!passwordMatch) {
			// Passwords don't match, display error message or take other action
			alert('Passwords do not match');
			return;
		}

		axios
			.post('http://localhost:8000/register', values)
			.then((res) => {
				if (res.data.Status === 'Success') {
					navigate('/login');
				} else {
					alert('Error');
				}
			})
			.then((err) => console.log(err));
	};
	return (
		<div className='flex justify-center items-center'>
			<div className='text-white p-10 rounded-xl w-full bg-black bg-opacity-20 backdrop-blur-lg'>
				<h2 className='text-2xl text-center font-bold p-3'>Register</h2>
				<form action='' onSubmit={handleSubmit}>
					<div className='grid grid-cols-4 gap-4 mb-3 justify-center items-center'>
						<label
							htmlFor='firstName'
							className='text-base font-semibold tracking-wide'
						>
							First Name
						</label>
						<input
							type='text'
							className='col-span-3 flex-1 bg-transparent border border-gray-600 rounded placeholder-gray-500 text-base text-white p-4 '
							onChange={handleInput}
							placeholder='Enter First Name'
							name='firstName'
						/>
					</div>
					<div className='grid grid-cols-4 gap-4 mb-3 justify-center items-center'>
						<label
							htmlFor='lastName'
							className='text-base font-semibold tracking-wide'
						>
							Last Name
						</label>
						<input
							type='text'
							className='col-span-3 flex-1 bg-transparent border border-gray-600 rounded placeholder-gray-500 text-base text-white p-4 '
							onChange={handleInput}
							placeholder='Enter Last Name'
							name='lastName'
						/>
					</div>
					<div className='grid grid-cols-4 gap-4 mb-3 justify-center items-center'>
						<label
							htmlFor='email'
							className='text-base font-semibold tracking-wide'
						>
							Email
						</label>
						<input
							type='email'
							className='col-span-3 flex-1 bg-transparent border border-gray-600 rounded placeholder-gray-500 text-base text-white p-4 '
							onChange={handleInput}
							placeholder='Enter Email'
							name='email'
						/>
					</div>
					<div className='grid grid-cols-4 gap-4 mb-3 justify-center items-center'>
						<label
							htmlFor='username'
							className='text-base font-semibold tracking-wide'
						>
							Username
						</label>
						<input
							type='text'
							className='col-span-3 flex-1 bg-transparent border border-gray-600 rounded placeholder-gray-500 text-base text-white p-4 '
							onChange={handleInput}
							placeholder='Enter Username'
							name='username'
						/>
					</div>
					<div className='grid grid-cols-4 gap-4 mb-3 justify-center items-center'>
						<label
							htmlFor='password'
							className='text-base font-semibold tracking-wide'
						>
							Password
						</label>
						<input
							type='password'
							className='col-span-3 flex-1 bg-transparent border border-gray-600 rounded placeholder-gray-500 text-base text-white p-4 '
							onChange={handleInput}
							placeholder='Enter Password'
							name='password'
						/>
					</div>
					<div className='grid grid-cols-4 gap-4 mb-3 justify-center items-center'>
						<label
							htmlFor='password'
							className='text-base font-semibold tracking-wide'
						>
							Confirm Password
						</label>
						<input
							type='password'
							className='col-span-3 flex-1 bg-transparent border border-gray-600 rounded placeholder-gray-500 text-base text-white p-4 '
							onChange={handleInput}
							placeholder='Enter Password'
							name='confirmPassword'
						/>
					</div>
					{!passwordMatch && (
						<p className='text-red-500'>Passwords do not match</p>
					)}
					<div class='grid grid-cols-2 gap-4 mb-3 justify-center items-center text-center'>
						<button className='bg-white hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded'>
							Register
						</button>
						<Link
							to='/login'
							className='bg-white hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded'
						>
							Login
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Register;
