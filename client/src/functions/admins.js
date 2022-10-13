import * as api from "../api/admins";
export const allEmployees = async () => {
    try {
      const { data } = await api.allEmployees();
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  export const deleteEmployee = async (id) => {
    try {
      const { data } = await api.deleteEmployee(id);
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  export const createEmployee = async (user) => {
    try {
      const { data } = await api.createEmployee(user);
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  export const editEmployee = async (id,user) => {
    try {
      const { data } = await api.editEmployee(id,user);
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  export const employeesLeaves = async (id,user) => {
    try {
      const { data } = await api.employeesLeaves(id,user);
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  export const getEmployees= async () => {
    try {
      const { data } = await api.getEmployees();
      return data;
    } catch (error) {
      console.log(error);
    }
  };