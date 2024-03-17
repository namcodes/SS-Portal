"use client";
import React, { useState, useEffect, useRef } from "react";
import { logout } from "@/app/_utils/_helpers/saveToLocalStorage";
import Link from "next/link";
import {
  Avatar,
  Badge,
  MenuProps,
  Dropdown,
  Button,
  Tour,
  AutoComplete,
  Input,
} from "antd";
import {
  InfoCircleOutlined,
  LockOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { TourProps } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { deleteCookie } from "@/app/_utils/_helpers/deleteCookie";
import { useRouter } from "next/navigation";
import apiService from "@/app/_utils/_service/_api";
import { useReactQueryGet } from "@/app/_utils/_service/_react-query";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://console.jumpcloud.com/#/users"
      >
        Users
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://console.jumpcloud.com/#/groups/user"
      >
        User Groups
      </a>
    ),
  },
  {
    key: "3",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://console.jumpcloud.com/#/applications"
      >
        SSO Applications
      </a>
    ),
  },
];

type NavbarProps = {
  className?: string;
};

const Navbar = ({ className }: { className?: NavbarProps }) => {
  const router = useRouter();
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const [open, setOpen] = useState<boolean>(false);
  const { listAllUsers } = apiService();
  const [allUsers, setAllUsers] = useState([]);

  const users = useReactQueryGet({
    queryFn: listAllUsers,
    queryKey: ["navAllUsers"],
  });

  useEffect(() => {
    if (users.isFetched) {
      setAllUsers(users?.data?.data);
    }
    if (users.isError) {
      setAllUsers([]);
    }
  }, [users.isFetched, users.isError]);

  const steps: TourProps["steps"] = [
    {
      title: "Submit a ticket",
      description: "This will redirect you to the link of our ticket page.",

      target: () => ref1.current,
    },
    {
      title: "Zendesk",
      description:
        "Some of related matters regarding zendesk will be seen here.",
      target: () => ref2.current,
    },
    {
      title: "Jumpcloud",
      description:
        "Some of related matters regarding jumpcloud will be seen here.",
      target: () => ref3.current,
    },
  ];

  const [user, setUser] = useState<any>({});
  const [avatar, setAvatar] = useState<any>("ENS");
  useEffect(() => {
    if (localStorage.getItem("user")) {
      let userStored: any = localStorage.getItem("user");
      userStored = JSON.parse(userStored);
      const firstLetter = Array.from(userStored.firstName)[0];
      const lastNameLetter = Array.from(userStored.lastName)[0];
      setAvatar(`${firstLetter} ${lastNameLetter}`);
      setUser(userStored);
    } else {
      setUser({ firstName: "ENSHORED", lastName: "USER" });
    }
    if (!localStorage.getItem("tutorial")) {
      setOpen(true);
      localStorage.setItem("tutorial", "true");
    }
  }, []);

  const userItems: MenuProps["items"] = [
    {
      label: (
        <Link href="/settings" className="md:hidden">
          {user.firstName} {user.lastName}
        </Link>
      ),
      key: "0",
      className: "md:hidden"
    },
    {
      type: "divider",
      className: "md:hidden"
    },
    {
      style: { padding: "10px" },
      label: (
        <Link href="/settings">
          <SettingOutlined className="pr-2" /> User Settings
        </Link>
      ),
      key: "1",
    },
    {
      style: { padding: "10px" },
      label: (
        <Link href="/settings">
          <LockOutlined className="pr-2" /> Change Password
        </Link>
      ),
      key: "3",
    },
    {
      style: { padding: "10px" },
      label: (
        <Link href="/settings">
          <InfoCircleOutlined className="pr-2" /> Help and Support
        </Link>
      ),
      key: "4",
    },

    {
      type: "divider",
    },
    {
      style: { paddingLeft: "10px" },
      label: (
        <Button
          className="items-center flex border-none pl-0"
          style={{ background: "none", gap: "3px" }}
          onClick={async () => {
            await deleteCookie();
            await logout();
            router.push("/login", { scroll: false });
          }}
        >
          <LogoutOutlined />
          <span>Logout</span>
        </Button>
      ),
      key: "3",
    },
  ];

  const renderTitle = (title: string) => (
    <span>
      {title}
      <a
        style={{ float: "right" }}
        href="https://www.google.com/search?q=antd"
        target="_blank"
        rel="noopener noreferrer"
      >
        more
      </a>
    </span>
  );

  const renderItem = (title: string) => ({
    value: title,
    label: (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {title}
      </div>
    ),
  });

  const options = [
    {
      label: renderTitle("Users"),
      options: allUsers.map(({ firstName, lastName }) =>
        renderItem(`${firstName} ${lastName}`)
      ),
    },
    {
      label: renderTitle("Solutions"),
      options: [renderItem("AntDesign UI FAQ"), renderItem("AntDesign FAQ")],
    },
    {
      label: renderTitle("Articles"),
      options: [renderItem("AntDesign design language")],
    },
  ];

  const [isOpen, setIsOpen] = useState(false);
  return (
    /*  <nav
      className={`bg-white !font-poppins z-50 py-4 px-16 flex justify-between items-center ${className} w-full`}
    >
      
      <div className="flex gap-2 items-center justify-end w-full">
        <div className="flex justify-end gap-2 items-center w-full">
        <AutoComplete
            popupClassName="certain-category-search-dropdown"
            popupMatchSelectWidth={400}
            style={{ minWidth: 150 }} 
            options={options}
          >
            <Input.Search size="large" placeholder="Search..." />
          </AutoComplete>

        </div>

        <div ref={ref3}>
          <Dropdown menu={{ items }} placement="bottomRight">
            <Link
              ref={ref3}
              href="/login"
              className=" border-none bg-transparent "
            >
              Jumpcloud
            </Link>
          </Dropdown>
        </div>

        <Link href="/login" className=" border-none bg-transparent " ref={ref2}>
          Zendesk
        </Link>

        <Link
          href="https://enshoredit.zendesk.com/hc/en-us/requests/new"
          className="d-none"
          style={{textWrap: 'nowrap'}}
          ref={ref1}
        >
          Submit a ticket
        </Link>
        <div></div>
      </div>

      <div className="flex gap-10 items-center w-45">
      
        <Dropdown
          menu={{ items: userItems }}
          placement="bottomRight"
          trigger={["click"]}
          className="cursor-pointer"
          overlayClassName="w-[250px]"
          openClassName="py-5"
        >
         <Avatar className="shadow-md">{avatar}</Avatar>
      
        </Dropdown>
      </div>

      <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
    </nav>*/

    <nav className="bg-white !font-poppins z-50 md:px-5 w-full">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
            {isOpen ? (
              <path
                fillRule="evenodd"
                d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
              />
            ) : (
              <path
                fillRule="evenodd"
                d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
              />
            )}
          </svg>
        </button>

        <div className="flex gap-10 items-center w-45">
          <Dropdown
            menu={{ items: userItems }}
            placement="bottomRight"
            trigger={["click"]}
            className="md:order-last cursor-pointer"
            overlayClassName="w-[250px]"
          >
            <div className="flex items-center gap-3">
              <Avatar className="shadow-md">{avatar}</Avatar>

              <div className="hidden md:block">
                {" "}
                {user.firstName} {user.lastName}
              </div>
            </div>
          </Dropdown>
        </div>

        <Tour open={open} onClose={() => setOpen(false)} steps={steps} />

        <div
          className={`md:order-first w-full md:block md:w-auto ${
            isOpen ? "block" : "hidden"
          } `}
        >
          <ul className="font-medium flex flex-col md:items-center px-4 md:p-0 mt-4 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
          <li className="order-last md:order-first">
              <AutoComplete
                popupClassName="certain-category-search-dropdown"
                popupMatchSelectWidth={400}
                style={{ minWidth: 150 }}
                options={options}
              >
                <Input.Search size="large" placeholder="Search..." />
              </AutoComplete>
            </li>
            <li>
              <div ref={ref3}>
                <Dropdown menu={{ items }} placement="bottomRight">
                  <Link
                    ref={ref3}
                    href="/login"
                    className="py-2 block text-left text-gray-900 md:p-0"
                  >
                    Jumpcloud
                  </Link>
                </Dropdown>
              </div>
            </li>
            <li>
              <Link
                href="/login"
                className="py-2 block text-left text-gray-900 md:p-0"
                ref={ref2}
              >
                Zendesk
              </Link>
            </li>
            <li>
              <Link
                href="https://enshoredit.zendesk.com/hc/en-us/requests/new"
                className="py-2 block text-left text-gray-900 md:p-0"
                style={{ textWrap: "nowrap" }}
                ref={ref1}
              >
                Submit a ticket
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    /*<div className="flex items-center justify-between px-4 py-3 sm:p-0">
      <div>
        <img className="h-8" src="/img/logo-inverted.svg" alt="Workcation" />
      </div>
      <div className="sm:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="block text-gray-500 hover:text-black focus:text-black focus:outline-none"
        >
          <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
            {isOpen ? (
              <path
                fillRule="evenodd"
                d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
              />
            ) : (
              <path
                fillRule="evenodd"
                d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
              />
            )}
          </svg>
        </button>
      </div>
      <nav
        className={`px-2 pt-2 pb-4 sm:flex sm:p-0 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8  md:mt-0 md:border-0 md:bg-white md:dark:bg-gray-900">
          <li>
            <a
              href="#"
              className="block py-2 px-3 text-white md:text-blue-700 md:p-0  "
              aria-current="page"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block py-2 px-3 text-gray-900 md:p-0"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block py-2 px-3 text-gray-900 md:p-0"
            >
              Services
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block py-2 px-3 text-gray-900 md:p-0"
            >
              Pricing
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block py-2 px-3 text-gray-900 md:p-0"
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </div>*/
  );
};

export default Navbar;
