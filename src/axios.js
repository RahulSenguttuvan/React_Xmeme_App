import axios from 'axios';

const baseURL = 'https://rahulsenguttuvan-xmeme-app.herokuapp.com/memes/';

const axiosInstance = axios.create({
	baseURL: baseURL,
	timeout: 5000,
	headers: {
		'Content-Type': 'application/json',
		accept: 'application/json',
	}, 
});

export default axiosInstance;