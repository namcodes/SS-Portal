"use server";

import { cookies } from "next/headers";

export async function deleteCookie() {
  cookies().delete("access_key");
}

export async function deleteCookieAccess() {
  cookies().delete("6d58c5c0ce0896209267b5491d374f2d");
}
