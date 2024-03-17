"use client";
import React, { useEffect, useState, useMemo, useRef } from "react";


import {
  Tooltip,
  Input,
  Button,
  ColorPicker,
  Spin,
  notification,
  DatePicker,
  List,
  Select,
} from "antd";
import {InfoCircleFilled} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import incidentReportSlice from "@/app/_utils/redux/incidentReportSlice";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { toPng } from "html-to-image";
import { DownloadOutlined } from "@ant-design/icons";
import { formats } from "@/app/_utils/_constants/reactQuillFormats";
import DraftLists from "./components/draftLists";
import { useReactQueryMutate } from "@/app/_utils/_service/_react-query";
import apiService from "@/app/_utils/_service/_api";
import CreatedLists from "./components/createdLists";
import { Big_Shoulders_Display } from "next/font/google";

const IncidentReport = () => {
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
  const [incidentBg, setIncidentBg] = useState("454545");
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
    queryKey: ["allIncidentReports"],
  });

  const mutationDraft = useReactQueryMutate({
    mutationFn: createIncidentReport,
    queryKey: ["allIncidentReportsDraft"],
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

  
  // const onColorPickerChange = (value: any) => {
  //   dispatch(incidentReport({ incidentColor: value.toUpperCase() }));
  // };
  // const onTextColorChange = (value: any) => {
  //   console.log(value);
  //   dispatch(
  //     incidentReport({ incidentTextColor: value.toUpperCase() })
  //   );
  // };


  // const onTextColorChange = (value: any, bg: any) => {
  //   console.log();
  //   dispatch(
  //     incidentReport({ incidentTextColor: value.toUpperCase(), incidentColor: bg})
  //   );
  // };

  const onTextColorChange = (value:any, selectedOption: any) => {
      dispatch(
        incidentReport({ incidentTextColor: selectedOption.text.toUpperCase(), incidentColor: value.toUpperCase()})
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
      <div className="flex justify-between px-10 py-5  gap-10">
        <div className=" w-1/2 flex flex-col gap-5">
          <Input
            onChange={onInputChange}
            name="header"
            placeholder="Header"
            className="text-l"
            value={header}
          />
          <Input
            onChange={onInputChange}
            placeholder="Subheader"
            name="subheader"
            className=" text-l"
            value={subheader}
          />
          <div className="flex items-center gap-2">
            <Input
              onChange={onInputChange}
              placeholder="Incident Header"
              name="incidentHeader"
              className="text-l"
              value={incidentHeader}
            />
             <Select
                  defaultValue="#fff"
                  style={{
                    width: 250,
                  }}
                  placeholder="Priority"
                  onChange={onTextColorChange}
                  value={incidentTextColor}
                  options={[
                    {
                      value: 'E83760',
                      text : "FFFFFF",
                      label: (
                        <>
                         <div style={{color: "#E83760"}}> <InfoCircleFilled />{" "}Priority 1</div>
                        </>),
                    },
                    {
                      value: 'FFDA3C',
                      text : "1D364E",
                      label: (
                        <>
                         <div style={{color: "#FFDA3C"}}> <InfoCircleFilled />{" "}Priority 2</div>
                        </>),
                    },
                    {
                      value: 'A2C62C',
                      text : "1D364E",
                      label: (
                        <>
                         <div style={{color: "#a2c62c"}}> <InfoCircleFilled />{" "}Priority 3</div>
                        </>),
                    },
                    {
                      value: '008DC4',
                      text : "1D364E",
                      label: (
                        <>
                         <div style={{color: "#008DC4"}}> <InfoCircleFilled />{" "}Priority 4</div>
                        </>),
                    },
                  ]}
                />
        
               

            {/* <Tooltip
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
            </Tooltip>*/}
          </div>
          <ReactQuill
            placeholder="Body"
            className=" border !border-gray-200 rounded-lg"
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
            <Select.Option value="open">Open</Select.Option>
            <Select.Option value="close">Close</Select.Option>
          </Select>

          <Button style={{backgroundColor: "#C82951", color: "#fff"}} onClick={() => submitForm()}>Publish</Button>
          <Button onClick={() => submitDraftForm()}>Draft</Button>
          
          <DraftLists />
          <CreatedLists />
        </div>
        <div className="relative">
          <Button
            onClick={htmlToImageConvert}
            className="flex items-center gap-2 absolute top-0 right-0 text-white"
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
      </div>

      <div></div>
    </div>
  );
};

export default IncidentReport;
