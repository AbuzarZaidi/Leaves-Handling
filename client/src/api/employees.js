import axios from "axios";
// const url = process.env.REACT_APP_BACKEND_URL+"/user";
const url = "http://localhost:5000/user";
export const myLeaves = (userId) => axios.get(`${url}/previosRequest/${userId}`);
export const applyForLeave = (leave,userId) => axios.post(`${url}/leaveRequest/${userId}`,leave);
export const getManagers=()=>axios.get(`${url}/getMangersName`)
export const changePassword=()=>axios.patch(`${url}/passwordChange`)