import React from "react";
import { getProtectedAxios } from "../libs/auth";
import { toastStore } from "../store";
import { BASE_URL } from "../utils/constants";

export default function useRequestToken() {
  const [isSuccess, setIsSuccess] = React.useState(null);
  const [isError, setIsError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [setErrorToast] = toastStore((state) => [state.setErrorToast]);
  const mutate = (phone) => {
    const axios = getProtectedAxios();
    setIsLoading(true);
    const payload = {
      requestId: "",
      provider: "EQUAL_AUTH",
      type: "USER_MOBILE",
      mobileNumber: phone,
    };
    const endpoint = BASE_URL + "/auth/init";
    axios
      .post(endpoint, payload)
      .then(() => {
        setIsSuccess(true);
        setErrorToast("ds");
      })
      .catch((err) => {
        console.log(err);
        setErrorToast("ds");
        setIsError(true);
      })
      .finally(() => setIsLoading(false));
  };
  return { mutate, isError, isLoading, isSuccess };
}
