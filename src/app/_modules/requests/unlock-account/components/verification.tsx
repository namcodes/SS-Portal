"use client";
import React, { useState, useEffect } from "react";
import { Form, Button, Input, notification, Card, Spin } from "antd";
import { useReactQueryMutate } from "@/app/_utils/_service/_react-query";
import apiService from "@/app/_utils/_service/_api";

import unlockSlice from "@/app/_utils/redux/unlockAccountSlice";
import { useDispatch, useSelector } from "react-redux";
import InputOTPModal from "./modal";

type FieldType = {
  ssLastNumber?: string;
  email?: string;
  jcId?: string;
  employeeId?: string;
};

const VerificationPage = () => {
  const [user, setUser] = useState<any>({});

  const { unlockUser, unlockAccountOtp } = apiService();

  const [api, contextHolder] = notification.useNotification();

  const { openOTPModal } = unlockSlice.actions;
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state.unlockUser);
  const { isOpenOtp } = state;

  const openNotification = (error: string) => {
    api["error"]({
      message: "BACKEND ERROR",
      description: error,
    });
  };

  const {
    mutate,
    isSuccess,
    data,
    isError,
    error,
    isLoading,
  }: {
    mutate: any;
    isSuccess: boolean;
    data: any;
    isError: boolean;
    error: any;
    isLoading: boolean;
  } = useReactQueryMutate({
    mutationFn: unlockUser,
  });

  useEffect(() => {
    if (localStorage.getItem("user")) {
      let userStored: any = localStorage.getItem("user");
      userStored = JSON.parse(userStored);
      setUser(userStored);
    }
  }, []);

  const onFinish = (values: any) => {
    mutate({ ...values, jcId: user.jcId });
  };

  const onFinishFailed = (errorInfo: any) => {};

  useEffect(() => {
    if (isError) {
      openNotification(error.response.data.message);
    }
    if (isSuccess) {
      dispatch(openOTPModal(true));
    }
  }, [isSuccess, isError]);
  return (
    <div className="py-10">
      {contextHolder}
      <Spin spinning={isLoading} fullscreen />
      <InputOTPModal unlockAccountOtp={unlockAccountOtp} />
      <div className="flex justify-center !rounded-5xl">
        <div className=" flex flex-col gap-8bg-opacity-40 ">
          <Card
            title={
              <>
                <h1 className="text-md">Request Unlock Account</h1>
                <div className="py-2">
                  <p className="text-sm">
                    For verification of your identity please enter your
                    Alternative Email and Employee ID.
                  </p>
                  <p className="text-sm">
                    An OTP will be sent to your personal email.
                  </p>
                </div>
              </>
            }
            className="h-full"
          >
            <Form
              name="basic"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 16 }}
              style={{ minWidth: 800 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              className="px-10"
            >
              <Form.Item<FieldType>
                label="Alternative Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your alternative email!",
                  },
                ]}
              >
                <Input className="!max-w-full" placeholder="test@gmail.com" />
              </Form.Item>

              <Form.Item<FieldType>
                label="Employee Id"
                name="employeeId"
                rules={[
                  { required: true, message: "Please input your Employee ID!" },
                ]}
              >
                <Input placeholder="123456" />
              </Form.Item>

              <Form.Item className="flex justify-center">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="!bg-[#1d364e]"
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VerificationPage;
