"use client";
import React from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import Departments from "./components/departments";
import Positions from "./components/positions";
import Programs from "./components/programs";

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Departments",
    children: <Departments />,
  },
  {
    key: "2",
    label: "Programs",
    children: <Programs />,
  },
  {
    key: "3",
    label: "Positions",
    children: <Positions />,
  },
  {
    key: "4",
    label: "Direct Reports",
    children: "Content of Tab Pane 3",
  },
  {
    key: "5",
    label: "Second Level Approver",
    children: "Content of Tab Pane 3",
  },

  {
    key: "6",
    label: "Locations",
    children: "Content of Tab Pane 3",
  },
];

const PlaceholderPage = () => {
  return <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
};

export default PlaceholderPage;
