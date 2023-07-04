import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";

export default function useRequestToken() {
  const [isSuccess, setIsSuccess] = React.useState(null);
  const [isError, setIsError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const mutate = (phone) => {
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
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  };
  return { mutate, isError, isLoading, isSuccess };
}
