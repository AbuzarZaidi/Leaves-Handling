import * as api from "../api/admins";
export const allEmployees = async (id) => {
    try {
      const result= await api.allEmployees(id);
      return result.data;
    } catch (error) {
      return (error.response.data);
    }
  };
  export const deleteEmployee = async (id,uid) => {
    try {
      const result  = await api.deleteEmployee(id,uid);
      
      return result.data;
    } catch (error) {
      return (error.response.data);
    }
  };
  export const createEmployee = async (id,user) => {
    try {
      const result = await api.createEmployee(id,user);
      return result.data;
    } catch (error) {
      return (error.response.data);
    }
  };
  export const editEmployee = async (id,uid,user) => {
    try {
      const result  = await api.editEmployee(id,uid,user);
      return result.data;
    } catch (error) {
      return (error.response.data)
    }
  };
  export const employeesLeaves = async (id,data) => {
    try {
      const result  = await api.employeesLeaves(id,data);
      return result.data;
    } catch (error) {
      return (error.response.data);
    }
  };
  export const getEmployees= async (id) => {
    try {
      const  result = await api.getEmployees(id);
      return result.data;
    } catch (error) {
      return (error.response.data);
    }
  };