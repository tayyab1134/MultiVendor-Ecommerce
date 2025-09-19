import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { BsCartPlus } from "react-icons/bs";
import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishList } from "../../redux/actions/wishlist";
import { addToCart } from "../../redux/actions/cart";
import { backend_url } from "../../server";

const Wishlist = ({ setOpenWishlist }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const removeFromWishListHandler = (id) => {
    dispatch(removeFromWishList(id));
  };

  const addToCartHandler = (data) => {
    const newData = { ...data, qty: 1 };
    dispatch(addToCart(newData));
    setOpenWishlist(false);
  };
  return (
    <div className="fixed top-16 right-4 h-[80%] w-72 bg-white flex flex-col justify-between shadow-md rounded-md overflow-y-auto z-50">
      {/* Close Button */}
      <div className="flex w-full justify-end pt-3 pr-3">
        <RxCross1
          size={20}
          className="cursor-pointer"
          onClick={() => setOpenWishlist(false)}
        />
      </div>

      {/* Heading */}
      <div className="flex items-center p-3">
        <AiOutlineHeart size={20} />
        <h5 className="pl-2 text-[16px] font-[500]">{wishlist.length} items</h5>
      </div>

      {/* Cart Items List */}
      <div className="flex-1 overflow-y-auto px-1">
        {wishlist.map((item, index) => (
          <CartSingle
            key={index}
            data={item}
            removeFromWishlistHandler={removeFromWishListHandler}
            addToCartHandler={addToCartHandler}
          />
        ))}
      </div>
    </div>
  );
};

const CartSingle = ({ data, addToCartHandler, removeFromWishListHandler }) => {
  const [value] = useState(1);
  const totalPrice = data.discountPrice * value;

  return (
    <div className="border-b px-3 py-2">
      <div className="w-full flex items-center gap-2">
        <RxCross1
          className="cursor-pointer"
          onClick={() => {
            removeFromWishListHandler(data);
          }}
        />
        <img
          src={`${backend_url}/uploads/${data?.images[0]}`}
          alt=""
          className="w-[60px] h-[60px] object-cover rounded-md"
        />

        {/* Product Info */}
        <div className="flex-1">
          <h1 className="text-sm font-medium leading-4 line-clamp-2">
            {data.name}
          </h1>
          {/*<h4 className="text-xs text-[#00000082]">
            ${data.originalPrice} x {value}
          </h4>
          */}
          <h4 className="text-sm font-semibold text-[#d02222] pt-1">
            US${totalPrice}
          </h4>
        </div>
        <div>
          <BsCartPlus
            size={20}
            className="cursor-pointer"
            tile="Add to cart"
            onClick={() => addToCartHandler(data)}
          />
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
