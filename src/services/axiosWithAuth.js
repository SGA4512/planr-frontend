import axios from "axios";

export const axiosWithAuth = () => {
  const token = localStorage.getItem("token");

  return axios.create({
    // baseURL: "https://planr-backend.herokuapp.com/api",
    baseURL: "http://localhost:8000",
    headers: {
      Authorization: token,
      AccessControlAllowOrigin: "http://localhost:3000",
      // AccessControlAllowOrigin: "*",
      withCredentials: true
    }
  });
};

export const axiosWithCors = () => {
  return axios.create({
    baseURL: "http://localhost:8000",
    headers: {
      AccessControlAllowOrigin: "http://localhost:3000",
      // AccessControlAllowOrigin: "*",
      withCredentials: true
    }
  });
};
