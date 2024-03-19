import React from "react";
import Image from "next/image";
import Link from "next/link";
import { LinkOutlined } from "@ant-design/icons";
const Footer = () => {
  return (
    <footer className="flex py-4 justify-evenly bg-[#eeeeee] mt-5 md:mt-10 flex-wrap">
      <div className="flex-wrap">
        <div className="flex gap-4 mb-2">
          <Image
            src="/yle.png"
            alt="work life balance icon"
            width={69}
            height={69}
          />
          <Image
            src="/inc500.png"
            alt="work life balance icon"
            width={69}
            height={69}
          />
          <Image
            src="/wlb.png"
            alt="work life balance icon"
            width={69}
            height={69}
          />
        </div>
        <span className="text-left">
          Copyright © 2024 Enshored. <br /> All Rights Reserved.
          <br /> Privacy Policy <br /> GDPR
          <br /> Privacy Notice for California Residents
          <br /> Cookie Policy
        </span>
      </div>
      <div className="p-5 md:p-0">
        <h1 className="text-2xl font-bold text-center">Contact Us</h1>
        <div className="flex gap-7 flex-wrap">
          <div className="">
            <h2 className="  text-xl font-bold">Human Resources</h2>
            <Link href="" className="flex items-center gap-2">
              <LinkOutlined /> <span>hr@enshored.com</span>
            </Link>
          </div>
          <div className="">
            <h2 className=" text-xl font-bold">Human Resources</h2>
            <Link href="" className="flex items-center gap-2">
              <LinkOutlined /> <span>hr@enshored.com</span>
            </Link>
          </div>
          <div className="">
            <h2 className=" text-xl font-bold">Human Resources</h2>
            <Link href="" className="flex items-center gap-2">
              <LinkOutlined /> <span>hr@enshored.com</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
