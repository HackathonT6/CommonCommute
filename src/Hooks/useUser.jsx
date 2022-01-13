import axios from "axios";
import React from "react";

const useUser = () => {
	const [userId, setUserId] = React.useState(null);
	const [currentUser, setCurrentUser] = React.useState(null);
	const [header, setHeader] = React.useState(null);

	const register = async (userCredentials) => {
		try {
			const response = await axios.post(
				"http://localhost:8000/user/signup",
				userCredentials
			);
			alert(`Registration successful: ${response.data.message}`);
			setUserId(response.data.userData._id);
			console.log(response.data);
		} catch (err) {
			alert(`Registration unsuccessful: ${err}`);
		}
	};

	const login = async (userCredentials) => {
		try {
			const response = await axios.post(
				"http://localhost:8000/user/login",
				userCredentials
			);
			alert(`Login successful: ${response.data.message}`);
			console.log(response.data);

			
			const reqHeader = {
				authorization: `Bearer ${response.data.token}`,
			};
			setHeader(reqHeader);
      setUserId(response.data.userData._id);
			setCurrentUser({ ...response.data.userData });
		} catch (err) {
			alert(`Login unsuccessful: ${err.response.data.message}`);
		}
	};

	// const getUserById = async (userId) => {
	// 	try {
	// 		const response = await axios.get(`http://localhost:8000/user/getUserById/${userId}`, {
	//
	// 		});
	// 		alert(`Login successful: ${response.data.message}`);
	// 		console.log(response.data);
	//     setCurrentUser(response.data);
	// 	} catch (err) {
	// 		alert(`Login unsuccessful: ${err.response.data.message}`);
	// 	}
	// };

	const logout = () => {
		setUserId(null);
	};
	return { register, login, logout, userId, currentUser,header };
};

export default useUser;
