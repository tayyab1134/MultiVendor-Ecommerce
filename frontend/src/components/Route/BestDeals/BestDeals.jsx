import { useEffect, useState } from "react";
//import { productData } from "../../../static/data";
import ProductCard from "../ProductCard/ProductCard";
import styles from "../../../styles/styles";
import { useSelector } from "react-redux";

function BestDeals() {
  const [data, setData] = useState([]);
  const allProducts = useSelector((state) => state.products.allProducts);

  useEffect(() => {
    if (allProducts && allProducts.length > 0) {
      const d = [...allProducts].sort((a, b) => b.sold_out - a.sold_out);
      const firstFive = d.slice(0, 5);
      setData(firstFive);
    }
  }, [allProducts]);
  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Best Deals</h1>
        </div>
        <div className="grid grid-cols-1 gap-[5px] md:grid-cols-2 md:gap-[10px] lg:grid-cols-4 lg:gap-[20px] xl:grid-cols-5 xl:gap-[30px]">
          {data && data.map((i, index) => <ProductCard data={i} key={index} />)}
        </div>
      </div>
    </div>
  );
}

export default BestDeals;
