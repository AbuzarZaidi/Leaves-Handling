import axios from "axios";
const url = "http://localhost:5000/admin";
export const allEmployees = () => axios.get(`${url}/usersList`);
export const deleteEmployee = (id) => axios.delete(`${url}/deleteUser/${id}`);
export const editEmployee = (id,user) => axios.patch(`${url}/editUser/${id}`,user);
export const createEmployee = (user) => axios.post(`${url}/createUser`,user);
export const getEmployees=()=>axios.get(`${url}/getEmployeesName`)
// export const applyForLeave = (leave,userId) => axios.post(`${url}/leaveRequest/${userId}`,leave);
// export const getManagers=()=>axios.get(`${url}/getMangersName`)