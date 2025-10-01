import React from "react";
import CountDown from "./CountDown.jsx";
import styles from "../../styles/styles.js";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/actions/cart.js";
import { toast } from "react-toastify";

const EventPage = ({ data }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addToCartHandler = (data) => {
    const isItemExists = cart && cart.find((i) => i._id === data._id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addToCart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  return (
    <div className="w-full  bg-white p-6 md:p-10">
      {/* Container with equal height for image and details */}
      <div className="flex flex-col md:flex-row gap-8 md:gap-10 items-start">
        {/* Left Side - Image */}

        <div className="w-full md:w-1/2 flex justify-center items-center">
          <img
            src={`${data?.images[0] || "default-image.png"}`}
            alt={data?.name || "Event Image"}
            className="w-full max-w-[500px] max-h-[450px] object-contain rounded-xl shadow"
          />
        </div>
        {/* Right Side - Details */}
        <div className="w-full md:w-1/1 flex flex-col justify-between gap-5">
          <div>
            <h2
              className={`${styles.productTitle} text-2xl md:text-3xl font-bold`}
            >
              {data.name}
            </h2>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed mt-2">
              {data.description}
            </p>
            {/* Prices */}
            <div className="flex items-center gap-4 mt-4">
              {data?.originalPrice && (
                <h5 className="text-lg md:text-xl text-red-500 line-through">
                  ${data.originalPrice}
                </h5>
              )}
              <h5 className="text-2xl md:text-3xl font-bold text-gray-900">
                ${data?.discountPrice || 0}
              </h5>
            </div>
            {/* Stock */}
            <span className="text-green-600 font-medium mt-2">
              {data?.sold_out || 0} Sold
            </span>
            {/* Countdown */}
            <div className="mt-4">
              <CountDown data={data} />
            </div>
          </div>
          {/* Buttons at the bottom */}
          <div className="flex flex-wrap gap-4 mt-6">
            <Link to={`/product/${data._id}?isEvent=true`}>
              <button className="bg-black text-white px-5 py-2 rounded-lg shadow hover:bg-gray-800 transition">
                See Details
              </button>
            </Link>
            <button
              onClick={() => addToCartHandler(data)}
              className="bg-black text-white px-5 py-2 rounded-lg shadow hover:bg-gray-800 transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
