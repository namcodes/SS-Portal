import { AxiosClient } from "../..";

const listIncidentReportStatus = async (params: any) => {
  const { client } = await AxiosClient.getInstance(
    process.env.ANNOUCEMENTS_BASE_URL
  );
  const response = await client.get(`/annoucements/incident-report/status`, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
  });
  return response;
};

export default listIncidentReportStatus;
