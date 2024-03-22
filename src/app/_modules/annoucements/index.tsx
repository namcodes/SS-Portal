"use client";
import React, { useEffect, useState } from "react";
import { Card, Avatar, List, Space, Badge } from "antd";
import {
  GooglePlusOutlined,
  LaptopOutlined,
  UserOutlined,
} from "@ant-design/icons";
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
    <div>
      {/* icon lists */}
      <div className="grid grid-cols-5 grid-rows-1 text-center text-black items-center text-3xl bg-gray-200 py-3">
        <div>
          <LaptopOutlined />
        </div>
        <div>
          <GooglePlusOutlined />
        </div>
        <div>
          <UserOutlined />
        </div>
        <div>
          <LaptopOutlined />
        </div>
        <div>
          <LaptopOutlined />
        </div>
      </div>
      <div className="grid grid-cols-1 grid-rows-1 gap-3 md:grid-cols-3 mt-3">
        {/* 1st Group */}
        <div>
          <Card
            title="Incident Reports"
            className="rounded-md h-full"
            extra={<a href="#">More</a>}
          >
            <div className="overflow-y-scroll h-[500px]">
            <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Officiis, perferendis.
              </p>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Officiis, perferendis.
              </p>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Officiis, perferendis.
              </p>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Officiis, perferendis.
              </p>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Officiis, perferendis.
              </p>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Officiis, perferendis.
              </p>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Officiis, perferendis.
              </p>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Officiis, perferendis.
              </p>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Officiis, perferendis.
              </p>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Officiis, perferendis.
              </p>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Officiis, perferendis.
              </p>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Officiis, perferendis.
              </p>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Officiis, perferendis.
              </p>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Officiis, perferendis.
              </p>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Officiis, perferendis.
              </p>
            </div>
          </Card>
        </div>
        {/* 2nd Group */}
        <div>
          <Card
            title="Title Here"
            className="mb-5 rounded-md"
            extra={<a href="#">More</a>}
          >
            <div className="h-[150px] overflow-y-scroll">
              <ul style={{paddingLeft: "25px" }}>
                <li>Lorem ipsum dolor sit amet.</li>
                <li>Similique amet rem quibusdam accusamus.</li>
                <li>Inventore fugit vel natus soluta?</li>
                <li>Modi maiores eaque fugiat enim!</li>
                <li>Eum eaque aliquam facere dicta.</li>
                <li>Nobis repellendus ea accusantium nisi?</li>
                <li>Molestias dignissimos possimus vitae officia.</li>
                <li>Totam nostrum officia minus laudantium.</li>
                <li>Id sit quod minima laboriosam.</li>
                <li>Esse laborum asperiores placeat sunt!</li>
              </ul>
            </div>
          </Card>
          <Card
            title="Title Here"
            className="rounded-md"
            extra={<a href="#">More</a>}
          >
            <div className="overflow-y-scroll">
              <ul style={{ listStyle: "auto", paddingLeft: "25px" }}>
                <li>Lorem ipsum dolor sit amet.</li>
                <li>Similique amet rem quibusdam accusamus.</li>
                <li>Inventore fugit vel natus soluta?</li>
                <li>Modi maiores eaque fugiat enim!</li>
                <li>Eum eaque aliquam facere dicta.</li>
                <li>Nobis repellendus ea accusantium nisi?</li>
                <li>Molestias dignissimos possimus vitae officia.</li>
                <li>Totam nostrum officia minus laudantium.</li>
                <li>Id sit quod minima laboriosam.</li>
                <li>Esse laborum asperiores placeat sunt!</li>
              </ul>
            </div>
          </Card>
        </div>
        {/* 3rd Group */}
        <div>
          <Card
            title="Title Here"
            className="rounded-md"
            extra={<a href="#">More</a>}
          >
            <div className="h-[500px] overflow-y-scroll">
              <ul style={{ listStyle: "auto", paddingLeft: "25px" }}>
                <li>Lorem ipsum dolor sit amet.</li>
                <li>Similique amet rem quibusdam accusamus.</li>
                <li>Inventore fugit vel natus soluta?</li>
                <li>Modi maiores eaque fugiat enim!</li>
                <li>Eum eaque aliquam facere dicta.</li>
                <li>Nobis repellendus ea accusantium nisi?</li>
                <li>Molestias dignissimos possimus vitae officia.</li>
                <li>Totam nostrum officia minus laudantium.</li>
                <li>Id sit quod minima laboriosam.</li>
                <li>Esse laborum asperiores placeat sunt!</li>
                <li>Lorem ipsum dolor sit amet.</li>
                <li>Similique amet rem quibusdam accusamus.</li>
                <li>Inventore fugit vel natus soluta?</li>
                <li>Modi maiores eaque fugiat enim!</li>
                <li>Eum eaque aliquam facere dicta.</li>
                <li>Nobis repellendus ea accusantium nisi?</li>
                <li>Molestias dignissimos possimus vitae officia.</li>
                <li>Totam nostrum officia minus laudantium.</li>
                <li>Id sit quod minima laboriosam.</li>
                <li>Esse laborum asperiores placeat sunt!</li>
                <li>Lorem ipsum dolor sit amet.</li>
                <li>Similique amet rem quibusdam accusamus.</li>
                <li>Inventore fugit vel natus soluta?</li>
                <li>Modi maiores eaque fugiat enim!</li>
                <li>Eum eaque aliquam facere dicta.</li>
                <li>Nobis repellendus ea accusantium nisi?</li>
                <li>Molestias dignissimos possimus vitae officia.</li>
                <li>Totam nostrum officia minus laudantium.</li>
                <li>Id sit quod minima laboriosam.</li>
                <li>Esse laborum asperiores placeat sunt!</li>
                <li>Lorem ipsum dolor sit amet.</li>
                <li>Similique amet rem quibusdam accusamus.</li>
                <li>Inventore fugit vel natus soluta?</li>
                <li>Modi maiores eaque fugiat enim!</li>
                <li>Eum eaque aliquam facere dicta.</li>
                <li>Nobis repellendus ea accusantium nisi?</li>
                <li>Molestias dignissimos possimus vitae officia.</li>
                <li>Totam nostrum officia minus laudantium.</li>
                <li>Id sit quod minima laboriosam.</li>
                <li>Esse laborum asperiores placeat sunt!</li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AnnoucementPage;
