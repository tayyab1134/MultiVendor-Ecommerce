import React, { useEffect, useState } from "react";
import { backend_url, server } from "../../server";
import styles from "../../styles/styles";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

function ShopInfo({ isOwner }) {
  const allProducts = useSelector((state) => state.products.allProducts);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();

  const totalReviewsLength =
    allProducts?.reduce((acc, product) => acc + product.reviews.length, 0) || 0;

  const totalRatings =
    allProducts?.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    ) || 0;

  const averageRating =
    totalReviewsLength > 0 ? (totalRatings / totalReviewsLength).toFixed(1) : 0;

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    axios
      .get(`${server}/shop/get-shop-info/${id}`)
      .then((res) => {
        console.log("Shop API Response:", res.data);
        // Adjust depending on API structure
        setData(res.data.shop || res.data);
      })
      .catch((error) => {
        console.error("Shop Info Error:", error);
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  const logoutHandler = async () => {
    await axios.get(`${server}/shop/logout`, { withCredentials: true });
    window.location.reload();
  };

  return (
    <div>
      {isLoading ? (
        <p className="text-center py-5">Loading shop info...</p>
      ) : !data ? (
        <p className="text-center text-red-500 py-5">Shop not found</p>
      ) : (
        <>
          <div className="w-full py-5">
            <div className="w-full flex items-center justify-center">
              <img
                src={`${backend_url}/uploads/${data?.avatar}`}
                alt=""
                className="w-[150px] h-[150px] object-cover rounded-full"
              />
            </div>
            <h3 className="text-center py-2 text-[20px]">{data?.name}</h3>
            <p className="text-[16px] text-[#000000a6] p-[10px] flex items-center">
              {data?.description}
            </p>
          </div>

          <div className="p-3">
            <h5 className="font-[600]">Address</h5>
            <h4 className="text-[#000000a6]">{data?.address || "N/A"}</h4>
          </div>

          <div className="p-3">
            <h5 className="font-[600]">Phone Number</h5>
            <h4 className="text-[#000000a6]">{data?.phoneNumber || "N/A"}</h4>
          </div>

          <div className="p-3">
            <h5 className="font-[600]">Total Products</h5>
            <h4 className="text-[#000000a6]">{allProducts?.length || 0}</h4>
          </div>

          <div className="p-3">
            <h5 className="font-[600]">Shop Ratings</h5>
            <h4 className="text-[#000000a6]">{averageRating}/5</h4>
          </div>

          <div className="p-3">
            <h5 className="font-[600]">Joined On</h5>
            <h4 className="text-[#000000a6]">
              {data?.createdAt ? data.createdAt.slice(0, 10) : "N/A"}
            </h4>
          </div>

          {isOwner && (
            <div className="py-3 px-4">
              <Link to="/settings">
                <div
                  className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}
                >
                  <span className="text-white">Edit Shop</span>
                </div>
              </Link>
              <div
                onClick={logoutHandler}
                className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}
              >
                <span className="text-white">Log Out</span>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ShopInfo;
