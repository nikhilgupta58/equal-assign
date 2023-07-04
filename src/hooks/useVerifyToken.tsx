import axios from "axios";
import React from "react";
import { userStore } from "../store";
import { BASE_URL } from "../utils/constants";

export default function useRequestToken() {
  const [isSuccess, setIsSuccess] = React.useState(null);
  const [isError, setIsError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const setSession = userStore((state: any) => state.setSession);
  const mutate = ({ mobileNumber, mobileOtp }) => {
    setIsLoading(true);
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
      .then(({ data }) => {
        setIsSuccess(true);
        console.log(data);
        // const session = `EQSI=EG-PR-MMNTTMPXVWXHC1PKMW51;EQTS=$2a$10$gXusaQ3eLsNyPdM7ZLKVOeFV35BHmUDbfAurUL6R4HzuRhB5TY4Mi;ESTS=gPNdVR7Gn9cvdrvfmrXE5DOSOcgA8DWWg9rxlqMfSOH8NPOGbQSKxUCvvkfwGjlW0cp8x5x-CZNl8EonJFdYBg`;
        // setSession(session);
        setSession(null);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  };
  return { mutate, isError, isLoading, isSuccess };
}
