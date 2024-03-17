"use client";
import React, { useEffect, useState } from "react";
import DndInput from "@/app/_components/dndinput";
import createUserSlice from "@/app/_utils/redux/createUserSlice";
import {
  Divider,
  Modal,
  Form,
  Select,
  Button,
  notification,
  Spin,
  Badge,
  Table,
  Input,
  DatePicker,
  TimePicker,
  Row,
  Col,
  Checkbox,
} from "antd";

import { useDispatch, useSelector } from "react-redux";
import {
  useReactQueryGet,
  useReactQueryMutate,
} from "@/app/_utils/_service/_react-query";
import apiService from "@/app/_utils/_service/_api";
import userBulkSlice from "@/app/_utils/redux/userBulkSlice";
import { bulkUploadCols } from "@/app/_utils/_constants/bulkUploadCols";
import moment from "moment";
import dayjs from "dayjs";
import type { CheckboxProps } from "antd";
import PdfDndInput from "@/app/_components/PdfDnDInput";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

type NotificationType = "success" | "info" | "warning" | "error";

const dateFormat = "YYYY-MM-DD";

const BulkUploadModal = () => {
  const [api, contextHolder] = notification.useNotification();
  const {
    listAllRecipients,
    bulkUploadUsers,
    listAllDirectReports,
    saveBulkUploadUsers,
    listAllPositions,
    listAllPrograms,
    createLogs,
  } = apiService();
  const state = useSelector((state: any) => state.createUser);
  const { openBulkModal, setPdfUrl } = createUserSlice.actions;
  const { submitCreate, setIsUploaded, setNumberOfTrainees } =
    userBulkSlice.actions;
  const dispatch = useDispatch();
  const { isBulkModalOpen, pdfUrl } = state;
  const [form] = Form.useForm();
  const [defaultCCRecipients, setDefaultCCRecipients] = useState([]);
  const [defaultToRecipients, setDefaultToRecipients] = useState([]);
  const bulkState = useSelector((state: any) => state.bulkUser);
  const { isUploaded, usersBulk, csvUrl, noOfTrainees } = bulkState;
  const [checkedOperations, setCheckedOperations] = useState(false);
  const [programSelected, setProgramSelected] = useState(false);

  const directReports: any = useReactQueryGet({
    queryFn: listAllDirectReports,
    queryKey: ["allDirectReports"],
  });

  const bulkUpload: any = useReactQueryMutate({
    mutationFn: bulkUploadUsers,
    queryKey: ["bulkUpload"],
  });

  const saveBulkUpload: any = useReactQueryMutate({
    mutationFn: saveBulkUploadUsers,
    queryKey: ["saveBulkUpload"],
  });

  const allRecipients: any = useReactQueryGet({
    queryFn: listAllRecipients,
    queryKey: ["allRecipients"],
    params: { default: "all" },
  });

  const toDefault: any = useReactQueryGet({
    queryFn: listAllRecipients,
    queryKey: ["defaultRecipientsTo"],
    params: { type: "to", default: true },
  });

  const ccDefault: any = useReactQueryGet({
    queryFn: listAllRecipients,
    queryKey: ["defaultRecipientsCC"],
    params: { type: "cc", default: true },
  });
  const positions: any = useReactQueryGet({
    queryFn: listAllPositions,
    queryKey: ["allPositions"],
    params: { query: "position" },
  });

  const programs: any = useReactQueryGet({
    queryFn: listAllPrograms,
    queryKey: ["allPrograms"],
  });
  const logs = useReactQueryMutate({
    mutationFn: createLogs,
    queryKey: ["allLogs"],
  });

  const handleCancel = () => {
    dispatch(openBulkModal(false));
    dispatch(setIsUploaded(false));
  };

  useEffect(() => {
    if (bulkUpload.isError) {
      const { response }: any = bulkUpload.error;
      const err = response.data.message;
      openNotificationError("error", err.join("<br/>"));
    }
    if (bulkUpload.isSuccess) {
      const { users, noOfTrainees }: any = bulkUpload.data.data;
      dispatch(submitCreate(users));
      dispatch(setIsUploaded(true));
      dispatch(setNumberOfTrainees(noOfTrainees));
      if (bulkUpload.isError) {
        openNotificationError("error", bulkUpload.error.message);
      }
    }
  }, [bulkUpload.isError, bulkUpload.isSuccess]);

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
    if (ccDefault.isError) {
      openNotificationError("error", ccDefault.error.message);
    }
    if (toDefault.isError) {
      openNotificationError("error", toDefault.error.message);
    }
  }, [
    ccDefault.isSuccess,
    ccDefault.isError,
    toDefault.isError,
    toDefault.isSuccess,
  ]);

  const openNotificationError = (type: NotificationType, error: string) => {
    api[type]({
      message: `BULK UPLOAD ${type.toUpperCase()}`,
      description: <div dangerouslySetInnerHTML={{ __html: error }}></div>,
    });
  };

  const onFinish = (values: any) => {
    const user = JSON.parse(localStorage.getItem("user"));
    logs.mutate({
      employeeId: user.employeeId,
      action: "Bulk Uploading",
      modules: ["Newly Hire"],
    });
    saveBulkUpload.mutate({ ...values, users: usersBulk, pdfUrl });
  };
  useEffect(() => {
    if (saveBulkUpload.isError) {
      openNotificationError(
        "error",
        saveBulkUpload.error.response.data.message
      );
    }
    if (saveBulkUpload.isSuccess) {
      openNotificationError("success", saveBulkUpload.data.data.message);
    }
  }, [saveBulkUpload.isError, saveBulkUpload.isSuccess]);

  const onChangeIsOps: CheckboxProps["onChange"] = (e) => {
    setCheckedOperations(e.target.checked);
    if (!e.target.checked) {
      dispatch(setPdfUrl(null));
    }
  };

  return (
    <Modal
      maskClosable={false}
      title={
        <div>
          USER BULK UPLOADING <Divider />
        </div>
      }
      open={isBulkModalOpen}
      onCancel={handleCancel}
      footer={null}
      width={1600}
    >
      {contextHolder}
      <Spin
        spinning={
          ccDefault.isFetching ||
          toDefault.isFetching ||
          bulkUpload.isLoading ||
          saveBulkUpload.isLoading ||
          positions.isFetching
        }
        fullscreen
      />

      {defaultToRecipients &&
        defaultToRecipients.length > 0 &&
        defaultCCRecipients &&
        defaultCCRecipients.length > 0 && (
          <Form
            name="basic"
            onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            layout="horizontal"
            form={form}
            initialValues={{ layout: "horizontal" }}
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 18,
            }}
            labelAlign="right"
            className="p-2"
          >
            {isUploaded && (
              <div>
                <Row gutter={[16, 24]}>
                  <Col span={12}>
                    <Form.Item
                      label="Program"
                      colon={false}
                      name="program"
                      rules={[{ required: true }]}
                    >
                      <Select
                        placeholder="Select a program"
                        onChange={() => setProgramSelected(true)}
                      >
                        {programs.data &&
                          programs.data?.data.map(
                            (programType: string, index: number) => (
                              <Select.Option key={index} value={programType}>
                                {programType}
                              </Select.Option>
                            )
                          )}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      label="Position"
                      colon={false}
                      name="position"
                      rules={[{ required: true }]}
                    >
                      <Select placeholder="Select a position">
                        {positions.data &&
                          positions?.data?.data?.map(
                            (position: string, index: number) => (
                              <Select.Option key={index} value={position}>
                                {position}
                              </Select.Option>
                            )
                          )}
                      </Select>
                    </Form.Item>

                    <Form.Item
                      label="To"
                      colon={false}
                      name="to"
                      rules={[{ required: true }]}
                    >
                      <Select
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="Please select"
                        defaultValue={defaultToRecipients}
                        disabled={!programSelected}
                      >
                        {allRecipients.data &&
                          allRecipients.data?.data.map(
                            ({ name, email, _id }: any) => (
                              <Select.Option key={_id} value={email}>
                                {name}
                              </Select.Option>
                            )
                          )}
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
                        disabled={!programSelected}
                      >
                        {allRecipients.data &&
                          allRecipients.data?.data.map(
                            ({ name, email, _id }: any) => (
                              <Select.Option key={_id} value={email}>
                                {name}
                              </Select.Option>
                            )
                          )}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      label="Location"
                      colon={false}
                      name="location"
                      rules={[{ required: true }]}
                    >
                      <Select
                        style={{ width: "100%" }}
                        placeholder="Please select a Location"
                        disabled={!programSelected}
                      >
                        <Select.Option value="MNL-JMT">JMT</Select.Option>
                        <Select.Option value="MNL-RAFFLES">
                          Raffles
                        </Select.Option>
                        <Select.Option value="Cebu">Cebu</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Direct Report"
                      colon={false}
                      name="directReports"
                      rules={[{ required: true }]}
                    >
                      <Select
                        placeholder="Select an immediate supervisor"
                        disabled={!programSelected}
                      >
                        {directReports.data &&
                          directReports.data?.data.map(
                            (directReportType: any, index: number) => (
                              <Select.Option
                                key={index}
                                value={JSON.stringify(directReportType)}
                              >
                                {`${directReportType.firstName} ${directReportType.lastName}`}
                              </Select.Option>
                            )
                          )}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      label="2nd Level Approver"
                      colon={false}
                      name="secondLevelApprover"
                      rules={[{ required: true }]}
                    >
                      <Select
                        placeholder="Select a second level approver"
                        disabled={!programSelected}
                      >
                        {directReports.data &&
                          directReports.data?.data.map(
                            (directReportType: any, index: number) => (
                              <Select.Option
                                key={index}
                                value={JSON.stringify(directReportType)}
                              >
                                {`${directReportType.firstName} ${directReportType.lastName}`}
                              </Select.Option>
                            )
                          )}
                      </Select>
                    </Form.Item>

                    <Form.Item
                      label="Start Date"
                      colon={false}
                      name="startDate"
                      rules={[{ required: true }]}
                    >
                      <DatePicker
                        defaultValue={dayjs(
                          moment(new Date()).format(dateFormat),
                          dateFormat
                        )}
                        maxDate={dayjs(
                          moment(new Date()).format(dateFormat),
                          dateFormat
                        )}
                        className="w-full"
                        disabled={!programSelected}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Working Hours"
                      colon={false}
                      name="workingHours"
                      rules={[{ required: true }]}
                    >
                      <TimePicker.RangePicker
                        className="w-full"
                        format="hh:mm A"
                        disabled={!programSelected}
                      />
                    </Form.Item>

                    <Form.Item label="Wave" colon={false} name="wave">
                      <Input
                        placeholder="Example: Wave 666"
                        disabled={!programSelected}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Divider />
              </div>
            )}

            <div className="flex flex-col gap-4">
              {isUploaded && (
                <Badge.Ribbon
                  text={`No. of trainees: ${noOfTrainees}`}
                  color="pink"
                  placement="start"
                >
                  <div className="p-4">
                    <Table
                      columns={bulkUploadCols}
                      dataSource={usersBulk}
                      className="w-full"
                    />
                  </div>
                </Badge.Ribbon>
              )}
              {!isUploaded && <DndInput />}
            </div>
            <Divider />
            {isUploaded && (
              <div className="px-5">
                <p className="flex gap-2 ">
                  <span>Are these persons in the operation?</span>
                  <Checkbox
                    checked={checkedOperations}
                    onChange={onChangeIsOps}
                  >
                    Are Operations
                  </Checkbox>
                </p>

                {checkedOperations && (
                  <Form.Item colon={false} name="tga">
                    <PdfDndInput />
                  </Form.Item>
                )}
              </div>
            )}
            <div className="flex justify-center">
              {isUploaded && <Button htmlType="submit">Submit</Button>}
              {!isUploaded && (
                <Button
                  loading={!csvUrl}
                  onClick={() => {
                    bulkUpload.mutate({ fileUrl: csvUrl });
                  }}
                >
                  Upload
                </Button>
              )}
            </div>
          </Form>
        )}
    </Modal>
  );
};

export default BulkUploadModal;
