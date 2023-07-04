import axios, { AxiosInstance } from "axios";
import { userStore } from "../store";

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
              authority: "api.test.equal.in",
              accept: "*/*",
              "accept-language": "en-GB,en;q=0.6",
              "access-control-allow-origin": "*",
              "cache-control": "no-cache",
              "content-type": "application/json; charset=utf-8",
              origin: "https://test.equal.in",
              pragma: "no-cache",
              referer: "https://test.equal.in/",
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
