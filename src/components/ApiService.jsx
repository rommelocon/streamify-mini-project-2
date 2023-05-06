import ApiHost from './ApiHost';

function ApiService(path, formData, responseCallBack, method = 'GET') {
	const apihost = ApiHost();

	if (method === 'GET') {
		fetch(apihost + path, { mode: 'cors' })
			.then((response) => response.json())
			.then((data) => {
				responseCallBack(data);
			})
			.catch((error) => {
				console.log(error.message);
			});
	} else {
		fetch(apihost + path, {
			method: method,
			body: JSON.stringify(formData),
			headers: { 'Content-type': 'application/json; charset=UTF-8' },
		})
			.then((response) => response.json())
			.then((data) => {
				responseCallBack(data);
			})
			.catch((error) => {
				console.log(error.message);
			});
	}
}

export default ApiService;
