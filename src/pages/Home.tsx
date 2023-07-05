import useIdentities from "../hooks/useIdentities";
import AppLayout from "../layouts/AppLayout";

const keyName = {
  address_area: "Address Area",
  gender: "Gender",
  address_state: "State",
  address_pincode: "Pincode",
  key_source: "Source",
  address_district: "District",
  address: "Area",
  address_house: "House Number",
  key_id: "Id",
  address_country: "Country",
  key_provider: "Provider",
  dob: "Date of Birth",
  name: "Name",
  equal_artefact: "",
};

export default function Home() {
  const { isLoading, data, isError } = useIdentities();

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex flex-col gap-3">
          {Array.from({ length: 4 }, (_, id) => (
            <div
              key={id}
              className="animate-pulse bg-gray-300 w-full h-[35px] rounded-md"
            />
          ))}
        </div>
      </AppLayout>
    );
  }

  if (isError) {
    return (
      <AppLayout>
        <p className="text-[14px] w-full text-red-500">{isError}</p>
      </AppLayout>
    );
  }

  if (data?.length === 0) {
    return (
      <AppLayout>
        <div className="font-[600] text-[16px]">No identities found!!</div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="text-[20px] font-[600]">Your Identities</div>
      <div className="flex flex-col gap-6">
        {data?.map((row, id) => {
          const rowData = row?.keyData?.[0];
          const file = rowData?.equal_artefact;
          return (
            <div key={id} className="shadow-md p-4 flex flex-col gap-2">
              <p className="text-[18px] font-[500]">{row?.keyName}</p>
              <div className="flex flex-col gap-2">
                {Object.entries(rowData).map(([key], id1) => {
                  const keyData = keyName[key];
                  if (keyData) {
                    return (
                      <div key={id1} className="flex text-[12px] gap-4">
                        <p className="w-[100px] font-[600]">{keyData}</p>
                        <p className="font-[400] flex-1">{rowData[key]}</p>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
              {file ? (
                <a
                  href={file}
                  target="_blank"
                  className="cursor-pointer text-blue-700 underline"
                >
                  Download
                </a>
              ) : null}
            </div>
          );
        })}
      </div>
    </AppLayout>
  );
}
