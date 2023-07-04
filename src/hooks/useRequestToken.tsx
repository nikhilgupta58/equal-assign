import axios from "axios";
import React from "react";
import { BASE_URL, header } from "../utils/constants";

export default function useRequestToken() {
  const [isSuccess, setIsSuccess] = React.useState(null);
  const [isError, setIsError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const mutate = (phone) => {
    let config = {
      headers: header,
    };
    setIsLoading(true);
    setIsError(null);
    setIsSuccess(null);
    const payload = {
      requestId: "",
      provider: "EQUAL_AUTH",
      type: "USER_MOBILE",
      mobileNumber: phone,
    };
    const endpoint = BASE_URL + "/auth/init";
    axios
      .post(endpoint, payload, config)
      .then(({ data }: { data: any }) => {
        if (data?.status_code === "200") setIsSuccess(true);
        else {
          setIsError(data?.message);
        }
      })
      .catch((err) => {
        const { config, response } = err;
        if (config?.data && response?.data && response?.status === 400) {
          setIsError(response?.data?.message);
        }
      })
      .finally(() => setIsLoading(false));
  };
  return { mutate, isError, isLoading, isSuccess };
}
