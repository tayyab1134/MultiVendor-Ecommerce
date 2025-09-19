import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiPlus, HiOutlineMinus } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { backend_url } from "../../server";
import { addToCart, removeFromCart } from "../../redux/actions/cart";

const Cart = ({ setOpenCart }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const quantityChangeHandler = (data) => {
    dispatch(addToCart(data));
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  return (
    <div className="fixed top-16 right-4 h-[80%] w-72 bg-white flex flex-col justify-between shadow-md rounded-md overflow-y-auto z-50">
      {/* Close Button */}
      <div className="flex w-full justify-end pt-3 pr-3">
        <RxCross1
          size={25}
          className="cursor-pointer"
          onClick={() => setOpenCart(false)}
        />
      </div>

      {cart && cart.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
          <h5 className="text-[16px] font-medium text-gray-600">
            Cart Item is Empty!
          </h5>
        </div>
      ) : (
        <>
          {/* Heading */}
          <div className="flex items-center p-3 border-b">
            <IoBagHandleOutline size={20} />
            <h5 className="pl-2 text-[16px] font-[500]">{cart.length} items</h5>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto px-1 py-2">
            {cart.map((item, index) => (
              <CartSingle
                key={index}
                data={item}
                quantityChangeHandler={quantityChangeHandler}
                removeFromCartHandler={removeFromCartHandler}
              />
            ))}
          </div>

          {/* Checkout Button */}
          <div className="px-3 py-3 border-t">
            <Link to="/checkout">
              <div className="h-[40px] flex items-center justify-center bg-[#e44343] w-full rounded-md">
                <h1 className="text-white text-[15px] font-semibold">
                  Checkout Now (USD${totalPrice})
                </h1>
              </div>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

const CartSingle = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
  const [value, setValue] = useState(data.qty);
  const totalPrice = data.discountPrice * value;

  const increment = (data) => {
    if (data.stock <= value) {
      toast.error("Product stock limited!");
    } else {
      setValue(value + 1);

      const updateCartData = { ...data, qty: value + 1 };
      quantityChangeHandler(updateCartData);
    }
  };

  const decrement = (data) => {
    const newValue = value === 1 ? 1 : value - 1;
    setValue(newValue);
    const updateCartData = { ...data, qty: newValue };
    quantityChangeHandler(updateCartData);
  };

  return (
    <div className="border-b px-3 py-2">
      <div className="w-full flex items-center gap-2">
        {/* Quantity Controls */}
        <div className="flex flex-col items-center gap-1">
          <div
            className="bg-[#e44343] border border-[#e4434373] rounded-full w-[22px] h-[22px] flex items-center justify-center cursor-pointer"
            onClick={() => increment(data)}
          >
            <HiPlus size={14} color="#fff" />
          </div>
          <span className="text-sm">{data.qty}</span>
          <div
            className="bg-[#a7abb14f] rounded-full w-[22px] h-[22px] flex items-center justify-center cursor-pointer"
            onClick={() => decrement(data)}
          >
            <HiOutlineMinus size={12} color="#7d879c" />
          </div>
        </div>

        {/* Product Image */}
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
          <h4 className="text-xs text-[#00000082]">
            ${data.discountPrice} x {value}
          </h4>
          <h4 className="text-sm font-semibold text-[#d02222] pt-1">
            US${totalPrice}
          </h4>
        </div>

        {/* Remove Button */}
        <RxCross1
          className="cursor-pointer text-sm"
          onClick={() => removeFromCartHandler(data)}
        />
      </div>
    </div>
  );
};

export default Cart;
