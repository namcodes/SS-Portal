"use client";

import React, { useEffect, useState } from "react";
import { Layout, Skeleton } from "antd";
import dynamic from "next/dynamic";
import { Provider } from "react-redux";
import store from "../../../_utils/redux/store";
import { getAccessKey } from "@/app/_utils/_helpers/getCookie";
import { jwtDecode } from "jwt-decode";
import SharedCustomModal from "../modal";
import { useRouter } from "next/navigation";
import { logout } from "@/app/_utils/_helpers/saveToLocalStorage";
import {
  deleteCookie,
  deleteCookieAccess,
} from "@/app/_utils/_helpers/deleteCookie";
import { createCache, extractStyle, StyleProvider } from "@ant-design/cssinjs";
import Document from "next/document";
import type { DocumentContext } from "next/document";

interface JwtPayload {
  sub: string;
  name: string;
  email: string;
  access: string;
  iat: number;
  exp: number;
  auth: string;
}

const DynamicNav = dynamic(() => import("../../../_components/navbar/Navbar"), {
  loading: () => <Skeleton />,
});
const DynamicFooter = dynamic(
  async () => await import("../../../_components/footer/Footer"),
  {
    loading: () => <Skeleton />,
  }
);

const DynamicSideNav = dynamic(
  async () => await import("@/app/_components/sidenav"),
  {
    loading: () => <Skeleton />,
  }
);

const SharedLayout = ({ children }: React.PropsWithChildren) => {
  const [cookie, setCookie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const getCookieFunc = async () => {
      const cookieData: any = await getAccessKey();
      setCookie(cookieData);
    };

    getCookieFunc();
  }, []);

  useEffect(() => {
    if (cookie) {
      const { value } = cookie;

      const token = jwtDecode(value) as JwtPayload;

      const date = new Date();
      const unixTimestamp = Math.floor(date.getTime() / 1000);

      if (token?.exp) {
        if (token?.exp < unixTimestamp) {
          setIsModalOpen(true);
        }
      }
    }
  }, [cookie]);

  return (
    <Provider store={store}>
      <Layout className="h-full">
        <DynamicSideNav />
        <SharedCustomModal
          props={{
            closable: false,
            cancelButtonProps: { style: { display: "none" } },
          }}
          title="Session Expired"
          children={<>Your session has been expired please re-login</>}
          isModalOpen={isModalOpen}
          handleOk={async () => {
            await deleteCookie();
            await deleteCookieAccess();
            await logout();
            router.push("/login");
          }}
        />
        <Layout className="bg-[#fafafa]">
          <DynamicNav />
          <div className="flex flex-col">
            <main className="px-5 md:px-10">{children}</main>
          </div>

          <DynamicFooter />
        </Layout>
      </Layout>
    </Provider>
  );
};

SharedLayout.getInitialProps = async (ctx: DocumentContext) => {
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

export default SharedLayout;
