"use client";
import apiService from "@/app/_utils/_service/_api";
import {
  useReactQueryGet,
  useReactQueryMutate,
} from "@/app/_utils/_service/_react-query";
import { Button, Divider, Form, Input, List, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { Modal } from "antd";

const Positions = () => {
  const [openCreate, setOpenCreate] = useState(false);
  const [positionData, setPositionData] = useState([]);
  const [form] = Form.useForm();
  const { createPosition, listAllPositions } = apiService();
  const position: any = useReactQueryMutate({
    mutationFn: createPosition,
    queryKey: ["allPositions"],
  });
  const positionList = useReactQueryGet({
    queryFn: listAllPositions,
    queryKey: ["allPositions"],
  });

  const onFinish = (value) => {
    position.mutate({ ...value });
  };

  useEffect(() => {
    if (positionList.isFetched) {
      console.log("positionList.data.data", positionList.data.data);
      setPositionData(positionList.data.data);
    }
  }, [positionList.isFetched]);

  return (
    <div>
      <Modal
        open={openCreate}
        onCancel={() => setOpenCreate(!openCreate)}
        title="Create Position"
        footer={null}
      >
        <Form
          name="basic"
          onFinish={onFinish}
          layout="horizontal"
          form={form}
          initialValues={{ layout: "horizontal" }}
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 18,
          }}
          labelAlign="right"
        >
          <Divider />
          <Form.Item
            label="Position"
            colon={false}
            name="position"
            rules={[{ required: true }]}
          >
            <Input placeholder="Example: Virtual Assistant" />
          </Form.Item>
          <Divider />
          <div className="flex justify-center">
            <Button
              htmlType="submit"
              className=" !bg-ens-pink !rounded-full !hover:bg-pink-hover !text-white"
              id="login-button"
            >
              Create
            </Button>
          </div>
        </Form>
      </Modal>

      <div className="flex justify-end">
        <Button onClick={() => setOpenCreate(!openCreate)}>
          Create Position
        </Button>
      </div>
      <Divider />
      <List
        className="demo-loadmore-list"
        loading={positionList.isFetching}
        itemLayout="horizontal"
        dataSource={positionData}
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 5,
        }}
        renderItem={(item) => (
          <List.Item actions={[<Button key="list-loadmore-edit">Edit</Button>]}>
            <Skeleton
              avatar
              title={false}
              loading={positionList.isFetching}
              active
            >
              <List.Item.Meta
                title={<a href="https://ant.design">{item.title}</a>}
              />
            </Skeleton>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Positions;
