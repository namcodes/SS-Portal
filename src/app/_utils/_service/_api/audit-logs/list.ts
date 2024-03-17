import { getAccessKey } from "@/app/_utils/_helpers/getCookie";
import { AxiosClient } from "../";
import { jwtDecode } from "jwt-decode";

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

const listAuditLogs = async (params: any) => {
  const { client } = await AxiosClient.getInstance(
    process.env.ANNOUCEMENTS_BASE_URL
  );
  const { value }: any = await getAccessKey();
  const token = jwtDecode(value) as JwtPayload;
  const response = await client.get(`/audit-logs/list`, {
    params,
    headers: {
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${value}`,
    },
  });
  return response;
};

export default listAuditLogs;
