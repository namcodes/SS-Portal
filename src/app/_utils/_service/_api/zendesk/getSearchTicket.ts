import { AxiosClient } from "..";

const getSearchTicket = async (params: any) => {
  const { client } = await AxiosClient.getInstance(
    process.env.API_GATEWAY_BASE_URL
  );
  const response = await client.get(`/zendesk/tickets/count?query=${params}`, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "*",
    },
    params: {
      query: params.query,
    },
  });
  return response;
};

export default getSearchTicket;
