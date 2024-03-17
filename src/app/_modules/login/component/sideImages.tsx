import React from "react";
import ImageConstants from "@/app/_utils/_constants";
import { Image } from "antd";
import Link from "next/link";
import Marquee from "react-fast-marquee";

const SideImages = () => {
  return (
    <div className="h-screen w-96 bg-slate-800">
      <Link
        href="https://www.enshored.com/"
        className="flex justify-center py-10"
      >
        <Image
          preview={false}
          src="/pink_ens_icon.svg"
          alt="Icon"
          fallback={ImageConstants.AltImage}
        />
      </Link>
      <Marquee pauseOnHover gradient={false}>
        <Image
          src={"/1.jpg"}
          width={200}
          preview={false}
          fallback={ImageConstants.AltImage}
        />
        <Image
          src="/2.jpg"
          width={200}
          preview={false}
          fallback={ImageConstants.AltImage}
        />
        <Image
          src="/3.jpg"
          width={200}
          preview={false}
          fallback={ImageConstants.AltImage}
        />
        <Image
          src="/4.jpg"
          width={200}
          preview={false}
          fallback={ImageConstants.AltImage}
        />
      </Marquee>
      <Marquee pauseOnHover gradient={false} direction="right">
        <Image
          src="/1.jpg"
          width={200}
          preview={false}
          fallback={ImageConstants.AltImage}
        />
        <Image
          src="/2.jpg"
          width={200}
          preview={false}
          fallback={ImageConstants.AltImage}
        />
        <Image
          src="/3.jpg"
          width={200}
          preview={false}
          fallback={ImageConstants.AltImage}
        />
        <Image
          src="/4.jpg"
          width={200}
          preview={false}
          fallback={ImageConstants.AltImage}
        />
      </Marquee>
      <Marquee pauseOnHover gradient={false} direction="left">
        <Image
          src="/1.jpg"
          width={200}
          preview={false}
          fallback={ImageConstants.AltImage}
        />
        <Image
          src="/2.jpg"
          width={200}
          preview={false}
          fallback={ImageConstants.AltImage}
        />
        <Image
          src="/3.jpg"
          width={200}
          preview={false}
          fallback={ImageConstants.AltImage}
        />
        <Image
          src="/4.jpg"
          width={200}
          preview={false}
          fallback={ImageConstants.AltImage}
        />
      </Marquee>
    </div>
  );
};

export default SideImages;
