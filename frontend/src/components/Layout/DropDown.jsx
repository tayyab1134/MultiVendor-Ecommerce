import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles"; // Make sure this file exists and has .normalFlex class
import { categoriesData } from "../../static/data";

const DropDown = ({ setDropDown }) => {
  const navigate = useNavigate();

  const submitHandle = (category) => {
    navigate(`/products?category=${category.title}`);
    setDropDown(false);
  };

  return (
    <div className="pb-4 w-[270px] bg-white absolute top-full left-0 z-30 rounded-b-md shadow-sm">
      {/* Scrollable List */}
      <div className="max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
        {categoriesData &&
          categoriesData.map((item, index) => (
            <div
              key={index}
              className={`${styles.normalFlex} px-3 py-2 hover:bg-gray-100 cursor-pointer`}
              onClick={() => submitHandle(item)}
            >
              <img
                src={item.image_Url}
                alt={item.title}
                style={{
                  width: "25px",
                  height: "25px",
                  objectFit: "contain",
                  userSelect: "none",
                }}
              />
              <h3 className="ml-3 select-none">{item.title}</h3>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DropDown;
