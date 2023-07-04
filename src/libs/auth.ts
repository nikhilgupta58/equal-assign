import axios, { AxiosInstance } from "axios";
import { userStore } from "../store";

let authAxios: AxiosInstance;

export const getProtectedAxios = () => {
  const access_token = userStore.getState().session;

  if (access_token && authAxios) {
    authAxios.defaults.headers = {
      Authorization: `Bearer ${access_token}`,
    };
  }

  if (!authAxios)
    authAxios = axios.create({
      headers: {
        ...(typeof access_token === "string"
          ? {
              Authorization: `Bearer ${access_token}`,
            }
          : {}),
      },
    });
  authAxios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const { status } = error.response;
      switch (status) {
        case 403:
          localStorage.removeItem("equal");
          window.location.replace("/login");
          return;
        default:
          throw error;
      }
    }
  );

  return authAxios;
};
