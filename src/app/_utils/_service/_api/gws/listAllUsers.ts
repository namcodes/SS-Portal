// import { getAccessKey } from "@/app/_utils/_helpers/getCookie";
import { AxiosClient } from "..";

const listAllGwsUsers = async (params: any) => {
  const { client } = await AxiosClient.getInstance(
    process.env.API_GATEWAY_BASE_URL
  );
  //  const { value }: any = await getAccessKey();
  const response = await client.get(`/annoucements/gws/list`, {
    params,
  });
  return response;
};

export default listAllGwsUsers;
