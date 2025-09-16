import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiPlus, HiOutlineMinus } from "react-icons/hi";
import { Link } from "react-router-dom";

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

const Cart = ({setOpenCart}) => {
  return (
    <div className='fixed top-16 right-4 h-[80%] w-72 bg-white flex flex-col justify-between shadow-md rounded-md overflow-y-auto z-50'>
      {/* Close Button */}
      <div className='flex w-full justify-end pt-3 pr-3'>
        <RxCross1 size={20} className='cursor-pointer' onClick={() => setOpenCart(false)} />
      </div>

      {/* Heading */}
      <div className='flex items-center p-3'>
        <IoBagHandleOutline size={20} />
        <h5 className='pl-2 text-[16px] font-[500]'>{cartData.length} items</h5>
      </div>

      {/* Cart Items List */}
      <div className='flex-1 overflow-y-auto px-1'>
        {cartData.map((item, index) => (
          <CartSingle key={index} data={item} />
        ))}
      </div>

      {/* Checkout Button */}
      <div className='px-3 mb-2'>
        <Link to="/checkout">
          <div className='h-[40px] flex items-center justify-center bg-[#e44343] w-full rounded-md'>
            <h1 className='text-white text-[15px] font-semibold'>
              Checkout Now (USD $1000)
            </h1>
          </div>
        </Link>
      </div>
    </div>
  );
};

const CartSingle = ({ data }) => {
  const [value, setValue] = useState(1);
  const totalPrice = data.price * value;

  return (
    <div className='border-b px-3 py-2'>
      <div className='w-full flex items-center gap-2'>
        {/* Quantity Controls */}
        <div className='flex flex-col items-center gap-1'>
          <div
            className='bg-[#e44343] border border-[#e4434373] rounded-full w-[22px] h-[22px] flex items-center justify-center cursor-pointer'
            onClick={() => setValue(value + 1)}
          >
            <HiPlus size={14} color="#fff" />
          </div>
          <span className='text-sm'>{value}</span>
          <div
            className='bg-[#a7abb14f] rounded-full w-[22px] h-[22px] flex items-center justify-center cursor-pointer'
            onClick={() => setValue(value === 1 ? 1 : value - 1)}
          >
            <HiOutlineMinus size={12} color='#7d879c' />
          </div>
        </div>

        {/* Product Image */}
        <img
          src='https://tse2.mm.bing.net/th/id/OIP.sd2vcFRGE0KUD3Rwv1KJnQAAAA?pid=Api&P=0&h=220'
          alt=''
          className='w-[60px] h-[60px] object-cover rounded-md'
        />

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

        {/* Remove Button */}
        <RxCross1 className='cursor-pointer text-sm' />
      </div>
    </div>
  );
};

export default Cart;