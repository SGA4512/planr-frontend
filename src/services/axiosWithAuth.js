import axios from "axios";

export const axiosWithAuth = () => {
  const token = localStorage.getItem("token");

  return axios.create({
    // baseURL: "https://planr-backend.herokuapp.com/api",
    baseURL: "http://localhost:8000",
    headers: {
      Authorization: token
    }
  });
};
