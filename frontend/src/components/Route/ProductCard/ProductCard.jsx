import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import { toast } from "react-toastify";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard.jsx";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import { backend_url } from "../../../server.js";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromWishList,
  addToWishList,
} from "../../../redux/actions/wishlist.js";
import { addToCart } from "../../../redux/actions/cart.js";
import Ratings from "../../Products/Ratings.jsx";

const ProductCard = ({ data, isEvent }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  const removeFromWishListHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishList(data));
  };
  const addToWishListHandler = (data) => {
    setClick(!click);
    dispatch(addToWishList(data));
  };

  const AddToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("item already in cart");
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
    <>
      <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
        <Link
          to={`${
            isEvent === true
              ? `/product/${data._id}?isEvent=true`
              : `/product/${data._id}`
          }`}
        >
          <img
            className="w-full h-[170px] object-contain"
            src={`${backend_url}/uploads/${data?.images?.[0]}`}
            alt={data?.name}
          />
        </Link>

        <Link to={`/shop/preview/${data.shop._id}`}>
          <h5 className={`${styles.shop_name}`}>{data.shop.name}</h5>
        </Link>

        <Link
          to={`${
            isEvent === true
              ? `/product/${data._id}?isEvent=true`
              : `/product/${data._id}`
          }`}
        >
          <h4 className="pb-3 font-[500]">
            {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
          </h4>

          <div className="flex">
            <Ratings rating={data?.ratings} />
          </div>

          {/* Price & Sold Out */}
          <div className="py-2 flex items-center justify-between">
            <div className="flex gap-2 items-baseline">
              <h5 className={`${styles.productDiscountPrice}`}>
                {data.discountPrice ? `${data.discountPrice}$` : ""}
              </h5>
              {data.originalPrice > 0 && (
                <h4 className={`${styles.price}`}>{data.originalPrice}$</h4>
              )}
            </div>
            <span className="font-[400] text-[14px] text-[#68d284]">
              {data?.sold_out}sold
            </span>
          </div>
        </Link>

        {/* Icons */}
        <div className="absolute right-2 top-5 flex flex-col gap-3">
          {/* Wishlist Icon */}
          <div className="bg-black/70 p-1 rounded-full shadow-md">
            {click ? (
              <AiFillHeart
                size={20}
                onClick={() => removeFromWishListHandler(data)}
                color="red"
                title="Remove from wishlist"
                className="cursor-pointer"
              />
            ) : (
              <AiOutlineHeart
                size={20}
                onClick={() => addToWishListHandler(data)}
                color="#fff"
                title="Add to wishlist"
                className="cursor-pointer"
              />
            )}
          </div>

          {/* Quick View Icon */}
          <div className="bg-black/70 p-1 rounded-full shadow-md">
            <AiOutlineEye
              size={20}
              onClick={() => setOpen(true)}
              color="#fff"
              title="Quick view"
              className="cursor-pointer"
            />
          </div>

          {/* Add to Cart Icon */}
          <div className="bg-black/70 p-1 rounded-full shadow-md">
            <AiOutlineShoppingCart
              size={22}
              onClick={() => AddToCartHandler(data)}
              color="#fff"
              title="Add to cart"
              className="cursor-pointer"
            />
          </div>
        </div>

        {/* Product Details Modal */}
        {open && <ProductDetailsCard setOpen={setOpen} data={data} />}
      </div>
    </>
  );
};

export default ProductCard;
