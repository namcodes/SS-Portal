import React from "react";
import SharedLayout from "../_modules/_shared/layout/sharedLayout";

const HomeLayout = ({ children }: React.PropsWithChildren) => {
  return <SharedLayout>{children}</SharedLayout>;
};

export default HomeLayout;
