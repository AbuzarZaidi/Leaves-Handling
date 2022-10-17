import axios from "axios";
const url = "http://localhost:5000/admin";
export const allEmployees = (id) => axios.post(`${url}/usersList`,{id:id})
export const createEmployee = (id,user) => axios.post(`${url}/createUser`,{id:id,data:user});
export const deleteEmployee = (id) => axios.delete(`${url}/deleteUser`,{id:id});
export const editEmployee = (id,user) => axios.patch(`${url}/editUser`,{id:id,data:user});

export const employeesLeaves = (id,data) => axios.post(`${url}/employeesLeaves`,{id:id,data:data});
export const getEmployees=(id)=>axios.post(`${url}/getEmployeesName`,{id:id})
// export const applyForLeave = (leave,userId) => axios.post(`${url}/leaveRequest/${userId}`,leave);
// export const getManagers=()=>axios.get(`${url}/getMangersName`)