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