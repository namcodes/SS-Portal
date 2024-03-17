import React, { ReactNode } from "react";

const Advisories = ({ children }: { children: ReactNode }) => {
  return <div className=" h-screen">{children}</div>;
};

export default Advisories;
