import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import { AiOutlineSearch } from "react-icons/ai";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import DropDown from "./DropDown";
import Navbar from "./Navbar";
import Cart from "../cart/Cart";
import Wishlist from "../Wishlist/Wishlist";
import { useSelector } from "react-redux";
import { CgProfile } from "react-icons/cg";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";

function Header({ activeHeading }) {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { isSeller } = useSelector((state) => state.seller);
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const allProducts = useSelector((state) => state.products.allProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 800);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (!term) {
      setSearchData([]);
      return;
    }
    const filteredProducts = allProducts.filter((product) =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );
    setSearchData(filteredProducts);
  };

  useEffect(() => {
    const handleScroll = () => setActive(window.scrollY > 70);
    const handleResize = () => setIsMobile(window.innerWidth < 800);

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // ✅ close search dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !e.target.closest(".search-dropdown") &&
        !e.target.closest("input[type='text']") &&
        !e.target.closest("input[type='search']")
      ) {
        setSearchData([]);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      {/* ✅ Desktop Header */}
      {!isMobile && (
        <>
          {/* Fixed Header */}
          <div className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
            <div className="max-w-[1200px] mx-auto h-[70px] flex items-center justify-between px-4">
              <Link to="/">
                <img
                  src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                  alt="Logo"
                  className="h-10"
                />
              </Link>

              {/* Search Bar */}
              <div className="w-[50%] md:w-[60%] sm:w-[70%] hidden sm:block relative">
                <input
                  type="text"
                  placeholder="Search Product..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="h-[40px] w-full px-4 border-2 border-cyan-400 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
                <AiOutlineSearch
                  size={25}
                  className="absolute right-2 top-2 cursor-pointer text-black"
                />
                {searchData.length > 0 && searchTerm && (
                  <div className="absolute w-full bg-white rounded-md shadow-md mt-2 z-50 max-h-[200px] overflow-y-auto search-dropdown">
                    {searchData.map((item) => (
                      <Link
                        to={`/product/${item._id}`}
                        key={item._id}
                        className="flex items-center gap-2 p-2 hover:bg-gray-100"
                      >
                        <img
                          src={
                            item?.images[0]
                              ? `${item.images[0]}`
                              : "/placeholder.png"
                          }
                          alt={item.name}
                          className="w-8 h-8 rounded object-cover"
                        />
                        <span>{item.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Become Seller */}
              <div className="hidden md:block bg-cyan-400 px-4 py-2 rounded-md">
                <Link to={`${isSeller ? "/dashboard" : "/shop-create"}`}>
                  <span className="text-white flex items-center">
                    {isSeller ? "DASHBOARD" : "CREATE SHOP"}
                    <IoIosArrowForward className="ml-1" />
                  </span>
                </Link>
              </div>
            </div>
          </div>

          <div className="h-[70px]" />

          {/* Second Header Section */}
          <div
            className={`transition-all duration-300 border ${
              active ? "shadow-sm fixed top-[70px] left-0 right-0 z-40" : ""
            } w-full border-green-800 bg-cyan-500 800px:hidden`}
          >
            <div className="max-w-[1200px] mx-auto flex justify-between items-center px-4 h-[60px]">
              <div className="relative w-[270px] h-[50px] bg-white shadow-sm rounded-md hidden md:flex items-center px-3">
                <BiMenuAltLeft size={25} className="text-gray-600" />
                <button
                  className="h-full w-full flex justify-between items-center pl-9 bg-white font-sans text-[15px] font-[500] select-none"
                  onClick={() => setDropDown(!dropDown)}
                >
                  All Categories
                  <IoIosArrowDown className="ml-2" />
                </button>
                {dropDown && <DropDown setDropDown={setDropDown} />}
              </div>

              <div className={`${styles.normalFlex}`}>
                <Navbar active={activeHeading} />
              </div>

              <div className="flex">
                {/* WishList*/}
                <div className={`${styles.normalFlex}`}>
                  <div
                    className="relative cursor-pointer mr-[15px]"
                    onClick={() => setOpenWishlist(true)}
                  >
                    <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%)" />
                    <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 text-white text-[12px] leading-tight text-center">
                      {wishlist && wishlist.length}
                    </span>
                  </div>
                </div>
                {/* Cart  */}
                <div className={`${styles.normalFlex}`}>
                  <div
                    className="relative cursor-pointer mr-[15px]"
                    onClick={() => setOpenCart(true)}
                  >
                    <AiOutlineShoppingCart
                      size={30}
                      color="rgb(255 255 255 / 83%)"
                    />
                    <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 text-white text-[12px] leading-tight text-center">
                      {cart && cart.length}
                    </span>
                  </div>
                </div>

                <div className={styles.noramlFlex}>
                  <div className="relative cursor-pointer mr-[15px]">
                    {isAuthenticated ? (
                      <Link to="/profile">
                        <img
                          className="rounded-full w-[35px] h-[35px]"
                          src={
                            user?.avatar
                              ? `${user.avatar
                                  .replace(/\\/g, "/")
                                  .replace(/^uploads\//, "")}`
                              : "/placeholder.png"
                          }
                          alt="Profile"
                        />
                      </Link>
                    ) : (
                      <Link to="/login">
                        <CgProfile color="rgb(255 255 255 /83%)" size={30} />
                      </Link>
                    )}
                  </div>
                </div>
                {openCart && <Cart setOpenCart={setOpenCart} />}
                {openWishlist && <Wishlist setOpenWishlist={setOpenWishlist} />}
              </div>
            </div>
          </div>
        </>
      )}

      {/* ✅ Mobile Header */}
      {isMobile && (
        <div
          className={`${
            active ? "shadow-sm top-[70px] left-0 right-0 z-40" : ""
          } w-full h-[60px] bg-[#fff] z-50 800px:hidden`}
        >
          <div className="w-full flex items-center justify-between">
            <div>
              <BiMenuAltLeft
                size={40}
                className="ml-4"
                onClick={() => setOpen(true)}
              />
            </div>

            <div>
              <Link to="/">
                <img
                  src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                  alt="Logo"
                  className="mt-3 cursor-pointer"
                />
              </Link>
            </div>

            <div className="relative mr-[20px]">
              <AiOutlineShoppingCart size={30} />
              <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 text-white text-[12px] leading-tight text-center">
                {cart && cart.length}
              </span>
            </div>
          </div>

          {/* Header Sidebar */}
          {open && (
            <div className="fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0">
              <div className="fixed w-[60%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll">
                <div className="w-full justify-between flex pr-3">
                  <div className="relative mt-5 ml-3">
                    <AiOutlineHeart size={30} className="mt-5 ml-3" />
                    <span className="absolute right-0 top-5 rounded-full bg-[#3bc177] w-4 h-4 text-white text-[12px] leading-tight text-center">
                      {wishlist && wishlist.length}
                    </span>
                  </div>
                  <RxCross1
                    size={30}
                    className="ml-4 mt-5"
                    onClick={() => setOpen(false)}
                  />
                </div>

                {/* Mobile Search Bar */}
                <div className="my-8 w-[92%] m-auto h-[40px] relative">
                  <input
                    type="search"
                    placeholder="Search Product..."
                    className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  {searchData.length > 0 && searchTerm && (
                    <div className="absolute bg-[#fff] z-10 shadow w-full left-0 p-3 search-dropdown">
                      {searchData.map((item) => (
                        <Link to={`/product/${item._id}`} key={item._id}>
                          <div className="flex items-center gap-2 p-2 hover:bg-gray-100">
                            <img
                              src={
                                item?.images?.[0]
                                  ? `${item.images[0]}`
                                  : "/placeholder.png"
                              }
                              alt={item.name}
                              className="w-[50px] h-[50px] rounded object-cover"
                            />
                            <h5>{item.name}</h5>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
                {/* Navbar */}
                <Navbar active={activeHeading} />
                <div
                  className={`${styles.button} ml-4 bg-cyan-400 !rounded-[4px]`}
                >
                  <Link to={`${isSeller ? "/dashboard" : "/shop-create"}`}>
                    <span className="text-white flex items-center">
                      {isSeller ? "DASHBOARD" : "CREATE SHOP"}
                      <IoIosArrowForward className="ml-1" />
                    </span>
                  </Link>
                </div>

                <br />
                <br />
                <br />

                <div className="flex w-full justify-center mt-[-45px]">
                  {isAuthenticated && user ? (
                    <div>
                      <Link to="/profile">
                        <img
                          src={
                            user?.avatar
                              ? `${user.avatar
                                  .replace(/\\/g, "/")
                                  .replace(/^uploads\//, "")}`
                              : "/placeholder.png"
                          }
                          alt="Profile"
                          className="w-[60px] h-[60px] rounded-full border-[3px] border-green-600"
                        />
                      </Link>
                    </div>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="text-[18px] pr-[10px] text-[#000000b7]"
                      >
                        Login /
                      </Link>
                      <Link
                        to="/sign-up"
                        className="text-[18px] text-[#000000b7]"
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
export default Header;
