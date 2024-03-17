"use server";

import { cookies } from "next/headers";

export async function getAccessKey() {
  return cookies().get("access_key");
}

export async function getSideNav() {
  const hash = process.env.SIDENAV_HASH as string;
  return cookies().get(hash)?.value;
}
