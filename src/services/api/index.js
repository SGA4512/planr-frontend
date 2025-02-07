import axios from "axios";
import { axiosWithAuth } from "../axiosWithAuth.js";

// const apiUrl = "http://localhost:8000/api";
// const apiUrl = "https://egge-corporate-ep.herokuapp.com/api";
const apiUrl = "https://planr-backend.herokuapp.com/api";

// EVENTS ======================================================
// Read all
export function getEvents() {
  return axiosWithAuth().get(`${apiUrl}/events/`);
}

// Read event
export function getEvent(id) {
  return axiosWithAuth().get(`${apiUrl}/events/${id}`);
}

// Create
export function addEvent(event) {
  return axiosWithAuth().post(`${apiUrl}/events/`, event);
}

// Delete
export function deleteEvent(id) {
  return axiosWithAuth().delete(`${apiUrl}/events/${id}`);
}

// Edit
export function editEvent(id, input) {
  return axiosWithAuth().put(`${apiUrl}/events/${id}`, input);
}

// SHOPPING LIST ======================================================
// Read all
export function getListItems() {
  return axiosWithAuth().get(`${apiUrl}/budget-items/`);
}

// Read
export function getListItem(listId) {
  return axiosWithAuth().get(`${apiUrl}/budget-items/${listId}`);
}

// Create
export function addListItem(listItem) {
  return axiosWithAuth().post(`${apiUrl}/budget-items/`, listItem);
}

// Edit
export function editListItem(listItem) {
  return axiosWithAuth().put(`${apiUrl}/budget-items/${listItem.id}`, listItem);
}

// Delete
export function deleteListItem(listId) {
  return axiosWithAuth().delete(`${apiUrl}/budget-items/${listId}`);
}

// USERS ======================================================
export function refresh() {
  return axios.get(`${apiUrl}/refresh`);
}

export function login(values) {
  return axios.post(`${apiUrl}/users/login`, values);
}

// with cookies/sessions
export function logout() {
  return axios.get(`${apiUrl}/logout`);
}

export function register(values) {
  return axios.post(`${apiUrl}/users/register`, values);
}

// EMULATE A PROMISE
// export function getEvent() {
//   return axios.get(`${apiUrl}/event`);
//
// return new Promise((res, rej) => {
//     res({
//         id: 1,
//         name: "Holiday Party",
//         event_start: "2019-12-20T07:07:07.357Z",
//         event_end: "2019-12-21T07:07:07.357Z",
//         total_budget: 3000,
//         description: "Sit on Santa's lap.",
//         location: {
//             street: "180 street St.",
//             city: "San Francisco",
//             state: "CA",
//             zip_code: "94115",
//             country: "US"
//         },
//         shopping_list: [{
//             id: 10,
//             item_name: "food",
//             cost: 200,
//             completed: false
//         },
//         {
//             id: 20,
//             item_name: "hotel rent",
//             cost: 2000,
//             completed: false
//         }
//         ]
//     })
// })
// }
