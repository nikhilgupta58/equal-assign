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
        }
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  };
  return { mutate, isError, isLoading, isSuccess };
}
