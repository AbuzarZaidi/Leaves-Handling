import * as api from "../api/admins";
export const allEmployees = async () => {
    try {
      const result= await api.allEmployees();
      return result.data;
    } catch (error) {
      return (error.response.data);
    }
  };
  export const deleteEmployee = async (id) => {
    try {
      const result  = await api.deleteEmployee(id);
      return result.data;
    } catch (error) {
      return (error.response.data);
    }
  };
  export const createEmployee = async (user) => {
    try {
      const result = await api.createEmployee(user);
      return result.data;
    } catch (error) {
      return (error.response.data);
    }
  };
  export const editEmployee = async (id,user) => {
    try {
      const result  = await api.editEmployee(id,user);
      return result.data;
    } catch (error) {
      return (error.response.data);
    }
  };
  export const employeesLeaves = async (id,user) => {
    try {
      const result  = await api.employeesLeaves(id,user);
      return result.data;
    } catch (error) {
      return (error.response.data);
    }
  };
  export const getEmployees= async () => {
    try {
      const  result = await api.getEmployees();
      return result.data;
    } catch (error) {
      return (error.response.data);
    }
  };