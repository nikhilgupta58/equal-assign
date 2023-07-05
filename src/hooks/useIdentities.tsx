import React from "react";
import { getProtectedAxios } from "../libs/auth";
import { BASE_URL } from "../utils/constants";

export default function useIdentities() {
  const [data, setData] = React.useState(null);
  const [isError, setIsError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const fetch = () => {
    const axios = getProtectedAxios();
    setIsLoading(true);
    const endpoint = BASE_URL + "/wallet/identities";
    axios
      .post(endpoint, {
        request_id: "req1",
      })
      .then(({ data }) => {
        setData(data);
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
  React.useEffect(() => {
    fetch();
  }, []);
  return { data, isLoading, isError };
}
