import { getAccessKey } from "@/app/_utils/_helpers/getCookie";
import { AxiosClient } from "..";

const listAllUsers = async (params: any) => {
  const { client } = await AxiosClient.getInstance(
    process.env.API_GATEWAY_BASE_URL
  );
  const { value }: any = await getAccessKey();

  const response = await client.get(`users/list`, {
    params,
    headers: {
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${value}`,
    },
  });
  return response;
};

export default listAllUsers;
