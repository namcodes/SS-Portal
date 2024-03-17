import type { TableColumnsType } from "antd";

interface DataType {
  program: string;
  position: string;
  startDate: string;
}

export const uploadCols: TableColumnsType<DataType> = [
  {
    title: "EmployeeId",
    dataIndex: "employeeId",
  },
  {
    title: "First Name",
    dataIndex: "firstName",
  },
  {
    title: "Last Name",
    dataIndex: "lastName",
  },
  {
    title: "Middle Name",
    dataIndex: "middleName",
  },
  {
    title: "Gender",
    dataIndex: "gender",
  },
  {
    title: "Contact Number",
    dataIndex: "contactNumber",
  },
  {
    title: "Personal Email",
    dataIndex: "alternativeEmail",
  },
  {
    title: "Preferred Name",
    dataIndex: "preferredName",
  },
  {
    title: "Start Date",
    dataIndex: "startDate",
  },
  {
    title: "Direct Reports",
    dataIndex: "directReportName",
  },
  {
    title: "Second Level Approver",
    dataIndex: "secondLevelApproverName",
  },

  {
    title: "Shift Start Time",
    dataIndex: "shiftStartTime",
  },
  {
    title: "Shift End Time",
    dataIndex: "shiftEndTime",
  },
  {
    title: "Program",
    dataIndex: "program",
  },
  {
    title: "Position",
    dataIndex: "position",
  },
  {
    title: "Employee Type",
    dataIndex: "employeeType",
  },
];

export const bulkUploadCols: TableColumnsType<DataType> = [
  {
    title: "EmployeeId",
    dataIndex: "employeeId",
  },
  {
    title: "First Name",
    dataIndex: "firstName",
  },
  {
    title: "Last Name",
    dataIndex: "lastName",
  },
  {
    title: "Middle Name",
    dataIndex: "middleName",
  },
  {
    title: "Gender",
    dataIndex: "gender",
    filters: [
      {
        text: "Male",
        value: "male",
      },
      {
        text: "Female",
        value: "female",
      },
      {
        text: "LGBTQ+",
        value: "LGBTQ+",
      },
    ],
  },
  {
    title: "Contact Number",
    dataIndex: "contactNumber",
  },
  {
    title: "Personal Email",
    dataIndex: "alternativeEmail",
  },
  {
    title: "Preferred Name",
    dataIndex: "preferredName",
  },

  {
    title: "Employee Type",
    dataIndex: "employeeType",
  },
];
