"use client";
import React, { useEffect, useState, useMemo, useRef } from "react";
import {
  Tooltip,
  Input,
  Button,
  ColorPicker,
  Select,
  Spin,
  notification,
  Card,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import incidentReportSlice from "@/app/_utils/redux/incidentReportSlice";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { toPng } from "html-to-image";
import { DownloadOutlined } from "@ant-design/icons";
import { formats } from "@/app/_utils/_constants/reactQuillFormats";
import CreatedLists from "./components/createdLists";
import DraftLists from "./components/draftLists";
import { useReactQueryMutate } from "@/app/_utils/_service/_react-query";
import apiService from "@/app/_utils/_service/_api";

import { DatePicker } from "antd";

const ScheduledMaintenance = () => {
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    if (localStorage.getItem("user")) {
      let userStored: any = localStorage.getItem("user");
      userStored = JSON.parse(userStored);
      setUser(userStored);
    }
  }, []);

  const [header, setHeader] = useState("");
  const [subheader, setSubheader] = useState("");
  const [bodyData, setBody] = useState(null);
  const [incidentHeader, setIncidentHeader] = useState("");
  const [incidentBg, setIncidentBg] = useState("1677ff");
  const [incidentTextColor, setIncidentTextColor] = useState("#fff");
  const { incidentReport } = incidentReportSlice.actions;
  const [downloading, setDownloading] = useState(false);
  const dispatch = useDispatch();
  const { createIncidentReport } = apiService();
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (error: string) => {
    api["error"]({
      message: "BACKEND ERROR",
      description: error,
    });
  };

  const {
    mutate,
    isSuccess,
    data,
    isError,
    error,
    isLoading,
  }: {
    mutate: any;
    isSuccess: boolean;
    data: any;
    isError: boolean;
    error: any;
    isLoading: boolean;
  } = useReactQueryMutate({
    mutationFn: createIncidentReport,
    queryKey: ["#"],
  });

  const mutationDraft = useReactQueryMutate({
    mutationFn: createIncidentReport,
    queryKey: ["#"],
  });

  const submitForm = () => {
    mutate({
      isDraft: false,
      bodyData: report.body,
      header: report.header,
      incidentHeader: report.incidentHeader,
      subHeader: report.subheader,
      createdBy: user.employeeId,
    });
  };

  const submitDraftForm = () => {
    mutationDraft.mutate({
      isDraft: true,
      bodyData: report.body,
      header: report.header,
      incidentHeader: report.incidentHeader,
      subHeader: report.subheader,
      createdBy: user.employeeId,
    });
  };

  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  const state = useSelector((state: any) => state.incidentReport);
  const { report } = state;

  const onInputChange = (e: any) => {
    const inputName = e.target.name;
    let sampleObj: any = {};
    sampleObj[inputName] = e.target.value;
    dispatch(incidentReport({ ...sampleObj }));
  };

  const onColorPickerChange = (value: any) => {
    dispatch(incidentReport({ incidentColor: value.toHex().toUpperCase() }));
  };
  const onTextColorChange = (value: any) => {
    dispatch(
      incidentReport({ incidentTextColor: value.toHex().toUpperCase() })
    );
  };

  useEffect(() => {
    setHeader(report.header);
    setSubheader(report.subheader);
    setIncidentHeader(report.incidentHeader);
    setIncidentBg(report.incidentColor);
    setIncidentTextColor(report.incidentTextColor);
  }, [report]);

  const changeBodyInput = (e: any) => {
    setBody(e);
    dispatch(incidentReport({ body: e }));
  };

  useEffect(() => {
    if (isError) {
      openNotification(error.data);
    }
    if (mutationDraft.isError) {
      const draftError: any = mutationDraft.error;
      openNotification(draftError.data);
    }
  }, [isError, mutationDraft.isError]);

  const elementRef = useRef(null);
  const htmlToImageConvert = async () => {
    if (elementRef) {
      if (elementRef.current) {
        const { current } = elementRef;
        setDownloading(true);
        await toPng(current, {
          cacheBust: false,
          canvasWidth: 816,
          canvasHeight: 1000,
        })
          .then((dataUrl) => {
            setDownloading(false);
            const link = document.createElement("a");
            link.download = "incident-report.png";
            link.href = dataUrl;
            link.click();
          })
          .catch((err: any) => {
            console.log("ERROR:", err);
            openNotification(err);
            setDownloading(false);
          });
      }
    }
  };

  return (
    <div>
      {contextHolder}
      <Spin
        spinning={downloading || isLoading || mutationDraft.isLoading}
        fullscreen
      />
      <div className="grid grid-cols-1 md:grid-cols-3 bg-white gap-5 px-5 py-5 mt-5">
        <div className="order-1 col-span-1 row-span-2 flex flex-col gap-5">
          <Input
            onChange={onInputChange}
            name="header"
            placeholder="Header"
            className=" text-l"
            value={header}
          />
          <Input
            onChange={onInputChange}
            placeholder="Subheader"
            name="subheader"
            className="text-l"
            value={subheader}
          />
          <div className="flex items-center gap-2">
            <Input
              onChange={onInputChange}
              placeholder="Maintenance Header"
              name="incidentHeader"
              className="text-l"
              value={incidentHeader}
            />
            <Tooltip
              placement="right"
              title="Incident Header Background"
              color="white"
            >
              <ColorPicker
                defaultValue={incidentBg ? incidentBg : "black"}
                value={incidentBg}
                onChange={onColorPickerChange}
              />
            </Tooltip>
            <Tooltip placement="right" title="Text Color" color="white">
              <ColorPicker
                defaultValue="#fff"
                onChange={onTextColorChange}
                value={incidentTextColor}
              />
            </Tooltip>
          </div>
          <ReactQuill
            placeholder="Body"
            className="bg-white rounded-lg"
            onChange={changeBodyInput}
            modules={{
              toolbar: [
                [{ header: "1" }, { header: "2" }],

                ["bold", "italic", "underline", "strike"],

                [
                  { list: "ordered" },
                  { list: "bullet" },
                  { indent: "-1" },
                  { indent: "+1" },
                ],
                ["link", "image", "video"],
                ["clean"],
              ],
            }}
            formats={formats}
          />

          <Select placeholder="Distros">
            <Select.Option value="test">Test</Select.Option>
          </Select>

          {/* Add Start Date and End Date */}
          <div className="flex gap-4">
            <DatePicker placeholder="Start Date" />
            <DatePicker placeholder="End Date" />
          </div>

          {/* Status */}
          <Select placeholder="Status">
            <Select.Option value="Open">Open</Select.Option>
            <Select.Option value="close">Close</Select.Option>
          </Select>

          <Button
            style={{ backgroundColor: "#C82951", color: "#fff" }}
            onClick={() => submitForm()}
          >
            Publish
          </Button>
          <Button onClick={() => submitDraftForm()}>Draft</Button>
        </div>

        <div className="order-2 col-span-1 md:col-span-2 grid gap-5 ">
          <div className="col-span-2 relative w-full">
            <Button
              onClick={htmlToImageConvert}
              className="flex items-center text-white gap-2 absolute top-3 right-3"
            >
              <span>
                <DownloadOutlined />
              </span>
              Download
            </Button>

            <div className="bg-white" ref={elementRef}>
              <div className="bg-report-bg h-52 bg-cover">
                <div className=" font-bold font-kepler-std flex flex-col justify-center px-8 py-10">
                  <h1 className=" text-7xl text-[#FFDA3C]">{header}</h1>
                  <h1 className="text-white text-3xl">{subheader}</h1>
                </div>
              </div>
              <h1
                className=" text-sm px-8 text-center font-bold py-1"
                style={{
                  backgroundColor: `#${incidentBg}`,
                  color: `#${incidentTextColor}`,
                }}
              >
                {incidentHeader}
              </h1>
              {bodyData && (
                <div
                  className="bg-white text-lg px-8 text-justify text-[#1D364E] py-4 "
                  dangerouslySetInnerHTML={{ __html: bodyData }}
                ></div>
              )}
            </div>
          </div>

          <div className="order-3 col-span-2 grid gap-5">
            <DraftLists />
            <CreatedLists />
          </div>
        </div>
      </div>

      {/*<div className="flex justify-between px-5 py-5 gap-10">
        <div className=" w-1/2 flex flex-col gap-5">
          <Input
            onChange={onInputChange}
            name="header"
            placeholder="Header"
            className=" text-l"
            value={header}
          />
          <Input
            onChange={onInputChange}
            placeholder="Subheader"
            name="subheader"
            className="text-l"
            value={subheader}
          />
          <div className="flex items-center gap-2">
            <Input
              onChange={onInputChange}
              placeholder="Maintenance Header"
              name="incidentHeader"
              className="text-l"
              value={incidentHeader}
            />
            <Tooltip
              placement="right"
              title="Incident Header Background"
              color="white"
            >
              <ColorPicker
                defaultValue={incidentBg ? incidentBg : "black"}
                value={incidentBg}
                onChange={onColorPickerChange}
              />
            </Tooltip>
            <Tooltip placement="right" title="Text Color" color="white">
              <ColorPicker
                defaultValue="#fff"
                onChange={onTextColorChange}
                value={incidentTextColor}
              />
            </Tooltip>
          </div>
          <ReactQuill
            placeholder="Body"
            className="bg-white rounded-lg"
            onChange={changeBodyInput}
            modules={{
              toolbar: [
                [{ header: "1" }, { header: "2" }],

                ["bold", "italic", "underline", "strike"],

                [
                  { list: "ordered" },
                  { list: "bullet" },
                  { indent: "-1" },
                  { indent: "+1" },
                ],
                ["link", "image", "video"],
                ["clean"],
              ],
            }}
            formats={formats}
          />

          <Select placeholder="Distros">
            <Select.Option value="test">Test</Select.Option>
          </Select>

          <div className="flex gap-4">
            <DatePicker placeholder="Start Date" />
            <DatePicker placeholder="End Date" />
          </div>

        
          <Select placeholder="Status">
            <Select.Option value="Open">Open</Select.Option>
            <Select.Option value="close">Close</Select.Option>
          </Select>

          <Button
            style={{ backgroundColor: "#C82951", color: "#fff" }}
            onClick={() => submitForm()}
          >
            Publish
          </Button>
          <Button onClick={() => submitDraftForm()}>Draft</Button>

          <DraftLists />
          <CreatedLists />
        </div>

        <div className="relative">
          <Button
            onClick={htmlToImageConvert}
            className="flex items-center text-white gap-2 absolute top-0 right-0"
          >
            <span>
              <DownloadOutlined />
            </span>
            Download
          </Button>

          <div className=" w-[800px] h-[1000px] bg-white" ref={elementRef}>
            <div className=" bg-report-bg h-52 bg-cover">
              <div className=" font-bold font-kepler-std flex flex-col justify-center px-8 py-10">
                <h1 className=" text-7xl text-[#FFDA3C]">{header}</h1>
                <h1 className="text-white text-3xl">{subheader}</h1>
              </div>
            </div>
            <h1
              className=" text-sm px-8 text-center font-bold py-1"
              style={{
                backgroundColor: `#${incidentBg}`,
                color: `#${incidentTextColor}`,
              }}
            >
              {incidentHeader}
            </h1>
            {bodyData && (
              <div
                className="bg-white text-lg px-8 text-justify text-[#1D364E] py-4 "
                dangerouslySetInnerHTML={{ __html: bodyData }}
              ></div>
            )}
          </div>
        </div>
      </div>*/}
    </div>
  );
};

export default ScheduledMaintenance;
