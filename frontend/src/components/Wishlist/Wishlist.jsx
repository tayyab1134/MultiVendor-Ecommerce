import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import {BsCartPlus} from "react-icons/bs"
import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";

// Sample product data
const cartData = [
  {
    name: "Samsung Tab S6 Lite 10.4-inch Android Tablet",
    price: 200,
    qty: 2,
  },
  {
    name: "iPhone 15 Pro Max 256GB Titanium",
    price: 400,
    qty: 1,
  },
  {
    name: "Google Pixel Buds Pro Wireless Earbuds",
    price: 100,
    qty: 3,
  },
];

const Wishlist = ({setOpenWishlist}) => {
  return (
    <div className='fixed top-16 right-4 h-[80%] w-72 bg-white flex flex-col justify-between shadow-md rounded-md overflow-y-auto z-50'>
      {/* Close Button */}
      <div className='flex w-full justify-end pt-3 pr-3'>
        <RxCross1 size={20} className='cursor-pointer' onClick={() => setOpenWishlist(false)} />
      </div>

      {/* Heading */}
      <div className='flex items-center p-3'>
        <AiOutlineHeart size={20} />
        <h5 className='pl-2 text-[16px] font-[500]'>{cartData.length} items</h5>
      </div>

      {/* Cart Items List */}
      <div className='flex-1 overflow-y-auto px-1'>
        {cartData.map((item, index) => (
          <CartSingle key={index} data={item} />
        ))}
      </div>

      {/* Checkout Button */}
      
    </div>
  );
};

const CartSingle = ({ data }) => {
  const [value, setValue] = useState(1);
  const totalPrice = data.price * value;

  return (
    <div className='border-b px-3 py-2'>
      <div className='w-full flex items-center gap-2'>
        <RxCross1 className="cursor-pointer"/>
        <img
          src='https://tse2.mm.bing.net/th/id/OIP.sd2vcFRGE0KUD3Rwv1KJnQAAAA?pid=Api&P=0&h=220'
          alt=''
          className='w-[60px] h-[60px] object-cover rounded-md'
        />
        {/* Quantity Controls */}
       

        {/* Product Image */}
        

        {/* Product Info */}
        <div className='flex-1'>
          <h1 className='text-sm font-medium leading-4 line-clamp-2'>
            {data.name}
          </h1>
          <h4 className='text-xs text-[#00000082]'>
            ${data.price} x {value}
          </h4>
          <h4 className='text-sm font-semibold text-[#d02222] pt-1'>
            US${totalPrice}
          </h4>
        </div>
     <div>
        <BsCartPlus size={20} className="cursor-pointer" tile="Add to cart" />
     </div>
      </div>
    </div>
  );
};

export default Wishlist;