function Validation(values) {
	let error = {};

	const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

	if (values.password === '') {
		error.password = 'Password should not be empty';
	} else if (!password_pattern.test(values.password)) {
		error.password = "Password must contain at least 1 number, 1 lowercase, 1 uppercase, 1 special character and at least 8 characters";
	} else {
		error.password = '';
	}

	if (values.password != values.confirmpassword) {
		error.confirmpassword = "Password does not match!"
	}

	return error;
}

export default Validation;
