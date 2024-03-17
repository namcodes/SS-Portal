"use client";
import React from "react";
import { Select, Space } from "antd";
import type { SelectProps } from "antd";

const handleChange = (value: string[]) => {};

const options: SelectProps["options"] = [
  {
    label: "Test",
    value: "test",
    desc: "Test (test@gmail.com)",
  },
  {
    label: "Test1",
    value: "test1",
    desc: "Test1 (test1@gmail.com)",
  },
  {
    label: "Test2",
    value: "test2",
    desc: "Test2 (test2@gmail.com)",
  },
  {
    label: "Test3",
    value: "test3",
    desc: "Test3 (test3@gmail.com)",
  },
];
const CustomSelect = () => {
  return (
    <Select
      mode="multiple"
      style={{ width: "100%" }}
      placeholder="Select an email"
      defaultValue={[]}
      onChange={handleChange}
      optionLabelProp="label"
      options={options}
      optionRender={(option) => (
        <Space>
          <span role="img" aria-label={option.data.label}>
            {option.data.emoji}
          </span>
          {option.data.desc}
        </Space>
      )}
    />
  );
};

export default CustomSelect;
