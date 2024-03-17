import React from "react";
import { Table, Image } from "antd";

const dataSource = [
  {
    key: "1",
    saas: (
      <div className="flex items-center gap-2">
        <Image src="/zoom.png" width={30} height={30} />
        <p>Zoom</p>
      </div>
    ),
    activeUsers: `${22}%`,
    annualSpend: `₱${5200}`,
    expiration: new Date().toDateString(),
  },
  {
    key: "2",
    saas: (
      <div className="flex items-center gap-2">
        <Image src="/zendesk-icon.png" preview={false} width={30} height={30} />
        <p>Zendesk</p>
      </div>
    ),
    activeUsers: `${55}%`,
    annualSpend: `₱${2200}`,
    expiration: new Date().toDateString(),
  },
];

const columns = [
  {
    title: "SaaS",
    dataIndex: "saas",
    key: "saas",
  },
  {
    title: "Active Users",
    dataIndex: "activeUsers",
    key: "activeUsers",
  },
  {
    title: "Annual Spend",
    dataIndex: "annualSpend",
    key: "annualSpend",
  },
  {
    title: "Expiration",
    dataIndex: "expiration",
    key: "expiration",
  },
];
const Home = () => {
  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowClassName={(record, index) => {
          return record && record.activeUsers === "22%" ? "bg-ens-pink " : "";
        }}
      />
    </div>
  );
};

export default Home;
