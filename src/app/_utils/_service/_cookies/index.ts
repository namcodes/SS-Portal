import { cookies } from "next/headers";

const createCookie = (value: string) => {
  const oneDay = 24 * 60 * 60 * 1000;
  cookies().set("name", "lee");
  // or
  cookies().set("access_token", value, {
    expires: Date.now() - oneDay,
    secure: true,
  });
};

export { createCookie };
