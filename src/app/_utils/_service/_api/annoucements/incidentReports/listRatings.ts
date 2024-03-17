import { AxiosClient } from "../..";

const listRatings = async (params: any) => {
  const { client } = await AxiosClient.getInstance(
    process.env.ANNOUCEMENTS_BASE_URL
  );
  const response = await client.get(`/annoucements/ratings/list`);
  return response;
};

export default listRatings;
