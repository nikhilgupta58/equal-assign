import React from "react";
import { getProtectedAxios } from "../libs/auth";
import { toastStore, userStore } from "../store";
import { BASE_URL } from "../utils/constants";

export default function useVerifyToken() {
  const [isSuccess, setIsSuccess] = React.useState(null);
  const [isError, setIsError] = React.useState(null);
  const [setErrorToast] = toastStore((state) => [state.setErrorToast]);
  const [isLoading, setIsLoading] = React.useState(false);
  const setSession = userStore((state: any) => state.setSession);
  const mutate = ({ mobileNumber, mobileOtp }) => {
    setIsLoading(true);
    setIsError(null);
    setIsSuccess(null);
    const axios = getProtectedAxios();
    const payload = {
      requestId: null,
      provider: "EQUAL_AUTH",
      type: "USER_MOBILE",
      mobileNumber: mobileNumber,
      mobileOtp: mobileOtp,
    };
    const endpoint = BASE_URL + "/auth/verify";
    axios
      .post(endpoint, payload)
      .then(({ data }: { data: any }) => {
        const sessionId = data?.data?.session;
        if (data?.status_code === "200") {
          setIsSuccess(true);
          const session = `EQSI=${sessionId?.EQSI};EQTS=${sessionId?.EQTS};ESTS=${sessionId?.ESTS}`;
          setSession(session);
        } else {
          setErrorToast(data?.message);
          setIsError(data?.message);
        }
      })
      .catch((err) => {
        const { config, response } = err;
        if (config?.data && response?.data && response?.status === 400) {
          setIsError(response?.data?.message);
        } else {
          setIsError("We are facing some issues, please come back later");
        }
      })
      .finally(() => setIsLoading(false));
  };
  return { mutate, isError, isLoading, isSuccess };
}
