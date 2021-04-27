// Dependencies
import axios from "axios";

const _serverURL = "http://localhost:4000";

export const AxiosPostRequest = async (url, payload) => {
	return await axios.post(`${_serverURL}${url}`, payload, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
		},
	});
};

export const AxiosGetRequest = async (url) => {
	return await axios.get(`${_serverURL}${url}`, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
		},
	});
};
