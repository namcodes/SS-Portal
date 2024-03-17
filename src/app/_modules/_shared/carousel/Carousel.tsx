import React from "react";
import { Carousel } from "antd";

const contentStyle: React.CSSProperties = {
  height: "120px",
  color: "#fff",
  lineHeight: "120px",
  textAlign: "center",
  background: "#364d79",
};

const CarouselComponent = ({ items }: { items: any }) => {
  return (
    <div>
      <Carousel autoplay>
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
        <div>
          <h3 style={contentStyle}>5</h3>
        </div>
        <div>
          <h3 style={contentStyle}>6</h3>
        </div>
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
