import axios from "axios";
// const url = process.env.REACT_APP_BACKEND_URL+"/user";
const url = "https://leavesmanagement.herokuapp.com/user"
// const url = "http://localhost:5000/user";

export const myLeaves = (userId) => axios.post(`${url}/previosRequest`,{id:userId});
export const applyForLeave = (leave,userId) => axios.post(`${url}/leaveRequest`,{id:userId,data:leave});
export const getManagers=(id)=>axios.post(`${url}/getMangersName`,{id:id})
export const changePassword=(data,id)=>axios.patch(`${url}/passwordChange`,{id:id,data:data})