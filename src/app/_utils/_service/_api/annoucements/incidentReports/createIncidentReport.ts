import { AxiosClient } from "../..";
import { getAccessKey } from "@/app/_utils/_helpers/getCookie";

const createIncidentReport = async (params: any) => {
  const { client } = await AxiosClient.getInstance(
    process.env.ANNOUCEMENTS_BASE_URL
  );
  const { value }: any = await getAccessKey();
  const response = await client.post(
    `/annoucements/incident-report/create`,
    params,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${value}`,
      },
    }
  );
  return response;
};

export default createIncidentReport;
