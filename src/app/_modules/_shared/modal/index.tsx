import React from "react";
import { Modal } from "antd";

const SharedCustomModal = ({
  children,
  isModalOpen,
  handleOk,
  title,
  ...props
}) => {
  return (
    <Modal {...props} title={title} open={isModalOpen} onOk={handleOk}>
      {children}
    </Modal>
  );
};

export default SharedCustomModal;
