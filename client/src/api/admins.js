import axios from "axios";
// const url = "http://localhost:5000/admin";
const url = "https://leavesmanagement.herokuapp.com/admin"
export const allEmployees = (id) => axios.post(`${url}/usersList`,{id:id})
export const createEmployee = (id,user) => axios.post(`${url}/createUser`,{id:id,data:user});
export const deleteEmployee = (id,uid) => axios.post(`${url}/deleteUser`,{id:id,uid:uid});
export const editEmployee = (id,uid,user) => axios.patch(`${url}/editUser`,{id:id,uid:uid,data:user});
export const employeesLeaves = (id,data) => axios.post(`${url}/employeesLeaves`,{id:id,data:data});
export const getEmployees=(id)=>axios.post(`${url}/getEmployeesName`,{id:id})
