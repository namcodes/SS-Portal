import { uploadCols } from "@/app/_utils/_constants/bulkUploadCols";
import apiService from "@/app/_utils/_service/_api";
import {
  useReactQueryGet,
  useReactQueryMutate,
} from "@/app/_utils/_service/_react-query";
import createUserSlice from "@/app/_utils/redux/createUserSlice";
import {
  Form,
  Select,
  Input,
  Table,
  Button,
  Divider,
  notification,
  Spin,
} from "antd";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

type NotificationType = "success" | "info" | "warning" | "error";

const ViewSingleUserForm = () => {
  const { listAllRecipients, createUser, createLogs } = apiService();
  const [defaultCCRecipients, setDefaultCCRecipients] = useState([]);
  const [defaultToRecipients, setDefaultToRecipients] = useState([]);
  const [api, contextHolder] = notification.useNotification();
  const createUserMutate: any = useReactQueryMutate({
    mutationFn: createUser,
    queryKey: ["allLogs"],
  });
  const state = useSelector((state: any) => state.createUser);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { singleUser } = state;
  const { setIsUserCreated } = createUserSlice.actions;

  const logs = useReactQueryMutate({
    mutationFn: createLogs,
    queryKey: ["allLogs"],
  });

  const ccDefault: any = useReactQueryGet({
    queryFn: listAllRecipients,
    queryKey: ["defaultRecipientsCC"],
    params: { type: "cc", default: true },
  });

  const toDefault: any = useReactQueryGet({
    queryFn: listAllRecipients,
    queryKey: ["defaultRecipientsTo"],
    params: { type: "to", default: true },
  });

  const allRecipients: any = useReactQueryGet({
    queryFn: listAllRecipients,
    queryKey: ["allRecipients"],
    params: { default: "all" },
  });

  useEffect(() => {
    const recArr: any = [];
    const recArrTo: any = [];
    if (ccDefault.data) {
      ccDefault.data?.data.map(({ email }: any) => recArr.push(email));
      setDefaultCCRecipients(recArr);
    }
    if (toDefault.data) {
      toDefault.data?.data.map(({ email }: any) => recArrTo.push(email));
      setDefaultToRecipients(recArrTo);
    }
  }, [ccDefault.isSuccess, toDefault.isSuccess]);

  const onFinish = (value) => {
    const user = JSON.parse(localStorage.getItem("user"));
    logs.mutate({
      employeeId: user.employeeId,
      action: "Single Create",
      modules: ["Newly Hire"],
    });
    createUserMutate.mutate({ ...value, ...singleUser });
  };

  useEffect(() => {
    if (createUserMutate.isError) {
      openNotificationError(
        "Error 500",
        "error",
        createUserMutate.error?.response?.data?.message
      );
    }
  }, [createUserMutate.isError]);

  useEffect(() => {
    if (createUserMutate.isSuccess) {
      openNotificationError(
        "Success!",
        "success",
        createUserMutate.data?.data?.message
      );
      dispatch(setIsUserCreated(true));
      form.resetFields();
    }
  }, [createUserMutate.isSuccess]);

  const openNotificationError = (
    message: string,
    type: NotificationType,
    data: any
  ) => {
    api[type]({
      message,
      description: data,
    });
  };

  return (
    <Form
      name="basic"
      onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
      layout="horizontal"
      form={form}
      initialValues={{ layout: "horizontal" }}
      labelCol={{
        span: 2,
      }}
      wrapperCol={{
        span: 18,
      }}
      labelAlign="right"
      className="p-2"
    >
      {contextHolder}
      <Spin
        spinning={
          ccDefault.isFetching ||
          toDefault.isFetching ||
          createUserMutate.isLoading
        }
        fullscreen
      />
      <Form.Item label="Wave" colon={false} name="wave">
        <Input placeholder="Example: Wave 666" />
      </Form.Item>
      {defaultToRecipients &&
        defaultToRecipients.length > 0 &&
        defaultCCRecipients &&
        defaultCCRecipients.length > 0 && (
          <>
            <Form.Item
              label="To"
              colon={false}
              name="to"
              rules={[{ required: true }]}
            >
              <Select
                mode="multiple"
                style={{ width: "100%" }}
                placeholder="Please select "
                defaultValue={defaultToRecipients}
              >
                {allRecipients.data &&
                  allRecipients.data?.data.map(({ name, email, _id }: any) => (
                    <Select.Option key={_id} value={email}>
                      {name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Cc"
              colon={false}
              name="cc"
              rules={[{ required: true }]}
            >
              <Select
                mode="multiple"
                style={{ width: "100%" }}
                placeholder="Please select"
                defaultValue={defaultCCRecipients}
              >
                {allRecipients.data &&
                  allRecipients.data?.data.map(({ name, email, _id }: any) => (
                    <Select.Option key={_id} value={email}>
                      {name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </>
        )}

      <Table
        columns={uploadCols}
        dataSource={[singleUser]}
        pagination={false}
      />

      <Divider />
      <Form.Item colon={false} className="flex justify-end">
        <Button htmlType="submit" type="primary" className=" border-gray-100">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ViewSingleUserForm;
