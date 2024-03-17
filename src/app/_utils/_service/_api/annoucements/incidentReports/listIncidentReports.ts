import { getAccessKey } from "@/app/_utils/_helpers/getCookie";
import { AxiosClient } from "../..";
import { jwtDecode } from "jwt-decode";

//Payload
interface JwtPayload {
  sub: string;
  name: string;
  email: string;
  access: string;
  iat: number;
  exp: number;
  auth: string;
  employeeId: string;
}

const listIncidentReports = async (params: any) => {
  const { client } = await AxiosClient.getInstance(
    process.env.ANNOUCEMENTS_BASE_URL
  );
  const { value }: any = await getAccessKey();
  const token = jwtDecode(value) as JwtPayload; //set
  const response = await client.get(`/annoucements/incident-report/list`, {
    params: { ...params, createdBy: token.employeeId },
    headers: {
      Authorization: `Bearer ${value}`,
    },
  });
  return response;
};

export default listIncidentReports;
