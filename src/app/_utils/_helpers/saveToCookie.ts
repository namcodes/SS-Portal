"use server";

import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
interface JwtPayload {
  auth: string;
}

let exp = new Date();
exp.setHours(exp.getHours() + 2);

export async function createCookies(data: any) {
  cookies().set("access_key", data, { expires: exp.getTime() });
}

export async function createSimulatedCookies() {
  let exp = new Date();
  exp.setHours(exp.getHours() + 2);
  cookies().set(
    "access_key",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlRlc3QgQWNjb3VudCIsImVtYWlsIjoidGVzdEBlbnNob3JlZC5jb20iLCJpYXQiOjE1MTYyMzkwMjIsImV4cCI6MjAwNjk3OTM2NSwiYXV0aCI6InVzZXIiLCJhY2Nlc3MiOiJVMkZzZEdWa1gxL0JzTHhwMTRmcHRqY05Xc2RWUUxSZkRFRVNYNGRJU3dzPSJ9.P3J-VR9XG6Z9XipRdyIWQeR4C6ewZyBR4CSkUA595Z0",
    { expires: exp.getTime() }
  );

  await createSideNavCookie(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlRlc3QgQWNjb3VudCIsImVtYWlsIjoidGVzdEBlbnNob3JlZC5jb20iLCJpYXQiOjE1MTYyMzkwMjIsImV4cCI6MjAwNjk3OTM2NSwiYXV0aCI6InVzZXIiLCJhY2Nlc3MiOiJVMkZzZEdWa1gxL0JzTHhwMTRmcHRqY05Xc2RWUUxSZkRFRVNYNGRJU3dzPSJ9.P3J-VR9XG6Z9XipRdyIWQeR4C6ewZyBR4CSkUA595Z0"
  );
}

export async function createSimulatedAdminCookies() {
  cookies().set(
    "access_key",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlBhdWwgTGVhbmRybyIsImVtYWlsIjoicGxhbm90QGVuc2hvcmVkLmNvbSIsImlhdCI6MTUxNjIzOTAyMiwiZXhwIjoyMDA3NzE0Mjg0LCJhdXRoIjoic3NfYWRtaW4iLCJhY2Nlc3MiOiJVMkZzZEdWa1gxOEt3b2JtVjFQUWVtT21Mc1RCTnlJTVQ2N1lzam1ablk4PSJ9.IXvI0tCKlXnSlQOaqwv2oIuzfg4rbaMtcboEyfGWeBo",
    { expires: exp.getTime() }
  );

  await createSideNavCookie(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlBhdWwgTGVhbmRybyIsImVtYWlsIjoicGxhbm90QGVuc2hvcmVkLmNvbSIsImlhdCI6MTUxNjIzOTAyMiwiZXhwIjoyMDA3NzE0Mjg0LCJhdXRoIjoic3NfYWRtaW4iLCJhY2Nlc3MiOiJVMkZzZEdWa1gxOEt3b2JtVjFQUWVtT21Mc1RCTnlJTVQ2N1lzam1ablk4PSJ9.IXvI0tCKlXnSlQOaqwv2oIuzfg4rbaMtcboEyfGWeBo"
  );
}

export async function createSimulatedHrCookies() {
  cookies().set(
    "access_key",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlBhdWwgTGVhbmRybyIsImVtYWlsIjoicGxhbm90QGVuc2hvcmVkLmNvbSIsImlhdCI6MTUxNjIzOTAyMiwiZXhwIjoyMDA3NzE0Mjg0LCJhdXRoIjoic3NfaHIiLCJhY2Nlc3MiOiJVMkZzZEdWa1gxOEt3b2JtVjFQUWVtT21Mc1RCTnlJTVQ2N1lzam1ablk4PSJ9.oL9SCF5PKRfapws9Zepwj6tjUi-jl-w9v-H_prFSAi8",
    { expires: exp.getTime() }
  );

  await createSideNavCookie(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlBhdWwgTGVhbmRybyIsImVtYWlsIjoicGxhbm90QGVuc2hvcmVkLmNvbSIsImlhdCI6MTUxNjIzOTAyMiwiZXhwIjoyMDA3NzE0Mjg0LCJhdXRoIjoic3NfaHIiLCJhY2Nlc3MiOiJVMkZzZEdWa1gxOEt3b2JtVjFQUWVtT21Mc1RCTnlJTVQ2N1lzam1ablk4PSJ9.oL9SCF5PKRfapws9Zepwj6tjUi-jl-w9v-H_prFSAi8"
  );
}

export async function createSideNavCookie(data: any) {
  const token = jwtDecode(data) as JwtPayload;
  const hash = process.env.SIDENAV_HASH as string;
  cookies().set(hash, token.auth, { expires: exp.getTime() });
}
