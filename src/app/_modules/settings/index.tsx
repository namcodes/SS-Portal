import React from "react";
import CustomTabs from "../_shared/customTabs";
import type { TabsProps } from "antd";
import BasicInformation from "./components/BasicInformation";
import WorkInformation from "./components/WorkInformation";
import Documents from "./components/Documents";

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Basic Information",
    children: <BasicInformation />,
  },
  {
    key: "2",
    label: "Work Information",
    children: <WorkInformation />,
  },
  {
    key: "3",
    label: "Documents",
    children: <Documents />,
  },
];
const SettingsPage = () => {
  return (
    <div>
      <CustomTabs items={items} />
    </div>
  );
};

export default SettingsPage;
