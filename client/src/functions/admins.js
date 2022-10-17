import * as api from "../api/admins";
export const allEmployees = async (id) => {
    try {
      const result= await api.allEmployees(id);
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
  export const createEmployee = async (id,user) => {
    try {
      const result = await api.createEmployee(id,user);
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
  export const getEmployees= async (id) => {
    try {
      const  result = await api.getEmployees(id);
      return result.data;
    } catch (error) {
      return (error.response.data);
    }
  };