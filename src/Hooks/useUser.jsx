import axios from "axios";
import React from "react";

const useUser = () => {
  const [userId, setUserId] = React.useState(null);
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
      setUserId(response.data.userData._id);
      alert(`Login successful: ${response.data.message}`);
      console.log(response.data);
    } catch (err) {
      alert(`Login unsuccessful: ${err.response.data.message}`);
    }
  };
  const logout = () => {
    setUserId(null);
  };
  return { register, login, logout, userId };
};

export default useUser;
