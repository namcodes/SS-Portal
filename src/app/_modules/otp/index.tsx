"use client";
import { Button, Form } from "antd";
import { InputOTP } from "antd-input-otp";
import { useSelector } from "react-redux";
import { LockOutlined } from "@ant-design/icons";
import apiService from "@/app/_utils/_service/_api";
import { useReactQueryMutate } from "@/app/_utils/_service/_react-query";
import { notification } from "antd";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

type NotificationType = "success" | "info" | "warning" | "error";

const InputOTPPage = () => {
  const state = useSelector((state: any) => state.login);
  const { user } = state;
  const [form] = Form.useForm();
  const { loginUsingOtp } = apiService();
  const [api, contextHolder] = notification.useNotification();
  const router = useRouter();

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
    mutationFn: loginUsingOtp,
  });

  const handleFinish = (values: any) => {
    let { otp } = values;
    otp = otp.join("");
    const { _id, firstName, email } = user;
    mutate({ id: _id, name: firstName, email, otp });
  };

  const openNotificationError = (type: NotificationType, error: string) => {
    api[type]({
      message: "BACKEND ERROR",
      description: error,
    });
  };

  const openNotificationLoggedIn = (
    type: NotificationType,
    message: string
  ) => {
    api[type]({
      message: "Welcome Hero",
      description: message,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      const { message } = data?.data;

      localStorage.setItem("user", JSON.stringify(user));

      openNotificationLoggedIn("success", message);
      router.push("/");
    }

    if (isError) {
      openNotificationError("error", error.message);
    }
  }, [isSuccess, isError]);

  return (
    <Form onFinish={handleFinish} form={form}>
      {contextHolder}
      <div>
        <div className="flex justify-center py-4">
          <LockOutlined className=" text-6xl text-white bg-[#e83760] rounded-full p-6 shadow-md shadow-[#f2efeb]" />
        </div>
        <h1 className="font-bold text-lg text-center">
          Hello {user.firstName}!
        </h1>
        <h1 className="font-bold text-2xl text-center">VERIFICATION</h1>
      </div>

      <Form.Item name="otp">
        <InputOTP autoSubmit={form} inputType="all" />
      </Form.Item>

      <div>
        <p className="text-center">
          Did not receive an OTP?
          <span className=" text-[#e83760] cursor-pointer">Send again</span>
        </p>
      </div>
      <Form.Item className="flex justify-center">
        <Button htmlType="submit">Submit</Button>
      </Form.Item>
    </Form>
  );
};
export default InputOTPPage;
