import { AxiosClient } from "..";
import { getAccessKey } from "@/app/_utils/_helpers/getCookie";

const createUser = async (params: any) => {
  const { client } = await AxiosClient.getInstance(
    process.env.API_GATEWAY_BASE_URL
  );
  const { value }: any = await getAccessKey();
  const response = await client.post(`users/create`, params, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${value}`,
    },
  });
  return response;
};

export default createUser;
