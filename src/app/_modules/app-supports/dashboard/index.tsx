"use client";
import apiService from "@/app/_utils/_service/_api";
import { useReactQueryGet } from "@/app/_utils/_service/_react-query";
import { BarChartOutlined, LikeOutlined } from "@ant-design/icons";
import { List, Statistic, Divider } from "antd";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import moment from "moment";

const Column: any = dynamic(
  () => import("@ant-design/plots").then((mod) => mod.Column) as any,
  { ssr: false }
);

const Dashboard = () => {
  const { listRatings } = apiService();
  const [ratingsData, setRatingsData] = useState([]);
  const [ratingsChart, setRatingsChart] = useState<any>([]);

  const ratings = useReactQueryGet({
    queryFn: listRatings,
    queryKey: ["allRatings"],
  });

  useEffect(() => {
    setRatingsData(ratings?.data?.data);
    const happy = ratings?.data?.data.filter(
      (obj: any) => obj.rating === "happy"
    ).length;
    const veryHappy = ratings?.data?.data.filter(
      (obj: any) => obj.rating === "very happy"
    ).length;
    const veryUnhappy = ratings?.data?.data.filter(
      (obj: any) => obj.rating === "very unhappy"
    ).length;
    const unhappy = ratings?.data?.data.filter(
      (obj: any) => obj.rating === "unhappy"
    ).length;
    const neutral = ratings?.data?.data.filter(
      (obj: any) => obj.rating === "neutral"
    ).length;

    const rate = [
      { type: "Very Unhappy", count: veryUnhappy },
      { type: "Unhappy", count: unhappy },
      { type: "Neutral", count: neutral },
      { type: "Happy", count: happy },
      { type: "Very Happy", count: veryHappy },
    ];

    setRatingsChart(rate);
  }, [ratings.data]);

  const configColumn = {
    data: ratingsChart,
    xField: "type",
    yField: "count",
    label: {
      // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: "#FFFFFF",
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
  };
  return (
    <div className="flex flex-col gap-10">
      <div className=" h-44 bg-en-branding !bg-opacity-10 flex items-center px-10 rounded-2xl">
        <h1 className="text-white">Dashboard</h1>
        <div className=" w-full flex gap-10 justify-end">
          <div
            className="  bg-blue-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-50 
 text-white  shadow-sm flex shadow-[#1d364e33]"
          >
            <div className="flex justify-center items-center px-14 py-4 font-bold">
              <Statistic
                title="SS Portal v1 Feedbacks"
                value={ratingsData && ratingsData.length}
                prefix={<LikeOutlined />}
              />
            </div>
          </div>
          <div
            className="  bg-blue-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-50 
 text-white  shadow-sm flex shadow-[#1d364e33]"
          >
            <div className="flex justify-center items-center px-14 py-4 font-bold">
              <Statistic title="SaaS" value={0} prefix={<BarChartOutlined />} />
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-sm ">
        <div className="py-10 px-5">
          <h1 className="text-white font-bold ">SS Portal UAT Feedbacks</h1>
          <p className="text-white text-opacity-50">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
        <Divider />
        <div className=" mt-10  rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 flex justify-between">
          <div className=" bg-white h-full rounded-2xl shadow-md shadow-slate-600 py-14">
            <Column {...configColumn} />
          </div>
          <List
            size="small"
            header={<div className="font-bold text-3xl">Comments</div>}
            bordered
            dataSource={ratingsData}
            renderItem={({ rating, comment, createdAt }: any) => (
              <List.Item>
                <div className="font-bold w-1/2 flex flex-col">
                  <span className=" text-ens-pink">
                    Reaction: {`[${rating.toUpperCase()}]`}{" "}
                  </span>
                  <span>Comment: {comment}</span>
                </div>
                <div className=" !text-opacity-20">{`${moment(
                  createdAt
                ).calendar()}`}</div>
              </List.Item>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
