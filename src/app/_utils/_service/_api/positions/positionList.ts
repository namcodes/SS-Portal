import { getAccessKey } from "@/app/_utils/_helpers/getCookie";
import { AxiosClient } from "..";

const listAllPositions = async (params: any) => {
  const { client } = await AxiosClient.getInstance(
    process.env.API_GATEWAY_BASE_URL
  );
  const { value }: any = await getAccessKey();
  const response = await client.get(`/positions/list`, {
    params,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "*",
      Authorization: `Bearer ${value}`,
    },
  });
  return response;
};

export default listAllPositions;
