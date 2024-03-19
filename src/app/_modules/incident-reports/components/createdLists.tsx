"use client";
import React, { useEffect, useState } from "react";
import { Divider, List, Button, Skeleton, DatePicker, Card } from "antd";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import apiService from "@/app/_utils/_service/_api";
import { useReactQueryGet } from "@/app/_utils/_service/_react-query";
import moment from "moment";

interface DataType {
  header?: string;
  subHeader?: string;
  incidentHeader?: string;
  bodyData?: string;
  incidentTextColor?: string;
  incidentColor?: string;
  createdAt: string;
}

const CreatedLists = () => {
  const [allIncidentReports, setallIncidentReports] = useState<DataType[]>([]);

  const { listIncidentReports } = apiService();
  const incidentReports = useReactQueryGet({
    queryFn: listIncidentReports,
    queryKey: ["allIncidentReports"],
    params: { isDraft: false, createdBy: null },
  });
  useEffect(() => {
    setallIncidentReports(incidentReports?.data?.data);
  }, [incidentReports]);

  return (
    <Card title="Published Posts" className="rounded-md">
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
              >
                <span>
                  <EditFilled />
                </span>
                Edit
              </Button>,
              <Button
                key="list-loadmore-edit"
                className=" text-[#f39daa] flex gap-2 items-center"
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
                  <a href="#">
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

export default CreatedLists;
