import React from "react";
import {
  UserOutlined,
  PieChartFilled,
  HomeFilled,
  SettingOutlined,
  ImportOutlined,
  SnippetsFilled,
  FolderOpenOutlined,
  ReconciliationFilled,
} from "@ant-design/icons";

export const sideNavAdmin = [
  {
    key: "home",
    icon: React.createElement(HomeFilled),
    label: "Home",
  },
  {
    key: "hr",
    icon: React.createElement(UserOutlined),
    label: "Human Resource",
    children: [
      {
        key: "users",

        label: "Create newly hire",
      },
      {
        key: "requests/reserve-a-room",

        label: "Placeholder",
      },
    ],
  },
  {
    key: "requests",
    icon: React.createElement(ReconciliationFilled),
    label: "Requests",
    children: [
      {
        key: "requests/unlock-account",

        label: "Unlock locked accounts",
      },
      {
        key: "requests/reserve-a-room",

        label: "Reserve a room",
      },
    ],
  },

  {
    key: "page-management",
    icon: React.createElement(FolderOpenOutlined),
    label: "Page Management",
    children: [
      {
        key: "page-management/incident-reports",

        label: "Incident Reports",
      },
      {
        key: "page-management/scheduled-maintenance",

        label: "Scheduled Maintenance",
      },
      {
        key: "page-management/knowledge-base",

        label: "Knowledge Base",
      },
      {
        key: "page-management/policies",

        label: "Policies",
      },
      {
        key: "page-management/advisories",

        label: "Advisories",
      },
    ],
  },
  { key: "charts", icon: React.createElement(PieChartFilled), label: "Charts" },
  {
    key: "tickets",
    icon: React.createElement(SnippetsFilled),
    label: "Tickets",
    children: [
      {
        key: "tickets/it",

        label: "IT",
      },
      {
        key: "tickets/hr",

        label: "Human Resource",
      },
      {
        key: "tickets/payroll",

        label: "Payroll",
      },
    ],
  },
  { key: "import", icon: React.createElement(ImportOutlined), label: "Import" },

  {
    key: "settings",
    icon: React.createElement(SettingOutlined),
    label: "Settings",
  },
];

export const sideNavUsers = [
  {
    key: "home",
    icon: React.createElement(HomeFilled),
    label: "Home",
  },
  {
    key: "settings",
    icon: React.createElement(SettingOutlined),
    label: "Settings",
  },
];

export const sideNavHR = [
  {
    key: "home",
    icon: React.createElement(HomeFilled),
    label: "Home",
  },
  {
    key: "hr",
    icon: React.createElement(UserOutlined),
    label: "Human Resource",
    children: [
      {
        key: "users",

        label: "Create newly hire",
      },
      {
        key: "hr/placeholder",

        label: "Placeholder",
      },
    ],
  },
  {
    key: "requests",
    icon: React.createElement(ReconciliationFilled),
    label: "Requests",
    children: [
      {
        key: "requests/unlock-account",

        label: "Unlock locked accounts",
      },
    ],
  },
  {
    key: "settings",
    icon: React.createElement(SettingOutlined),
    label: "Settings",
  },
];
