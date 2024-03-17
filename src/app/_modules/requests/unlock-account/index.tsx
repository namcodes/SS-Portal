"use client";
import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Input,
  Breadcrumb,
  Divider,
  notification,
  Spin,
  Card,
  Steps,
} from "antd";
import { useReactQueryMutate } from "@/app/_utils/_service/_react-query";
import apiService from "@/app/_utils/_service/_api";
import InputOTPModal from "./components/modal";

import { useDispatch, useSelector } from "react-redux";
import {
  SmileOutlined,
  UserOutlined,
  SolutionOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import type { TabsProps } from "antd";
import EmailPage from "./components/email";
import CustomTabs from "../../_shared/customTabs";
import VerificationPage from "./components/verification";
import ResultPage from "./components/result";

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Unlock Account",
    children: <EmailPage />,
  },
  {
    key: "2",
    label: "Verification",
    children: <VerificationPage />,
  },
  {
    key: "3",
    label: "Result",
    children: <ResultPage />,
  },
];

const UnlockAccount = () => {
  const [user, setUser] = useState<any>({});

  const [api, contextHolder] = notification.useNotification();

  const dispatch = useDispatch();
  const state = useSelector((state: any) => state.unlockUser);
  const { activeKey } = state;

  const openNotification = (error: string) => {
    api["error"]({
      message: "BACKEND ERROR",
      description: error,
    });
  };

  return (
    <div className="py-10">
      {contextHolder}

      <CustomTabs items={items} activeKey={activeKey} defaultActiveKey="1" />
      <Divider />
      <div className="flex justify-center">
        <Steps
          className=" w-1/2"
          items={[
            {
              title: "Request",
              status: activeKey === "1" ? "process" : "finish",
              icon: activeKey !== "1" ? <UserOutlined /> : <LoadingOutlined />,
            },

            {
              title: "Verification",
              status: activeKey === "2" ? "process" : "wait",
              icon:
                activeKey !== "2" ? <SolutionOutlined /> : <LoadingOutlined />,
            },
            {
              title: "Done",
              status: activeKey === "3" ? "process" : "wait",
              icon: activeKey !== "3" ? <SmileOutlined /> : <LoadingOutlined />,
            },
          ]}
        />
      </div>
    </div>
  );
};

export default UnlockAccount;
