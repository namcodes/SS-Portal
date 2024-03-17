import { AxiosClient } from "..";

const getUserByEmail = async (params: any) => {
  const { client } = await AxiosClient.getInstance(
    process.env.API_GATEWAY_BASE_URL
  );
  const response = await client.post(`users/user-by-email`, params);
  return response;
};

export default getUserByEmail;
