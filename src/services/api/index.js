import axios from "axios";

// const apiUrl = "http://localhost:5000/api";
const apiUrl = "https://egge-corporate-ep.herokuapp.com/api";

// EVENTS ======================================================
// Read all
export function getEvents() {
  return axios.get(`${apiUrl}/events/`);
}

// Read event
export function getEvent(id) {
  return axios.get(`${apiUrl}/events/${id}`);
}

// Create
export function addEvent(event) {
  return axios.post(`${apiUrl}/events/`, event);
}

// Delete
export function deleteEvent(id) {
  return axios.delete(`${apiUrl}/events/${id}`);
}

// Edit
export function editEvent(id, input) {
  return axios.put(`${apiUrl}/events/${id}`, input);
}

// SHOPPING LIST ======================================================
// Read all
export function getListItems() {
  return axios.get(`${apiUrl}/lists/`);
}

// Read
export function getListItem(listId) {
  return axios.get(`${apiUrl}/lists/${listId}`);
}

// Create
export function addListItem(listItem) {
  return axios.post(`${apiUrl}/lists/`, listItem);
}

// Edit
export function editListItem(listItem) {
  return axios.put(`${apiUrl}/lists/${listItem.id}`, listItem);
}

// Delete
export function deleteListItem(listId) {
  return axios.delete(`${apiUrl}/lists/${listId}`);
}

// USERS ======================================================
export function refresh() {
  return axios.get(`${apiUrl}/refresh`);
}

export function login(values) {
  return axios.post(`${apiUrl}/login`, values);
}

export function register(values) {
  return axios.post(`${apiUrl}/register`, values);
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
