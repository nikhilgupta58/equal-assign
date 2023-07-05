import React from "react";
import { getProtectedAxios } from "../libs/auth";
import { BASE_URL } from "../utils/constants";

const mockData = {
  status: "SUCCESS",
  message: "Identities found",
  timestamp: 1688540019711,
  data: {
    account_id: "equal.account.a86824ee-7685-44c5-9544-9bb978569596",
    wallet_id: "f6e2ed1b-ce6e-40b3-80e6-99ee94d641b2",
    key_details: [
      {
        keyName: "AADHAAR",
        keyStatus: null,
        keyData: [
          {
            address_area: "Dehradun",
            gender: "Male",
            address_state: "Uttarakhand",
            address_pincode: "248003",
            key_global_uid: "7896.09-06-2000.Nikhil Kumar Gupta",
            key_source: "UIDAI",
            address_district: "Dehradun",
            address:
              "S/O Ravindra Kumar House Number - 671 R Sanjay Vihar Garhi Cantt Dehradun Dakra Bazar Dehradun Uttarakhand 248003",
            address_house: "House Number - 671 R",
            key_id: "xxxxxxxx7896",
            address_country: "India",
            verification_type: "UNKNOWN",
            key_provider: "DIGILOCKER",
            co: "S/O Ravindra Kumar",
            issuer_name: "UIDAI",
            key_name: "AADHAAR",
            address_landmark: "Dakra Bazar",
            dob: "09-06-2000",
            address_street: "Sanjay Vihar",
            name: "Nikhil Kumar Gupta",
            key_fetched_at: "2023-07-05T06:52:58.314Z",
            photo:
              "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",
            equal_artefact:
              "https://s3.ap-south-1.amazonaws.com/equalinfradeploymentbuil-eq00wallets3bucket00prep-ike6pqp2eyhn/equal_artefact_0.6217807769058139?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCmFwLXNvdXRoLTEiSDBGAiEAhvYBZHEBOd1HLNk59TegqYLq2Qfap6XXxHEi1pHoT98CIQDBV2FiMNie2R1hs3f%2BSyyp766Uh8vItcsz%2BTus6YlwFiqwBQglEAAaDDM4MDQ5NTQzMzEzNiIMPHFYi8KgdSozSE43Ko0FRInjYCBDgAz9KznDL97SszKk3nTUP2%2F2lSgUQN8edZt%2B1I4hWLGk1qWO2YiOShYXt5wZvkXxuuvo7v9AvqaDrP4326sJm%2F9M81QGuEWfSC1CVPnLfp%2F5oZv6483J7Zu9o97xffKbCBz8MDrU55cWo7%2Fy1vdxQKCcYHj%2BVqvb1rmPs0%2FKoctD5wxOdbtAhnRPbKeEyZ8W7cLpe82nzSe1nAS%2BHpXRL8cpTAVOpsThMwajJsxug0s0WmN6wqnsa0yVl8o5UtjBW0BL2FZoZLqLnO7lKetT4P2q0ApeIduRrhO2vlItA0CRT5bUiDtlVqiQdCIDoEYhyskg7tj4VEYw8UoeQMf7jpgXwV1QkVGUkYljnrd2YwHTVqxJm%2FRewF74uEgp3UpHwUGyrkrFGzBbw8NtX0eTXINE6%2BYJIdP8BtoquQ9G0c4L%2BPH%2Fo%2FQnUaWl4NIZYVRMJYEedfaaY7bL0hpcE6SoNUsRjsK9hjJGOhaF5v8UHBtSWiSbylYV8o5ADWJ5lHSw9MsPS0rogxsY6U9nB1g8EM%2FbVzvOkUsVo7A4o9vqEH5bIP05P6XH2PituSsjeNgO0AuZzD7xmOPWBwFcF6KongO4nMwkqIwIyenggsd5eHC7hNdbh3rj2rLB0%2Bs6k20m94UtAHd3HR%2FvVlmRoith6RYetiQnTfEMpEocKRBzNk0OTCMpX4i%2B6CSSbAX3T%2FAcgY0my53xgnDK4JHXIB4NSQ%2BiBLZ1%2F8u2Cp8toT7PQJc68lye378%2FVzxbgVyIqu7rw6E%2BbeQ3MayQWV6kNtDrYQ2ch1oKWdZzOlzjoD3HJMe4DT2wYh7SqaAqFqZlf%2FdpOVATU63LlQ8svaizCSWehr%2BguL2ZGr0wss6TpQY6pwHj6YOyf0pHIBKFp1L2dC2LR4AXYbifGJZvTEILavc0pc5XtZVEWJOyHXr3hdOapMMge1Uec%2BYPhBN4Q85bZcgCQEAE%2BXZUozKXbABRv52%2B5ilBx7wk1TFjus6sOXGBna9kRTxsRPS8cw0%2FmUVzzsUF9OUv6U34epaMn%2ByPOZnzuo3KfFyxlEeom3QTNDMtahIiw0vFO8sewVTK8gRXe%2BeSgjlPSYL8%2Bw%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230705T065338Z&X-Amz-SignedHeaders=host&X-Amz-Expires=600&X-Amz-Credential=ASIAVRF2LRWYFIKJ2VKM%2F20230705%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=41f9cd2efebd8c90fcc3f9763b01c1c1965910920e77cd02d8fb57dfaa305f46",
          },
        ],
      },
      {
        keyName: "PAN",
        keyStatus: null,
        keyData: [
          {
            gender: "Male",
            key_global_uid: "CZXPG4616G",
            key_source: "Income Tax Department",
            key_id: "CZXPG4616G",
            key_provider: "DIGILOCKER",
            key_name: "PAN",
            dob: "09-06-2000",
            name: "NIKHIL KUMAR GUPTA",
            key_fetched_at: "2023-07-05T06:53:18.198Z",
            key_report:
              "https://s3.ap-south-1.amazonaws.com/equalinfradeploymentbuil-eq00wallets3bucket00prep-ike6pqp2eyhn/key_report_0.6882212432568892?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCmFwLXNvdXRoLTEiSDBGAiEAhvYBZHEBOd1HLNk59TegqYLq2Qfap6XXxHEi1pHoT98CIQDBV2FiMNie2R1hs3f%2BSyyp766Uh8vItcsz%2BTus6YlwFiqwBQglEAAaDDM4MDQ5NTQzMzEzNiIMPHFYi8KgdSozSE43Ko0FRInjYCBDgAz9KznDL97SszKk3nTUP2%2F2lSgUQN8edZt%2B1I4hWLGk1qWO2YiOShYXt5wZvkXxuuvo7v9AvqaDrP4326sJm%2F9M81QGuEWfSC1CVPnLfp%2F5oZv6483J7Zu9o97xffKbCBz8MDrU55cWo7%2Fy1vdxQKCcYHj%2BVqvb1rmPs0%2FKoctD5wxOdbtAhnRPbKeEyZ8W7cLpe82nzSe1nAS%2BHpXRL8cpTAVOpsThMwajJsxug0s0WmN6wqnsa0yVl8o5UtjBW0BL2FZoZLqLnO7lKetT4P2q0ApeIduRrhO2vlItA0CRT5bUiDtlVqiQdCIDoEYhyskg7tj4VEYw8UoeQMf7jpgXwV1QkVGUkYljnrd2YwHTVqxJm%2FRewF74uEgp3UpHwUGyrkrFGzBbw8NtX0eTXINE6%2BYJIdP8BtoquQ9G0c4L%2BPH%2Fo%2FQnUaWl4NIZYVRMJYEedfaaY7bL0hpcE6SoNUsRjsK9hjJGOhaF5v8UHBtSWiSbylYV8o5ADWJ5lHSw9MsPS0rogxsY6U9nB1g8EM%2FbVzvOkUsVo7A4o9vqEH5bIP05P6XH2PituSsjeNgO0AuZzD7xmOPWBwFcF6KongO4nMwkqIwIyenggsd5eHC7hNdbh3rj2rLB0%2Bs6k20m94UtAHd3HR%2FvVlmRoith6RYetiQnTfEMpEocKRBzNk0OTCMpX4i%2B6CSSbAX3T%2FAcgY0my53xgnDK4JHXIB4NSQ%2BiBLZ1%2F8u2Cp8toT7PQJc68lye378%2FVzxbgVyIqu7rw6E%2BbeQ3MayQWV6kNtDrYQ2ch1oKWdZzOlzjoD3HJMe4DT2wYh7SqaAqFqZlf%2FdpOVATU63LlQ8svaizCSWehr%2BguL2ZGr0wss6TpQY6pwHj6YOyf0pHIBKFp1L2dC2LR4AXYbifGJZvTEILavc0pc5XtZVEWJOyHXr3hdOapMMge1Uec%2BYPhBN4Q85bZcgCQEAE%2BXZUozKXbABRv52%2B5ilBx7wk1TFjus6sOXGBna9kRTxsRPS8cw0%2FmUVzzsUF9OUv6U34epaMn%2ByPOZnzuo3KfFyxlEeom3QTNDMtahIiw0vFO8sewVTK8gRXe%2BeSgjlPSYL8%2Bw%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230705T065338Z&X-Amz-SignedHeaders=host&X-Amz-Expires=600&X-Amz-Credential=ASIAVRF2LRWYFIKJ2VKM%2F20230705%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=b77e41d4ee8e879b28b73be827a4d7a5741a73b88b6cf153b92785341d10ae6b",
          },
        ],
      },
    ],
  },
  status_code: "200",
};

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
      .then(() => {
        setData(mockData?.data?.key_details);
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
