"use client";
import React, { useState, useEffect } from "react";
import { Form, Button, Input, notification, Card, Spin } from "antd";
import { useReactQueryMutate } from "@/app/_utils/_service/_react-query";
import apiService from "@/app/_utils/_service/_api";
import unlockSlice from "@/app/_utils/redux/unlockAccountSlice";
import { useDispatch, useSelector } from "react-redux";

type FieldType = {
  ssLastNumber?: string;
  email?: string;
  jcId?: string;
  employeeId?: string;
};

const EmailPage = () => {
  const { setActiveKey } = unlockSlice.actions;

  const dispatch = useDispatch();
  const state = useSelector((state: any) => state.unlockUser);

  const onFinish = (values: any) => {
    dispatch(setActiveKey("2"));
  };

  const onFinishFailed = (errorInfo: any) => {};

  return (
    <div className="flex justify-center !rounded-5xl">
      <div className=" flex flex-col gap-8bg-opacity-40 ">
        <Card title="Request Unlock Account" className="h-full">
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
              label="Company Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your company email!",
                },
              ]}
            >
              <Input
                className="!max-w-full"
                placeholder="test@gmail.com (Locked Account)"
              />
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
  );
};

export default EmailPage;
