"use client";
import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Input,
  Select,
  notification,
  Checkbox,
  Divider,
  DatePicker,
  Row,
  Col,
  TimePicker,
} from "antd";
import { useSelector } from "react-redux";
import createUserSlice from "@/app/_utils/redux/createUserSlice";
import { useDispatch } from "react-redux";
import { useReactQueryGet } from "@/app/_utils/_service/_react-query";
import apiService from "@/app/_utils/_service/_api";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import moment from "moment";
import PdfDndInput from "@/app/_components/PdfDnDInput";
import type { CheckboxProps } from "antd";

dayjs.extend(customParseFormat);

const dateFormat = "YYYY-MM-DD";

type NotificationType = "success" | "info" | "warning" | "error";

const SingleUploadForm = () => {
  const {
    listAllPositions,
    listAllEmployeeType,
    listAllPrograms,
    listAllDirectReports,
  } = apiService();

  const [checked, setChecked] = useState(true);
  const [checkedOperations, setCheckedOperations] = useState(false);

  const [form] = Form.useForm();

  const { setPdfUrl, setIsUserSubmitted, setActiveKey, setSingleUser } =
    createUserSlice.actions;

  const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();
  const state = useSelector((state: any) => state.createUser);
  const { pdfUrl, isUserSubmitted, isUserCreated } = state;

  const onChange: CheckboxProps["onChange"] = (e) => {
    setChecked(e.target.checked);
  };

  const onChangeIsOps: CheckboxProps["onChange"] = (e) => {
    setCheckedOperations(e.target.checked);
    if (!e.target.checked) {
      dispatch(setPdfUrl(null));
    }
  };

  const { data, isError, error }: any = useReactQueryGet({
    queryFn: listAllPositions,
    queryKey: ["allPositions"],
    params: { query: "position" },
  });

  const employeeType: any = useReactQueryGet({
    queryFn: listAllEmployeeType,
    queryKey: ["allEmployeeType"],
  });

  const programs: any = useReactQueryGet({
    queryFn: listAllPrograms,
    queryKey: ["allPrograms"],
  });

  const directReports: any = useReactQueryGet({
    queryFn: listAllDirectReports,
    queryKey: ["allDirectReports"],
  });

  const onFinish = (values: any) => {
    const directReports = JSON.parse(values.directReports);
    const secondLevelApprover = JSON.parse(values.secondLevelApprover);
    dispatch(
      setSingleUser({
        ...values,
        directReportName: `${directReports.firstName} ${directReports.lastName}`,
        secondLevelApproverName: `${secondLevelApprover.firstName} ${secondLevelApprover.lastName}`,
        workingHours: JSON.stringify(values.workingHours),
        startDate: JSON.stringify(values.startDate),
        pdfUrl,
      })
    );
    dispatch(setIsUserSubmitted(true));
    dispatch(setActiveKey("2"));

    // createUserMutate.mutate({ ...values, pdfUrl });
  };

  useEffect(() => {
    if (isError) {
      openNotificationError("Backend error", "error", error.message);
    }
    if (employeeType.isError) {
      openNotificationError(
        "Backend error",
        "error",
        employeeType.error.message
      );
    }
    if (programs.isError) {
      openNotificationError("Backend error", "error", programs.error.message);
    }
    if (directReports.isError) {
      openNotificationError(
        "Backend error",
        "error",
        directReports.error.message
      );
    }
  }, [isError, employeeType.isError, programs.isError, directReports.isError]);

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

  useEffect(() => {
    if (isUserCreated) {
      form.resetFields();
    }
  }, [isUserCreated]);

  return (
    <div>
      <Form
        name="basic"
        onFinish={onFinish}
        layout="horizontal"
        form={form}
        initialValues={{ layout: "horizontal" }}
        labelCol={{
          span: 7,
        }}
        wrapperCol={{
          span: 18,
        }}
        labelAlign="right"
      >
        {contextHolder}
        <Row gutter={[16, 24]}>
          <Col span={12}>
            <Form.Item
              label="Employee Id"
              colon={false}
              name="employeeId"
              rules={[{ required: true }]}
            >
              <Input placeholder="Example: 00000001" />
            </Form.Item>
            <Form.Item
              label="First Name"
              colon={false}
              name="firstName"
              rules={[{ required: true }]}
            >
              <Input placeholder="Example: John Michael" />
            </Form.Item>
            <Form.Item
              label="Middle Name"
              colon={false}
              name="middleName"
              rules={[{ required: true }]}
            >
              <Input placeholder="Example: Rick" />
            </Form.Item>
            <Form.Item
              label="Last Name"
              colon={false}
              name="lastName"
              rules={[{ required: true }]}
            >
              <Input placeholder="Example: Doe" />
            </Form.Item>
            <Form.Item
              label="Gender"
              colon={false}
              name="gender"
              rules={[{ required: true }]}
            >
              <Select placeholder="Select a gender">
                <Select.Option value="Male">Male</Select.Option>
                <Select.Option value="Female">Female</Select.Option>
                <Select.Option value="LGBTQIA+">LGBTQIA+</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Contact Number"
              colon={false}
              name="contactNumber"
              rules={[{ required: true }]}
            >
              <Input placeholder="Example: +639124230100" />
            </Form.Item>
            <Form.Item
              label="Personal Email"
              colon={false}
              name="alternativeEmail"
              rules={[{ required: true }]}
            >
              <Input placeholder="Example: johnmichael@mail.com" />
            </Form.Item>
            <Form.Item
              label="Preferred Name"
              colon={false}
              name="preferredName"
              rules={[{ required: true }]}
            >
              <Input placeholder="Example: Mike" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Working Hours"
              colon={false}
              name="workingHours"
              rules={[{ required: true }]}
            >
              <TimePicker.RangePicker className="w-full" format="hh:mm A" />
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
                className="w-full"
              />
            </Form.Item>
            <Form.Item
              label="Position"
              colon={false}
              name="position"
              rules={[{ required: true }]}
            >
              <Select placeholder="Select a position">
                {data &&
                  data?.data.map((position: string, index: number) => (
                    <Select.Option key={index} value={position}>
                      {position}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Employee Type"
              colon={false}
              name="employeeType"
              rules={[{ required: true }]}
            >
              <Select placeholder="Select an employee type">
                {employeeType.data &&
                  employeeType.data?.data.map(
                    (employeeType: string, index: number) => (
                      <Select.Option key={index} value={employeeType}>
                        {employeeType}
                      </Select.Option>
                    )
                  )}
              </Select>
            </Form.Item>
            <Form.Item
              label="Program"
              colon={false}
              name="program"
              rules={[{ required: true }]}
            >
              <Select placeholder="Select a program">
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
              label="Location"
              colon={false}
              name="location"
              rules={[{ required: true }]}
            >
              <Select
                style={{ width: "100%" }}
                placeholder="Please select a Location"
              >
                <Select.Option value="MNL-JMT">JMT</Select.Option>
                <Select.Option value="MNL-RAFFLES">Raffles</Select.Option>
                <Select.Option value="Cebu">Cebu</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Direct Report"
              colon={false}
              name="directReports"
              rules={[{ required: true }]}
            >
              <Select placeholder="Select an immediate supervisor">
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
              <Select placeholder="Select a second level approver">
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
          </Col>
        </Row>
        <Divider />
        <div className="px-5">
          <p className="flex gap-2 ">
            <span>Is the person in the operations?</span>
            <Checkbox checked={checkedOperations} onChange={onChangeIsOps}>
              Is Operations
            </Checkbox>
          </p>

          {checkedOperations && (
            <Form.Item colon={false} name="tga">
              <PdfDndInput />
            </Form.Item>
          )}
        </div>
        <div>
          <Form.Item
            colon={false}
            name="hasGmail"
            valuePropName="checked"
            className="px-5"
            style={{ width: "100%" }}
          >
            <p className="flex gap-2">
              <span>Does this user require gmail access?</span>
              <Checkbox checked={checked} onChange={onChange}>
                Gmail
              </Checkbox>
            </p>
          </Form.Item>
        </div>

        <Divider />
        <Form.Item colon={false} className="flex justify-end">
          <Button
            htmlType="submit"
            type="primary"
            className=" border-gray-100"
            disabled={
              isError ||
              employeeType.isError ||
              programs.isError ||
              directReports.isError
            }
          >
            Next
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SingleUploadForm;
