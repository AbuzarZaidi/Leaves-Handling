import * as api from "../api/employees";
export const getPreviousLeaves = async (userId) => {
    try {
      const { data } = await api.myLeaves(userId);
      return data;
    } catch (error) {
      console.log(error);
    }
  };