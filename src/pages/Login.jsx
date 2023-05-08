import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Validation from './Validation';
import ApiService from '../components/ApiService';

function Login() {
	const [values, setValues] = useState({
		email: '',
		password: '',
	});

	const [errors, setErrors] = useState({});

	const [accounts, setAccounts] = useState([]);

	const getAccountList = () => {
		ApiService('/accounts', null, (data) => {
			setAccounts(data);
		});
	};

	useEffect(() => {
		getAccountList();
	}, []);

	const handleInput = (event) => {
		setValues((prev) => ({
			...prev,
			[event.target.name]: [event.target.value],
		}));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		setErrors(Validation(values));
	};

	console.log(accounts);

	return (
		<div className='flex justify-center align-middle h-auto bg-transparent'>
			<div className='text-white p-3 rounded w-25'>
				<h2 className='text-2xl text-center font-bold p-3'>Login</h2>
				<form action='' onSubmit={handleSubmit}>
					<div className='grid grid-cols-2 gap-4 mb-3 justify-center items-center'>
						<label
							htmlFor='email'
							className='text-base font-semibold tracking-wide'
						>
							Email
						</label>
						<input
							type='email'
							className='flex-1 bg-transparent border-none outline-none placeholder-gray-500 text-base text-white p-4'
							onChange={handleInput}
							placeholder='Enter Email'
							name='email'
						/>
						{errors.email && (
							<span className='text-danger'> {errors.email}</span>
						)}
					</div>
					<div className='grid grid-cols-2 gap-4 mb-3 justify-center items-center'>
						<label
							htmlFor='password'
							className='text-base font-semibold tracking-wide'
						>
							Password
						</label>
						<input
							type='password'
							className='flex-1 bg-transparent border-none outline-none placeholder-gray-500 text-base text-white p-4'
							onChange={handleInput}
							placeholder='Enter Password'
							name='password'
						/>
						{errors.password && (
							<span className='text-danger'>{errors.password}</span>
						)}
					</div>
					<div class='grid grid-cols-2 gap-4 mb-3 justify-center items-center text-center'>
						<button
							type='submit'
							className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded'
						>
							Login
						</button>
						<Link
							to='/register'
							className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded'
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
