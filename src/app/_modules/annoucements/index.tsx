"use client";
import React, { useEffect, useState } from "react";
import { Card, Avatar, List, Space, Badge } from "antd";
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import IncidentReportListComponent from "./components/incidentReportlist";
import apiService from "@/app/_utils/_service/_api";
import { useReactQueryGet } from "@/app/_utils/_service/_react-query";

const { Meta } = Card;

const AnnoucementPage = () => {
  const [allIncidentsData, setIncidentsData] = useState([]);
  const { listIncidentReports } = apiService();
  const allIncidents = useReactQueryGet({
    queryFn: listIncidentReports,
    queryKey: ["allIncidents"],
  });

  useEffect(() => {
    if (allIncidents.isFetched) {
      setIncidentsData(allIncidents?.data?.data); //fetch
    }
  }, [allIncidents.isFetched]);

  return (
    <div className="grid grid-cols-1 grid-rows-5 gap-4 md:grid-cols-3">
      
      {/* First Section */}
      <div className="order-1 col-span-1 md:col-span-2 row-span-5">
        <Card
          type="inner"
          title="Scheduled Maintenance"
          extra={<a href="#">More</a>}
          className="h-xl"
        ></Card>
      </div>
      <div className="order-2 col-span-1 row-span-5">
        <Card
          type="inner"
          title="Advisories"
          extra={<a href="#">More</a>}
          className="h-full"
        ></Card>
      </div>

      {/* Second Section */}
      <div className="order-3 col-span-1 md:col-span-2 row-span-5">
        <IncidentReportListComponent data={allIncidentsData} />
      </div>

      <div className="order-4 col-span-1 row-span-5">
        <Card
          type="inner"
          title="Announcements"
          extra={<a href="#">More</a>}
          className="h-full"
        >
         
          <List
            itemLayout="horizontal"
            dataSource={[]} // Empty data array
            renderItem={() => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar />}
                  title={<a href="#">Title</a>}
                  description="Description"
                />
              </List.Item>
            )}
          />
        </Card>
      </div>

    </div>
  );
};

export default AnnoucementPage;
