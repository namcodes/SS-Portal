import React from "react";
import { Breadcrumb } from "antd";

const page = () => {
  return (
    <Breadcrumb
      separator=">"
      items={[
        {
          title: "Home",
          href: "",
        },
        {
          title: "Tickets",
          href: "",
        },
      ]}
    />
  );
};

export default page;
