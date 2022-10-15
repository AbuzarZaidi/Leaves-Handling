import * as api from "../api/employees";
export const getPreviousLeaves = async (userId) => {
    try {
      const result  = await api.myLeaves(userId);
      return result.data;
    } catch (error) {
      return (error.response.data);
    }
  };
  export const createNewLeaveRequest = async (leave,userId) => {
    try {
      const result  = await api.applyForLeave(leave,userId);
     
      return result.data;
    } catch (error) {
      return (error.response.data);
    }
  };
  export const getManagers = async () => {
    try {
      const  result  = await api.getManagers();
      return result.data;
    } catch (error) {
      return (error.response.data);
    }
  };

  export const changePassword = async (data,id) => {
    try {
      const  result  = await api.changePassword(data,id);
      
      return result.data;
    } catch (error) {
      return (error.response.data);
    }
  };