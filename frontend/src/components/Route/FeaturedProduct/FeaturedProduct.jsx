//import { productData } from "../../../static/data";
import ProductCard from "../ProductCard/ProductCard";
import styles from "../../../styles/styles";
import { useSelector } from "react-redux";

function FeaturedProduct() {
  const  allProducts  = useSelector((state) => state.products.allProducts);
  return (
    <div className={`${styles.section}`}>
      <div className={`${styles.heading}`}>
        <h1 className="text-2xl font-semibold mb-4">Featured Products</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-12">
        {allProducts &&
          allProducts.map((item, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-xl shadow-md h-full flex flex-col justify-between"
            >
              <ProductCard data={item} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default FeaturedProduct;
