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

  const [groupVisibility, setGroupVisibility] = useState(Array(6).fill(false)); //Sample card 5 pcs

  // const toggleGroupVisibility = (index, isHovering) => {
  //   const newVisibility = [...groupVisibility];
  //   newVisibility[index] = isHovering;
  //   setGroupVisibility(newVisibility);
  // };\
  const toggleGroupVisibility = (index, isHovering) => {
    const newVisibility = [...groupVisibility];
    newVisibility[index] = isHovering;
    setGroupVisibility(newVisibility);
  };

  return (
    <div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-5">
        {groupVisibility.map((isVisible, index) => (
          <div key={index}>
            {/* Group header */}
            <div className="bg-white p-3 cursor-pointer shadow-md rounded rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
              <img
                onClick={() => toggleGroupVisibility(index, true)}
                onMouseOut={() => toggleGroupVisibility(index, false)}
                onMouseOver={() => toggleGroupVisibility(index, true)}
                className="w-full md:w-[240px] rounded rounded-md bg-white"
                src="https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1470&amp;q=80"
                alt={`Image ${index + 1}`}
              />
            </div>

            {isVisible && (
              <div
                onMouseOver={() => toggleGroupVisibility(index, true)}
                onMouseOut={() => toggleGroupVisibility(index, false)}
                className="transition duration-150 ease-in-out fixed inset-0 z-10 overflow-y-auto "
              >
                <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                  {/* Overlay */}
                  <div className="fixed inset-0 transition-opacity">
                    <div className="absolute inset-0 bg-slate-200 opacity-75"></div>
                  </div>

                  {/* Modal content */}
                  <span
                    className="sm:inline-block sm:align-middle sm:h-screen"
                    aria-hidden="true"
                  >
                    &#8203;
                  </span>
                  <div
                    className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-headline"
                  >
                    <div className="bg-white sm:p-6 sm:pb-4">
                      {/* Modal header */}
                      <div className="sm:flex sm:items-start">
                        <div className="mt-3 text-center sm:mt-0 sm:text-left">
                          <div className="mt-2">
                            <div className="relative overflow-hidden rounded-xl bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">
                              <img
                                src="https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1470&amp;q=80"
                                alt="ui/ux review check"
                              />
                            </div>

                            <div className="py-2 mt-3">
                              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">
                                Heading {index + 1}
                              </h3>
                              <p className="block font-sans text-base font-light leading-relaxed text-gray-700 antialiased">
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit. Exercitationem voluptatibus
                                officia facere quas nobis, eaque ut distinctio
                                dolorem quidem hic.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Modal footer */}
                    <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse border border-t-1">
                      <button
                        onClick={() => toggleGroupVisibility(index, false)}
                        className="bg-red-500 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>

    /* <div className="grid grid-cols-1 grid-rows-5 gap-4 md:grid-cols-3">
    
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

    </div> */
  );
};

export default AnnoucementPage;
