import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import styles from "../styles/styles";
//import { productData } from "../static/data";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import { useSelector } from "react-redux";

function BestSellingPage() {
  const [data, setData] = useState([]);
  const allProducts = useSelector((state) => state.products.allProducts);

  useEffect(() => {
    const d =
      allProducts && [...allProducts].sort((a, b) => b.sold_out - a.sold_out);
    setData(d);
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Header activeHeading={2} />
      <br />
      <br />
      <div className={`${styles.section}`}>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
          {data && data.map((i, index) => <ProductCard data={i} key={index} />)}
        </div>
        {data && data.length === 0 ? (
          <h1 className="w-full text-center pb-[100px] text-[20px]">
            No products found!
          </h1>
        ) : null}
      </div>
    </div>
  );
}

export default BestSellingPage;
