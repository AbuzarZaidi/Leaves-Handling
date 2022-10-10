import axios from "axios";
const url = "http://localhost:5000/admin";
export const allEmployees = () => axios.get(`${url}/usersList`);
export const deleteEmployee = (id) => axios.delete(`${url}/deleteUser/${id}`);
// export const applyForLeave = (leave,userId) => axios.post(`${url}/leaveRequest/${userId}`,leave);
// export const getManagers=()=>axios.get(`${url}/getMangersName`)