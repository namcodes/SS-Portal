"use client";
import React, { useEffect, useState } from "react";
import { Divider, List, Button, Skeleton, Card } from "antd";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import apiService from "@/app/_utils/_service/_api";
import { useReactQueryGet } from "@/app/_utils/_service/_react-query";
import moment from "moment";
import { useRouter } from "next/navigation";
interface DataType {
  header?: string;
  subheader?: string;
  incidentHeader?: string;
  bodyData?: string;
  incidentTextColor?: string;
  incidentColor?: string;
  createdAt: string;
}

const DraftLists = () => {
  const { listIncidentReports } = apiService();

  const router = useRouter();

  const goToEdit = (slug) => {
    router.push(`/page-management/incident-reports/edit/${slug}`, {
      scroll: false,
    });
  };

  const incidentReports = useReactQueryGet({
    queryFn: listIncidentReports,
    queryKey: ["allIncidentReportsDraft"],
    params: {
      isDraft: true,
    },
  });
  const [allIncidentReports, setallIncidentReports] = useState<DataType[]>([]);
  useEffect(() => {
    setallIncidentReports(incidentReports?.data?.data);
  }, [incidentReports]);
  return (
    <Card title="Draft Posts" className="rounded-md">
      <Divider />
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={allIncidentReports}
        renderItem={(item: any) => (
          <List.Item
            actions={[
              <Button
                key="list-loadmore-edit"
                className=" text-[#f39daa] flex gap-2 items-center"
                onClick={() => {
                  goToEdit(item._id);
                }}
              >
                <span>
                  <EditFilled />
                </span>
                Edit
              </Button>,
              <Button
                key="list-loadmore-edit"
                className=" text-[#f39daa] flex gap-2 items-center"
                onClick={() => {}}
              >
                <span>
                  <DeleteFilled />
                </span>
                Delete
              </Button>,
            ]}
          >
            <Skeleton avatar loading={false} title={false} active>
              <List.Item.Meta
                title={
                  <a href="https://ant.design">
                    {item.header} • {item.subHeader}
                  </a>
                }
                description={`${moment(item.createdAt).format("LLLL")}`}
              />
            </Skeleton>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default DraftLists;
