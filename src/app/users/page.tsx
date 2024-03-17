"use client";
import React from "react";
import { Skeleton } from "antd";
import dynamic from "next/dynamic";
import { createCache, extractStyle, StyleProvider } from "@ant-design/cssinjs";
import Document from "next/document";
import type { DocumentContext } from "next/document";

const UsersPage = dynamic(async () => await import("../_modules/users"), {
  loading: () => <Skeleton />,
});

const Users = () => {
  return (
    <>
      <UsersPage />
    </>
  );
};

Users.getInitialProps = async (ctx: DocumentContext) => {
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

export default Users;
