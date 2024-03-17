"use client";

import React from "react";
import apiService from "../_utils/_service/_api";
import { createCache, extractStyle, StyleProvider } from "@ant-design/cssinjs";
import Document from "next/document";
import type { DocumentContext } from "next/document";
import dynamic from "next/dynamic";
import { Skeleton } from "antd";

const Login = dynamic(async () => await import("../_modules/login"), {
  loading: () => <Skeleton />,
});

const LoginPage = () => {
  return (
    <>
      <Login apiService={apiService} />
    </>
  );
};

LoginPage.getInitialProps = async (ctx: DocumentContext) => {
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

export default LoginPage;
