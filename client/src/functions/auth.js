import * as api from "../api/auth";
export const login = async (user) => {
    try {
      const {data}   = await api.login(user);
      return data;
    } catch (error) {
      return error;
    }
  };