import * as api from "../api/employees";
export const getPreviousLeaves = async (userId) => {
    try {
      const { data } = await api.myLeaves(userId);
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  export const createNewLeaveRequest = async (leave,userId) => {
    try {
      const { data } = await api.applyForLeave(leave,userId);
     
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  export const getManagers = async () => {
    try {
      const { data } = await api.getManagers();
      return data;
    } catch (error) {
      console.log(error);
    }
  };