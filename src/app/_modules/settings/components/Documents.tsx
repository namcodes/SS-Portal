import React from "react";
import { Image } from "antd";
const Documents = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <Image src="/maintenance.gif" preview={false} width={400}></Image>
      <h1 className="font-bold text-2xl ">Still in development</h1>
    </div>
  );
};

export default Documents;
