"use client";

import React, { useEffect } from "react";
import { Form, Input, Button, Divider } from "antd";
import { useReactQueryMutate } from "@/app/_utils/_service/_react-query";
import { useDispatch } from "react-redux";
import loginSlice from "@/app/_utils/redux/loginSlice";
import { useRouter } from "next/navigation";
import { notification } from "antd";
import Link from "next/link";
import {
  createSimulatedCookies,
  createSimulatedAdminCookies,
  createSimulatedHrCookies,
} from "@/app/_utils/_helpers/saveToCookie";
import { Spin } from "antd";
import InputOTPModal from "./component/modal";
import SideImages from "./component/sideImages";

type FieldType = {
  email?: string;
};
const Login = ({ apiService }) => {
  const { login, openOTPModal } = loginSlice.actions;
  const dispatch = useDispatch();
  const router = useRouter();
  const { getUserByEmail, loginUsingOtp } = apiService();
  const [api, contextHolder] = notification.useNotification();

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
    mutationFn: getUserByEmail,
  });

  const onFinish = (values: any) => {
    mutate(values);
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(login(data.data));
      dispatch(openOTPModal(true));
    }

    if (isError) {
      openNotification(error.message);
    }
  }, [isSuccess, isError]);

  return (
    <main className="!bg-slate-100  !flex gap-8" id="whole-login-page">
      {contextHolder}
      <InputOTPModal loginUsingOtp={loginUsingOtp} />
      <Spin spinning={isLoading} fullscreen />

      <SideImages />
      <div className="!flex !flex-col !gap-10 !justify-center">
        <p className=" !font-bold !text-2xl !text-slate-700">
          SIGN IN TO EN SELF SERVICE PORTAL
        </p>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
          className="flex flex-col gap-10"
        >


                  <Form.Item<FieldType>
            label={<p style={{ fontSize: "16px", fontWeight: "bold", color: "#000" }}>EMAIL</p>}
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              id="email-input-login"
              className="!p-4 !bg-transparent !focus:text-white !text-slate-700"
            />
          </Form.Item>
          <p className=" !text-slate-700">
            Don't have an account?
            <Link href="/" className="!text-ens-pink">
              <span> Contact Us</span>
            </Link>
          </p>

          <Form.Item>
            <Button
              htmlType="submit"
              className=" !bg-ens-pink !rounded-full !hover:bg-pink-hover !text-white"
              loading={isLoading}
              id="login-button"
            >
              Login
            </Button>
            <h1 className="!text-black">Simulation</h1>
            <Divider />
            <div className="!flex !gap-2">
              <Button
                className=" !bg-ens-pink !rounded-full !hover:bg-pink-hover !text-white "
                onClick={async () => {
                  await createSimulatedCookies();
                  dispatch(openOTPModal(false));
                  router.push("/home", { scroll: false });
                }}
              >
                Simulate User Login
              </Button>
              <Button
                className=" !bg-ens-pink !rounded-full !hover:bg-pink-hover !text-white "
                onClick={async () => {
                  await createSimulatedAdminCookies();
                  dispatch(openOTPModal(false));
                  router.push("/home", { scroll: false });
                }}
              >
                Simulate Admin Login
              </Button>

              <Button
                className=" !bg-ens-pink !rounded-full !hover:bg-pink-hover !text-white "
                onClick={async () => {
                  await createSimulatedHrCookies();
                  dispatch(openOTPModal(false));
                  router.push("/home", { scroll: false });
                }}
              >
                Simulate HR Login
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </main>
  );
};

export default Login;
