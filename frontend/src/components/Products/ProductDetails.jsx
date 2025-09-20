import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "../../styles/styles";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { backend_url } from "../../server";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/actions/cart";
import { getAllProductsShop } from "../../redux/actions/product";
import Ratings from "./Ratings";
import {
  removeFromWishList,
  addToWishList,
} from "../../redux/actions/wishlist";

function ProductDetails({ data }) {
  const allProducts = useSelector((state) => state.products.allProducts);

  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getAllProductsShop(id));
    if (wishlist && wishlist.find((i) => i._id === data?._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [dispatch, wishlist, data]);

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
      if (data.stock < count) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: count };
        dispatch(addToCart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  const totalReviewsLength =
    allProducts?.length > 0
      ? allProducts.reduce(
          (acc, product) => acc + (product?.reviews?.length || 0),
          0
        )
      : 0;

  const totalRatings =
    allProducts?.length > 0
      ? allProducts.reduce(
          (acc, product) =>
            acc +
            (product.reviews?.length > 0
              ? product.reviews.reduce(
                  (sum, review) => sum + (review.rating || 0),
                  0
                )
              : 0),
          0
        )
      : 0;

  const averageRating =
    totalReviewsLength > 0 ? (totalRatings / totalReviewsLength).toFixed(1) : 0;

  const incrementCount = () => {
    setCount(count + 1);
  };
  const decrementCount = () => {
    setCount(count - 1);
  };
  const handleMessageSubmit = () => {
    navigate("/inbox?conversation=afsaojfnauiwefnasfk");
  };
  return (
    <div className="bg-white">
      {data ? (
        <div className={`${styles.section} w-[80%] 800px:w-[80%] min-h-screen`}>
          <div className="w-full py-5">
            {/* Updated flex layout with custom widths and gap */}
            <div
              className="w-full flex flex-col 800px:flex-row justify-between"
              style={{ gap: "6%" }}
            >
              {/* LEFT: Product Images (47%) */}
              <div className="w-full md:w-[47%]">
                <img
                  src={`${backend_url}/uploads/${data && data.images[select]}`}
                  alt={data?.name}
                  className="w-full max-h-[500px] object-contain mb-4"
                />
                <div className="w-full flex gap-3">
                  {data &&
                    data.images.map((i, index) => (
                      <div
                        key={index}
                        className={`${
                          select === index ? "border-2 border-red-500" : ""
                        } cursor-pointer`}
                        onClick={() => setSelect(index)}
                      >
                        <img
                          src={`${backend_url}/uploads/${i}`}
                          alt=""
                          className="h-[100px] object-contain"
                        />
                      </div>
                    ))}
                </div>
              </div>

              {/* RIGHT: Name, Description (47%) */}
              <div className="w-full 800px:w-[47%] pt-5">
                <h1 className={`${styles.productTitle} mb-3`}>{data.name}</h1>
                <p className="mb-3">{data.description}</p>
                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    ${data.discountPrice}
                  </h4>
                  <h3 className={`${styles.price}`}>
                    {data.originalPrice ? data.originalPrice + "$" : null}
                  </h3>
                </div>

                <div className="flex items-center mt-12 justify-between pr-3">
                  {/* Quantity Buttons */}
                  <div>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={decrementCount}
                    >
                      -
                    </button>
                    <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                      {count}
                    </span>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-r px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={incrementCount}
                    >
                      +
                    </button>
                  </div>

                  {/* Wishlist Button */}
                  <div>
                    {click ? (
                      <AiFillHeart
                        size={22}
                        className="cursor-pointer"
                        onClick={() => removeFromWishListHandler(data)}
                        color="red"
                        title="Remove from wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={22}
                        className="cursor-pointer"
                        onClick={() => addToWishListHandler(data)}
                        color="#333"
                        title="Add to wishlist"
                      />
                    )}
                  </div>
                </div>
              </div>
              <div
                className={`${styles.button} mt-6 rounded h-11 flex items-center`}
                onClick={() => AddToCartHandler(data._id)}
              >
                <span className="text-white flex items-center">
                  Add to cart <AiOutlineShoppingCart />
                </span>
              </div>

              <div className="flex items-center pt-8">
                <Link to={`/shop/preview/${data.shop?._id}`}>
                  <img
                    src={`${backend_url}/${data.shop.avatar}`}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full mr-2"
                  />
                  <div className="pr-8">
                    <h3 className={`${styles.shop_name} pb-1 pt-1`}>
                      {data.shop.name}
                    </h3>
                    <h5 className="pb-3 text-[15px]">
                      ({averageRating}/5) Ratings
                    </h5>
                  </div>
                </Link>
                <div
                  className={`${styles.button} bg-[#6443d1] mt-4 rounded h-11`}
                  onClick={handleMessageSubmit}
                >
                  <span className="text-white flex items-center">
                    Send Message <AiOutlineMessage className="ml-1" />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <ProductDetailsInfo
            data={data}
            allProducts={allProducts}
            totalReviewsLength={totalReviewsLength}
            averageRating={averageRating}
          />
          <br />
          <br />
        </div>
      ) : null}
    </div>
  );
}

