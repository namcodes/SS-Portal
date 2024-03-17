import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  protectedRoutes,
  protectedRoutesHR,
} from "./app/_utils/_constants/protectedRoutes";
import { jwtDecode } from "jwt-decode";
import { protectedRoutesAdmin } from "./app/_utils/_constants/protectedRoutes";

interface JwtPayload {
  sub: string;
  name: string;
  email: string;
  access: string;
  iat: number;
  exp: number;
  auth: string;
}

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const accessToken: any = cookies().get("access_key")?.value;

  let token = null;
  if (accessToken) {
    token = jwtDecode(accessToken) as JwtPayload;
  }

  if (accessToken && path.startsWith("/login")) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  if (!accessToken && protectedRoutes().includes(path)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  // if (token?.auth === "ss_admin") {
  //   if (!accessToken || !protectedRoutesAdmin().includes(path)) {
  //     return NextResponse.json(
  //       {
  //         message: "Unauthorized",
  //       },
  //       {
  //         status: 401,
  //       }
  //     );
  //   }
  // }
  // if (token?.auth === "ss_hr") {
  //   if (!accessToken || !protectedRoutesHR().includes(path)) {
  //     return NextResponse.json(
  //       {
  //         message: "Unauthorized",
  //       },
  //       {
  //         status: 401,
  //       }
  //     );
  //   }
  // }
}
