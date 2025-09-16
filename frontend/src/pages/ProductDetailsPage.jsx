import React, { useEffect, useState } from "react";
import Footer from "../components/Route/Footer";
import Header from "../components/Layout/Header";
import { useParams } from "react-router-dom";
//import { productData } from "../static/data";
import ProductDetails from "../components/Products/ProductDetails";
import SuggestedProduct from "../components/Products/SuggestedProduct";
import { useSelector } from "react-redux";
function ProductDetailsPage() {
  const {id} = useParams();
    const [data,setData] = useState(null);
     
    const allProducts = useSelector((state) => state.products.allProducts);
     const { allEvents} = useSelector((state) => state.events);
    
 useEffect(() => {
    if (!id) return;

    // First try to find in products
    let found = allProducts.find((i) => i._id === id);

    // If not found in products, try events
    if (!found) {
      found = allEvents.find((i) => i._id === id);
    }

    setData(found || null);
  }, [allProducts, allEvents, id]);
  return (
    <div>
        <Header/>
        <ProductDetails data={data}/>
        {
          data && <SuggestedProduct data={data}/>
        }
        <Footer/>
    </div>
  )
}

export default ProductDetailsPage;