const ProductDetailsInfo = ({
  data,
  allProducts,
  totalReviewsLength,
  averageRating,
}) => {
  const [active, setActive] = useState(1);
  return (
    <div className="bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded ">
      <div className="w-full flex justify-between border-b pt-10 pb-2">
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(1)}
          >
            Product Details
          </h5>
          {active === 1 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>

        {/* 2nd one */}

        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(2)}
          >
            Product Reviews
          </h5>
          {active === 2 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>

        {/* 3rd one */}

        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(3)}
          >
            Seller Information
          </h5>
          {active === 3 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
      </div>
      {active === 1 ? (
        <>
          <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
            {data.description}
          </p>
        </>
      ) : null}
      {active === 2 ? (
        <div className="w-full min-h-[40vh] flex flex-col items-center py-3 overflow-y-scroll">
          {data && data.reviews && data.reviews.length > 0 ? (
            data.reviews.map((item, index) => (
              <div className="w-full flex my-2" key={index}>
                <img
                  src={`${backend_url}/uploads/${item.user.avatar}`}
                  alt=""
                  className="w-[50px] h-[50px] rounded-full"
                />
                <div className="pl-2 ">
                  <div className="w-full flex items-center">
                    <h1 className="font-[500] mr-3">{item.user?.name}</h1>
                    <Ratings rating={data?.ratings} />
                  </div>
                  <p>{item.comment}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No reviews available</p>
          )}
        </div>
      ) : null}
      {active === 3 && (
        <div className="w-full block 800px:flex p-5">
          <div className="w-full 800px:w-[50%]">
            <Link to={`/shop/preview/${data.shop._id}`}>
              <div className="flex items-center">
                <img
                  src={`${backend_url}/${data.shop.avatar}`}
                  className="w-[50px] h-[50px] rounded-full"
                  alt=""
                />
                <div className="pl-3">
                  <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                  <h5 className="pb-2 text-[15px]">
                    ({averageRating}/5)Ratings
                  </h5>
                </div>
              </div>
            </Link>

            <p className="pt-2">{data.shop.description}</p>
          </div>

          <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex:col items-end">
            <div className="text-left">
              <h5 className="font-[600]">
                Joined on:{" "}
                <span className="font-[500]">
                  {data.shop?.createdAt?.slice(0, 10)}
                </span>
              </h5>

              <h5 className="font-[600] pt-3">
                Total Products:{" "}
                <span className="font-[500]">
                  {allProducts && allProducts.length}
                </span>
              </h5>

              <h5 className="font-[600]">
                Total Reviews:{" "}
                <span className="font-[500]">{totalReviewsLength}</span>
              </h5>

              <Link to="/">
                <div
                  className={`${styles.button} !rounded-[4px] !h-[39.5px] mt-3`}
                >
                  <h4 className="text-white">Visit Shop</h4>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ProductDetails;
