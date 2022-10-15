import * as api from "../api/auth";
export const login = async (user) => {
    try {
      const response   = await api.login(user);
      return response.data;
    } catch (error) {
      return (error.response.data);
    }
  };