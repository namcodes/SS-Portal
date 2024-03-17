import React from "react";
import { Tabs } from "antd";

const CustomTabs = ({ activeKey, items, defaultActiveKey }: any) => {
  return (
    <Tabs
      activeKey={activeKey}
      defaultActiveKey={defaultActiveKey}
      items={items}
    />
  );
};

export default CustomTabs;
