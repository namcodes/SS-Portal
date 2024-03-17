"use client";
import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Upload, Spin } from "antd";
import s3Upload from "@/app/_utils/_helpers/uploader";
import { useDispatch } from "react-redux";
import createUserSlice from "@/app/_utils/redux/createUserSlice";

const { Dragger } = Upload;

const PdfDndInput = () => {
  const { setPdfUrl } = createUserSlice.actions;
  const [uploading, setIsUploading] = useState(false);
  const dispatch = useDispatch();

  const handleMedia = async (file: any) => {
    if (!file && file.length === 0) {
      return;
    } else {
      const s3FileName = await s3Upload({
        file,
        dir: "tga",
        bucket: process.env.S3_BUCKET,
      });

      dispatch(setPdfUrl(s3FileName.s3Path));
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
    accept: ".pdf",
    customRequest: uploadRequest,
  };

  return (
    <Dragger {...props}>
      <Spin spinning={uploading} fullscreen />
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Click or drag <span className="font-bold text-ens-yellow">PDF </span>
        file to this area to upload
      </p>
      <p className="ant-upload-hint">
        Support for a single
        <span className="font-bold text-ens-yellow"> PDF FILE</span> upload.
        Strictly prohibited from uploading banned files.
      </p>
    </Dragger>
  );
};

export default PdfDndInput;
