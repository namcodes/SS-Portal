import { getAccessKey } from "@/app/_utils/_helpers/getCookie";
import { AxiosClient } from "..";
import {
  createCookies,
  createSideNavCookie,
} from "@/app/_utils/_helpers/saveToCookie";

const unlockUser = async (params: any) => {
  const { client } = await AxiosClient.getInstance(
    process.env.API_GATEWAY_BASE_URL
  );
  const { value }: any = await getAccessKey();
  const response = await client.post(`users/unlock-user`, params, {
    headers: { Authorization: `Bearer ${value}` },
  });
  if (response.data.access_key) {
    const { access_key } = response.data;
    await createSideNavCookie(access_key);
    await createCookies(access_key);
  }
  return response;
};

export default unlockUser;
