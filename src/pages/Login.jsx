import { useState } from 'react';
import { Link } from 'react-router-dom';
import ApiService from '../components/ApiService';

function Login() {
	const [credentials, setCredentials] = useState({
		email: '',
		password: '',
	});

	const [user, setUser] = useState(null);

	const handleInput = (event) => {
		setCredentials((prev) => ({
			...prev,
			[event.target.name]: event.target.value,
		}));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		ApiService(
			'/accounts/login',
			credentials,
			(data) => {
				setCredentials({ email: '', password: '' });
				setUser(data.user);
			},
			'POST'
		);
	};

	console.log(user);
	return (
		<div className='flex justify-center items-center'>
			<div className='text-white p-10 rounded-xl w-full bg-black bg-opacity-20 backdrop-blur-lg'>
				<h2 className='text-2xl text-center font-bold p-3'>Login</h2>
				<form onSubmit={handleSubmit}>
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
							value={credentials.email}
							onChange={handleInput}
							placeholder='Enter Email'
							name='email'
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
							className='col-span-3 flex-1 bg-transparent border border-gray-600 rounded placeholder-gray-500 text-base text-white p-4'
							value={credentials.password}
							onChange={handleInput}
							placeholder='Enter Password'
							name='password'
						/>

						{user && (
							<div>
								Welcome, {user.firstName} {user.lastName}
							</div>
						)}
					</div>
					<div class='grid grid-cols-2 gap-4 mb-3 justify-center items-center text-center'>
						<button
							type='submit'
							className='bg-white hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded'
						>
							Login
						</button>
						<Link
							to='/register'
							className='bg-white hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded'
						>
							Register
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Login;
