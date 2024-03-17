import { AxiosClient } from "..";
import { getAccessKey } from "@/app/_utils/_helpers/getCookie";

const saveBulkUploadUsers = async (params: any) => {
  const { client } = await AxiosClient.getInstance(
    process.env.API_GATEWAY_BASE_URL
  );
  const { value }: any = await getAccessKey();
  const response = await client.post(`users/bulk-upload/all`, params, {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
  return response;
};

export default saveBulkUploadUsers;
