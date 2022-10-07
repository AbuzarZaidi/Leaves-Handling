import axios from "axios";
// const url = process.env.REACT_APP_BACKEND_URL+"/user";
const url = "http://localhost:5000/user";
export const myLeaves = (userId) => axios.get(`${url}/previosRequest/${userId}`);
// export const applyForLeave = (user) => axios.post(`${url}/previosRequest`,user);