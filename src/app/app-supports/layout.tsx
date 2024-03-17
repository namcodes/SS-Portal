import React from "react";
import SharedLayout from "../_modules/_shared/layout/sharedLayout";

const AppSupportLayout = ({ children }: React.PropsWithChildren) => {
  return <SharedLayout>{children}</SharedLayout>;
};

export default AppSupportLayout;
