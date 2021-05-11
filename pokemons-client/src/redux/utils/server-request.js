// Dependencies
import axios from "axios";

const _serverURL = "http://localhost:4000";

export const AxiosPostRequest = (url, payload) => {
	return axios.post(`${_serverURL}${url}`, payload, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
		},
	});
};

export const AxiosGetRequest = (url) => {
	return axios.get(`${_serverURL}${url}`, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
		},
	});
};