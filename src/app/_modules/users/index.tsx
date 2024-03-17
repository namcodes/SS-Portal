"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button, Divider, Space, Table, Tag, Tour } from "antd";
import { Breadcrumb } from "antd";
import createUserSlice from "@/app/_utils/redux/createUserSlice";
import { useDispatch } from "react-redux";
import CustomModal from "./component/modal";
import BulkUploadModal from "./component/bulkUploadModal";
import type { TourProps } from "antd";
import { userCreationItems } from "../_shared/breadCrumbs/items";
import { createCache, extractStyle, StyleProvider } from "@ant-design/cssinjs";
import Document from "next/document";
import type { DocumentContext } from "next/document";
import type { TableProps } from "antd";
import apiService from "@/app/_utils/_service/_api";
import { useReactQueryGet } from "@/app/_utils/_service/_react-query";
import moment from "moment";

const UsersPage = () => {
  const dispatch = useDispatch();

  const { openCreateModal, openBulkModal } = createUserSlice.actions;

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const [open, setOpen] = useState<boolean>(false);
  const { listAuditLogs } = apiService();
  const [auditLogsData, setAuditLogsData] = useState([]);

  const auditLogs = useReactQueryGet({
    queryFn: listAuditLogs,
    queryKey: ["allLogs"],
  });

  const steps: TourProps["steps"] = [
    {
      title: "Submit a ticket",
      description: "This will redirect you to the link of our ticket page.",

      target: () => ref1.current,
    },
    {
      title: "Zendesk",
      description:
        "Some of related matters regarding zendesk will be seen here.",
      target: () => ref2.current,
    },
  ];

  interface DataType {
    key: string;
    employeeId: string;
    employeeName: number;
    action: string;
    modules: string[];
    updatedAt: string;
  }

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Employee Id",
      dataIndex: "employeeId",
      key: "employeeId",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Employee Name",
      dataIndex: "employeeName",
      key: "employeeName",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
    {
      title: "Modules",
      key: "modules",
      dataIndex: "modules",
      render: (_, { modules }) => (
        <>
          {modules.map((module) => {
            return (
              <Tag color="volcano" key={module}>
                {module.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (text) => <span>{moment(text).format("LLLL")}</span>,
    },
  ];

  useEffect(() => {
    if (auditLogs.isSuccess) {
      setAuditLogsData(auditLogs.data.data);
    }
  }, [auditLogs.isSuccess]);

  return (
    <div>
      <CustomModal />
      <BulkUploadModal />
      <div className="text-black py-12">
        <h1 className="font-bold text-5xl">USERS</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
          fuga, odio a magnam quisquam ipsam quaerat beatae doloribus provident
          incidunt nostrum natus voluptatibus, consequuntur corrupti, facilis
          assumenda vel.
        </p>
        <div className="flex items-center justify-between">
          <Breadcrumb
            separator=">"
            items={userCreationItems}
            className="py-8"
          />
          <div className="flex gap-2">
            <Button
              onClick={() => {
                dispatch(openCreateModal(true));
              }}
              ref={ref1}
            >
              Create User
            </Button>
            <Button
              onClick={() => {
                dispatch(openBulkModal(true));
              }}
              ref={ref2}
            >
              Bulk upload users
            </Button>
          </div>
        </div>
        <Divider />
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h1>Audit Logs</h1>
            <Button>Download Logs</Button>
          </div>
          <Divider />

          <Table columns={columns} dataSource={auditLogsData} />
        </div>
      </div>

      <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
    </div>
  );
};

UsersPage.getInitialProps = async (ctx: DocumentContext) => {
  const cache = createCache();
  const originalRenderPage = ctx.renderPage;
  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) =>
        (
          <StyleProvider cache={cache}>
            <App {...props} />
          </StyleProvider>
        ),
    });

  const initialProps = await Document.getInitialProps(ctx);
  const style = extractStyle(cache, true);
  return {
    ...initialProps,
    styles: (
      <>
        {initialProps.styles}
        <style dangerouslySetInnerHTML={{ __html: style }} />
      </>
    ),
  };
};

export default UsersPage;
