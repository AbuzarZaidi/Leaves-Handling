import axios from "axios";
// const url = process.env.REACT_APP_BACKEND_URL+"/user";
const url = "https://leavesmanagement.herokuapp.com/user"
// const url = "http://localhost:5000/user";
export const login = (user) => axios.post(`${url}/login`,user);