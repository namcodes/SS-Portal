"use client";
import React, { useState } from "react";
import { Checkbox, Divider } from "antd";
import type { CheckboxProps, GetProp } from "antd";

type CheckboxValueType = GetProp<typeof Checkbox.Group, "value">[number];

const CheckboxGroup = Checkbox.Group;

const plainOptions = ["Read", "Read All", "Write", "Write All"];
const defaultCheckedList = ["Read", "Write"];

export default function Page({ params }: { params: { slug: string } }) {
  const [checkedList, setCheckedList] =
    useState<CheckboxValueType[]>(defaultCheckedList);

  const checkAll = plainOptions.length === checkedList.length;
  const indeterminate =
    checkedList.length > 0 && checkedList.length < plainOptions.length;

  const onChange = (list: CheckboxValueType[]) => {
    setCheckedList(list);
  };

  const onCheckAllChange: CheckboxProps["onChange"] = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
  };

  return (
    <>
      <div>Employee Id: {params.slug}</div>
      <Divider />

      <div className="flex gap-6">
        <div>
          <h1 className="text-white">Ticket Page</h1>
          <Divider />
          <Checkbox
            indeterminate={indeterminate}
            onChange={onCheckAllChange}
            checked={checkAll}
          >
            Check all
          </Checkbox>
          <Divider />
          <CheckboxGroup
            options={plainOptions}
            value={checkedList}
            onChange={onChange}
          />
        </div>
        <div>
          <h1 className="text-white">Page Management</h1>
          <Divider />
          <Checkbox
            indeterminate={indeterminate}
            onChange={onCheckAllChange}
            checked={checkAll}
          >
            Check all
          </Checkbox>
          <Divider />
          <CheckboxGroup
            options={plainOptions}
            value={checkedList}
            onChange={onChange}
          />
        </div>
      </div>
    </>
  );
}
