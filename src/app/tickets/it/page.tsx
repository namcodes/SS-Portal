import React from "react";
import { Breadcrumb, Image } from "antd";
const page = () => {
  return (
    <div>
      <Breadcrumb
        separator=">"
        items={[
          {
            title: "Home",
            href: "/home",
          },
          {
            title: "Tickets",
            href: "/tickets",
          },
          {
            title: "IT",
          },
        ]}
      />

      <div className="flex flex-col items-center justify-center py-10">
        <Image src="/maintenance.gif" preview={false} width={400}></Image>
        <h1 className="font-bold text-2xl ">Still in development</h1>
      </div>
    </div>
  );
};

export default page;
