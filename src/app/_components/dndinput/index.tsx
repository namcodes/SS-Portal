"use client";
import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { message, Upload, Spin } from "antd";
import s3Upload from "@/app/_utils/_helpers/uploader";
import userBulkSlice from "@/app/_utils/redux/userBulkSlice";
import { useDispatch } from "react-redux";

const { Dragger } = Upload;

const DndInput = () => {
  const { setCsvUrl } = userBulkSlice.actions;
  const [uploading, setIsUploading] = useState(false);
  const dispatch = useDispatch();

  const handleMedia = async (file: any) => {
    if (file.length === 0) {
      return;
    } else {
      const s3FileName = await s3Upload({
        file,
        dir: "collections",
        bucket: process.env.S3_BUCKET,
      });

      dispatch(setCsvUrl(s3FileName.s3Path));
    }
  };

  const uploadRequest = ({ file, onSuccess }: any) => {
    setIsUploading(true);
    handleMedia(file);
    setIsUploading(false);
    onSuccess("ok");
  };

  const props: UploadProps = {
    name: "file",
    multiple: false,
    maxCount: 1,
    accept: ".csv",
    customRequest: uploadRequest,
    onChange(info) {},
    onDrop(e) {
      handleMedia(e.dataTransfer.files);
    },
  };

  return (
    <Dragger {...props}>
      <Spin spinning={uploading} fullscreen />
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Click or drag <span className="font-bold text-ens-yellow">CSV </span>
        file to this area to upload
      </p>
      <p className="ant-upload-hint">
        Support for a single
        <span className="font-bold text-ens-yellow"> CSV FILE</span> upload.
        Strictly prohibited from uploading banned files.
      </p>
    </Dragger>
  );
};

export default DndInput;
