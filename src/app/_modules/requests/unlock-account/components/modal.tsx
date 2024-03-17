"use client";
import { Button, Form, Modal, Spin } from "antd";
import { InputOTP } from "antd-input-otp";
import { useSelector } from "react-redux";
import { useReactQueryMutate } from "@/app/_utils/_service/_react-query";
import { notification } from "antd";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import unlockSlice from "@/app/_utils/redux/unlockAccountSlice";

type NotificationType = "success" | "info" | "warning" | "error";

const InputOTPModal = ({ unlockAccountOtp }: any) => {
  const { openOTPModal, setVerificationFailed } = unlockSlice.actions;
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state.unlockUser);
  const { isOpenOtp } = state;
  const [form] = Form.useForm();
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
    mutationFn: unlockAccountOtp,
  });

  const handleFinish = (values: any) => {
    let { otp } = values;
    otp = otp.join("");
    mutate({ otp });
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
      message: "Account Unlocked",
      description: message,
    });
  };
  const handleCancel = () => {
    dispatch(openOTPModal(false));
  };
  useEffect(() => {
    if (isSuccess) {
      const { message } = data?.data;

      openNotificationLoggedIn("success", message);
      dispatch(openOTPModal(false));
      dispatch(setVerificationFailed(false));
    }

    if (isError) {
      openNotificationError("error", error.response.data.message);
      dispatch(openOTPModal(false));
      dispatch(setVerificationFailed(true));
    }
  }, [isSuccess, isError]);

  return (
    <Modal
      title={<div className="p-2">One Time Pin</div>}
      open={isOpenOtp}
      onCancel={handleCancel}
      footer={null}
    >
      <Form onFinish={handleFinish} form={form}>
        {contextHolder}
        <Spin spinning={isLoading} fullscreen />

        <div className="py-20">
          <h1 className="font-bold text-2xl text-center">VERIFICATION</h1>
          <Form.Item name="otp">
            <InputOTP autoSubmit={form} inputType="all" />
          </Form.Item>

          <div className="flex flex-col gap-7">
            <p className="flex items-center justify-center gap-2">
              <span>Did not receive an OTP?</span>
              <span className=" text-ens-pink cursor-pointer">Send again</span>
            </p>

            <Form.Item className="flex justify-center">
              <Button htmlType="submit" loading={isLoading}>
                Submit
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
    </Modal>
  );
};
export default InputOTPModal;
