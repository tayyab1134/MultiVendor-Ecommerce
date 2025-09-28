import React from "react";
import styles from "../../../styles/styles";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div
      className={`relative min-h-[70vh] pt-20 md:pt-0 md:min-h-[88vh] w-full bg-no-repeat ${styles.noramlFlex}`}
      style={{
        backgroundImage:
          "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)",
      }}
    >
      <div className={`${styles.section} w-[90%] md:w-[60%]`}>
        <h1
          className={`text-[35px] leading-[1.2] md:text-[60px] text-[#3d3a3a] font-[600] capitalize `}
        >
          Best Collection for <br /> Home Decoration
        </h1>
        <p className="pt-5 text-[16px] font-[Poppins] font-[400] text-[#000000ba]">
          Explore the best collection for your home — where every detail is
          designed to inspire. Beautifully crafted pieces that bring life and
          warmth to every corner.
          <br /> From cozy textiles to elegant décor, each item adds comfort and
          character to your space. <br /> Create a home that feels just right —
          timeless, welcoming, and uniquely yours.
        </p>
        <Link to="/products" className="inline-block">
          <div
            className={`${styles.button} mt-5 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-white font-[Poppins] text-[18px] px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105`}
          >
            <span className="text-[#fff] font-[Poppins] text-[18px]">
              Shop Now
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
