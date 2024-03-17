"use client";
import React from "react";
import { Layout } from "antd";
import dynamic from "next/dynamic";
import { Provider } from "react-redux";
import store from "../_utils/redux/store";

const DynamicNav = dynamic(() => import("../_components/navbar/Navbar"), {
  loading: () => <p>Loading...</p>,
});
const DynamicFooter = dynamic(
  async () => await import("../_components/footer/Footer"),
  {
    loading: () => <p>Loading...</p>,
  }
);

const DynamicSideNav = dynamic(
  async () => await import("@/app/_components/sidenav"),
  {
    loading: () => <p>Loading...</p>,
  }
);

const AnnoucementsLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <Provider store={store}>
      <Layout className="h-full">
        <DynamicSideNav />
        <Layout>
          <div className=" relative">
            <DynamicNav />
            <div className="flex flex-col">
              <main className=" py-[86px] px-20">{children}</main>
            </div>
          </div>
          <DynamicFooter />
        </Layout>
      </Layout>
    </Provider>
  );
};

export default AnnoucementsLayout;
