"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const Line: any = dynamic(
  () => import("@ant-design/charts").then((mod) => mod.Line) as any,
  { ssr: false }
);

const SaaSAquisitionPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch(
      "https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json"
    )
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {});
  };
  const configLine = {
    data,
    padding: "auto",
    xField: "Date",
    yField: "scales",
    xAxis: {
      tickCount: 5,
    },
  };

  return (
    <div>
      <h1>SaaS Acquisitions</h1>
      <div className="bg-white rounded-lg flex flex-col px-10">
        <Line {...configLine} />
      </div>
    </div>
  );
};

export default SaaSAquisitionPage;
