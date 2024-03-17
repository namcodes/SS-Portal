import React from "react";
import { Image } from "antd";
import SettingsPage from "../_modules/settings";
import { Divider } from "antd";

const Page = () => {
  return (
    <div>
      <div className="">
        <h1>User Settings</h1>

        <SettingsPage />
      </div>
    </div>
  );
};

export default Page;
