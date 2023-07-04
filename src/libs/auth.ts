import axios, { AxiosInstance } from "axios";
import { userStore } from "../store";
import { header } from "../utils/constants";

let authAxios: AxiosInstance;

export const getProtectedAxios = () => {
  const session = userStore.getState().session;

  if (session && authAxios) {
    authAxios.defaults.headers = {
      "x-eq-session-token": `${session}`,
    };
  }

  if (!authAxios)
    authAxios = axios.create({
      headers: {
        ...(typeof session === "string"
          ? {
              "x-eq-session-token": `${session}`,
              ...header,
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
          return;
        default:
          throw error;
      }
    }
  );

  return authAxios;
};
