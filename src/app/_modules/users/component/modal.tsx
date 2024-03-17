"use client";
import React, { useEffect } from "react";
import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import createUserSlice from "@/app/_utils/redux/createUserSlice";
import SingleUploadForm from "./SingleUpload/Form";

import { Tabs } from "antd";
import type { TabsProps } from "antd";
import ViewSingleUserForm from "./ViewSingleUpload/Form";

const CustomModal = () => {
  const state = useSelector((state: any) => state.createUser);
  const { openCreateModal, setActiveKey } = createUserSlice.actions;

  const dispatch = useDispatch();
  const { isModalOpen, isUserSubmitted, activeKey, isUserCreated } = state;

  const handleCancel = () => {
    dispatch(openCreateModal(false));
  };
  const onChange = (key: string) => {
    dispatch(setActiveKey(key));
  };
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Create User Form",
      children: <SingleUploadForm />,
    },
    {
      key: "2",
      label: "View User",
      disabled: !isUserSubmitted,
      children: <ViewSingleUserForm />,
    },
  ];

  useEffect(() => {
    if (isUserCreated) {
      dispatch(openCreateModal(false));
    }
  }, [isUserCreated]);
  return (
    <Modal
      maskClosable={false}
      title={<div className="p-2">CREATE USER</div>}
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      width={1600}
    >
      <Tabs
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
        activeKey={activeKey}
      />
    </Modal>
  );
};

export default CustomModal;
