"use client";
import React, { useState } from "react";
import { AppstoreOutlined, MailOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";

const items: MenuProps["items"] = [
  {
    label: "SaaS Acquisitions",
    key: "mail",
    icon: <AppstoreOutlined />,
  },
  {
    label: "Email Notifications",
    key: "app",
    icon: <MailOutlined />,
  },
];

const AppSupportPage = () => {
  const [current, setCurrent] = useState("mail");

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

export default AppSupportPage;
