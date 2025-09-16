import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import styles from "../styles/styles";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import { useSelector } from "react-redux";

function ProductsPage() {
  const [data, setData] = useState([]);
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");

  const allProducts = useSelector((state) => state.products.allProducts);

  useEffect(() => {
    if (!categoryData) {
      // No category selected, show all products sorted by total_sell
      const sorted = allProducts
        ? [...allProducts].sort((a, b) => b.total_sell - a.total_sell)
        : [];
      setData(sorted);
    } else {
      // Filter by selected category
      const filtered = allProducts
        ? allProducts.filter(
            (p) => p.category.toLowerCase() === categoryData.toLowerCase()
          )
        : [];
      setData(filtered);
    }
  }, [allProducts, categoryData]);

  return (
    <div>
      <Header activeHeading={3} />
      <br />
      <br />
      <div className={`${styles.section}`}>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 mb-12">
          {data &&
            data.map((i, index) => (
              <ProductCard data={i} key={i._id || index} />
            ))}
        </div>

        {data && data.length === 0 && (
          <h1 className="w-full text-center pb-[100px] text-[20px]">
            No products found!
          </h1>
        )}
      </div>
    </div>
  );
}

export default ProductsPage;
