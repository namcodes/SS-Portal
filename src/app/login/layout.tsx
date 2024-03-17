"use client";
import React from "react";
import { Provider } from "react-redux";
import store from "../_utils/redux/store";
import { Layout, theme } from "antd";

const { Content } = Layout;

const layout = ({ children }: React.PropsWithChildren) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Provider store={store}>
      <Layout className="h-screen">
        <Layout>
          <Content>
            <div
              style={{
                minHeight: 360,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              {children}
            </div>
          </Content>
        </Layout>
      </Layout>
    </Provider>
  );
};

export default layout;
