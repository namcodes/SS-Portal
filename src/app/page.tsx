"use client";
import dynamic from "next/dynamic";

import SideNav from "./_components/sidenav";
import { Layout } from "antd";
import { Provider } from "react-redux";
import store from "./_utils/redux/store";

const DynamicNav = dynamic(() => import("./_components/navbar/Navbar"), {
  loading: () => <p>Loading...</p>,
});
const DynamicFooter = dynamic(() => import("./_components/footer/Footer"), {
  loading: () => <p>Loading...</p>,
});

export default function Home() {
  return (
    <Provider store={store}>
      <Layout className="">
        <SideNav />
        <Layout>
          <div className=" relative">
            <DynamicNav />
            <div className="flex flex-col">
              <main className=" py-[86px] h-screen"></main>
            </div>
          </div>
          <DynamicFooter />
        </Layout>
      </Layout>
    </Provider>
  );
}
