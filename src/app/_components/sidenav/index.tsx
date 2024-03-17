"use client";

import React, { useEffect, useState } from "react";
import { LogoutOutlined } from "@ant-design/icons";
import { Image, Divider, Button, Layout, Menu } from "antd";
import { useRouter } from "next/navigation";
import ImageConstants from "@/app/_utils/_constants";
import currentPathSlice from "@/app/_utils/redux/currentPathSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { deleteCookie } from "@/app/_utils/_helpers/deleteCookie";
import {
  sideNavAdmin,
  sideNavHR,
  sideNavUsers,
} from "@/app/_utils/_constants/sideNavItems";
import { getSideNav } from "@/app/_utils/_helpers/getCookie";
import sideNavSlice from "@/app/_utils/redux/sideNavSlice";
import { logout } from "@/app/_utils/_helpers/saveToLocalStorage";
const { Sider } = Layout;

const SideNav = () => {
  const { collapsable } = sideNavSlice.actions;
  const { reroute } = currentPathSlice.actions;
  const [items, setItems] = useState([]);
  const [user, setUser] = useState<any>({});
  const collapseState = useSelector((state: any) => state.sidenav);
  const { collapsed } = collapseState;

  const dispatch = useDispatch();
  const router = useRouter();
  const state = useSelector((state: any) => state.reroute);
  const openKey = state.key;
  useEffect(() => {
    let userAccess: any = null;
    async function promiseCookie() {
      userAccess = await getSideNav();
      if (userAccess === "ss_admin") {
        const sideNav: any = sideNavAdmin;
        setItems(sideNav);
      } else if (userAccess === "ss_hr") {
        const sideNavigationUser: any = sideNavHR;
        setItems(sideNavigationUser);
      } else {
        const sideNavUser: any = sideNavUsers;
        setItems(sideNavUser);
      }
    }
    promiseCookie();
  }, []);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      let userStored: any = localStorage.getItem("user");
      userStored = JSON.parse(userStored);
      setUser(userStored);
    } else {
      setUser({
        firstName: "Test",
        lastName: "User",
        position: "Test Job",
      });
    }
  }, []);

  return (
    <Sider
      theme="light"
      width={280}
      className=" z-50 select-none"
      collapsible
      collapsed={collapsed}
      onCollapse={(value: any) => dispatch(collapsable(value))}
    >
      <div className="demo-logo-vertical " />
      {!collapsed && (
        <div className="flex flex-col justify-center items-center  p-8">
          <Image
            preview={false}
            src="/pink_ens_icon.svg"
            width={100}
            alt="Icon"
            fallback={ImageConstants.AltImage}
          />
          <h1 className="font-bold text-center">
            {user.firstName} {user.lastName}
          </h1>
          <h1 className="text-sm text-slate-500">TEST POSITION</h1>
        </div>
      )}
      {collapsed && (
        <div className="p-2">
          <Image
            preview={false}
            src="/pink_ens_icon.svg"
            alt="Icon"
            fallback={ImageConstants.AltImage}
          />
        </div>
      )}

      <Divider style={{ background: "rgba(255,255,255,.08)" }} />
      <Menu
        mode="inline"
        selectedKeys={[openKey]}
        items={items}
        onClick={({ key }) => {
          dispatch(reroute(key));
          router.push(`/${key}`, { scroll: false });
        }}
      />
      <Divider style={{ background: "rgba(255,255,255,.08)" }} />
      {!collapsed && (
        <div className="flex px-6 text-white">
          <Button
            className="text-ens-pink bg-transparent flex items-center gap-2 font-bold hover:!text-ens-yellow border-none"
            onClick={async () => {
              await deleteCookie();
              await logout();
              router.push("/login", { scroll: false });
            }}
          >
            <span>
              <LogoutOutlined className="font-bold" />
            </span>
            <span>Logout</span>
          </Button>
        </div>
      )}
    </Sider>
  );
};

export default SideNav;
