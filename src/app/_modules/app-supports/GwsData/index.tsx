"use client";
import apiService from "@/app/_utils/_service/_api";
import { useReactQueryGet } from "@/app/_utils/_service/_react-query";
import { Table } from "antd";
import React, { useEffect, useState } from "react";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Primary Email",
    dataIndex: "primaryEmail",
    key: "primaryEmail",
  },
  {
    title: "Organization Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Organization Department",
    dataIndex: "department",
    key: "department",
  },
  {
    title: "Organization Center",
    dataIndex: "costCenter",
    key: "orgCenter",
  },
  {
    title: "Email Alias",
    dataIndex: "nonEditableAliases",
    key: "alias",
  },
];

const GwsListUsers = () => {
  const { listAllGwsUsers } = apiService();
  const [gwsUsers, setGwsUsers] = useState([]);
  const gwsUsersEndpoint = useReactQueryGet({
    queryFn: listAllGwsUsers,
    queryKey: ["allUsersGws"],
  });

  useEffect(() => {
    setGwsUsers(gwsUsersEndpoint?.data?.data);
  }, [gwsUsersEndpoint.isFetched]);
  return <Table dataSource={gwsUsers} columns={columns} />;
};

export default GwsListUsers;
