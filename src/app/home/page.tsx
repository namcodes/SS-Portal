"use client";
import React, { useEffect, useState } from "react";
import moment from "moment";
import Home from "../_modules/home";
import AnnoucementPage from "../_modules/annoucements";
import { Image } from "antd";
import { createCache, extractStyle, StyleProvider } from "@ant-design/cssinjs";
import Document from "next/document";
import type { DocumentContext } from "next/document";

const page = () => {
  const [user, setUser] = useState<any>({});
  const [date, setDate] = useState<any>(
    moment(new Date()).format("MMMM Do YYYY, h:mm:ss a")
  );
  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
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
    <div>
      <div className="flex flex-col font-bold text-xl text-white">
      {/* bg-gradient-to-r from-[#1D364E] to-[#1d4e4e] to-80% */}
        <div className="bg-gradient-to-r from-[#28506C] via-[#663654] to-[#6C6F48] grid grid-cols-1 grid-rows-1 md:grid-cols-2  gap-5 justify-between items-center px-10 py-10 bg-[#fff] rounded-md my-5">
          <div className="order-1 flex flex-col md:flex-row gap-10">
            <div className="text-center">
              <Image
                preview={false}
                src="/Cloudsun.svg"
                width={50}
                alt="Icon"
              />
              <p className="text-white">Party Cloudy</p>
            </div>
          </div>

          <div className="order-2 flex flex-col text-sm md:text-xl text-right text-white">
              <h2>{moment(date).format("LL")}</h2>
              <h1 className="font-medium">{moment(date).format("LT")}</h1>
            </div>
        </div>
        {/* <Home /> */}
        <AnnoucementPage />
      </div>
    </div>
  );
};

page.getInitialProps = async (ctx: DocumentContext) => {
  const cache = createCache();
  const originalRenderPage = ctx.renderPage;
  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) =>
        (
          <StyleProvider cache={cache}>
            <App {...props} />
          </StyleProvider>
        ),
    });

  const initialProps = await Document.getInitialProps(ctx);
  const style = extractStyle(cache, true);
  return {
    ...initialProps,
    styles: (
      <>
        {initialProps.styles}
        <style dangerouslySetInnerHTML={{ __html: style }} />
      </>
    ),
  };
};

export default page;
