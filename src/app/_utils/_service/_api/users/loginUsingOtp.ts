import { AxiosClient } from "..";
import {
  createCookies,
  createSideNavCookie,
} from "@/app/_utils/_helpers/saveToCookie";

const loginUsingOtp = async (params: any) => {
  const { client } = await AxiosClient.getInstance(
    process.env.API_GATEWAY_BASE_URL
  );
  const response = await client.post(`users/login-by-otp`, params);
  if (response.data.access_key) {
    const { access_key } = response.data;
    await createSideNavCookie(access_key);
    await createCookies(access_key);
  }
  return response;
};

export default loginUsingOtp;
