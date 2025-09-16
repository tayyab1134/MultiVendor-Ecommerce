import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { deleteProduct, getAllProductsShop } from "../../redux/actions/product";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import Loader from "../Layout/Loader";
import { DataGrid } from "@mui/x-data-grid";
import styles from "../../styles/styles";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

function AllCoupouns() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [coupouns, setCoupouns] = useState([]);
  const [isLoading, setIsLoading] = useState("");
  const [value, setValue] = useState("");
  const [minAmount, setMinAmount] = useState(null);
  const [maxAmount, setMaxAmount] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState("");
  //const { products, isLoading } = useSelector((state) => state.products);
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    setIsLoading(true);

    axios
      .get(`${server}/coupon/get-coupon/${seller._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setIsLoading(false);
        console.log(res.data); // should show couponCodes
        setCoupouns(res.data.couponCodes || []); // ✅ FIXED
      })
      .catch(() => {
        setIsLoading(false);
        setCoupouns([]);
      });
  }, [dispatch, seller]);

  const handleDelete = async (id) => {
    axios
      .delete(`${server}/coupon/delete-coupon/${id}`, { withCredentials: true })
      .then((res) => {
        toast.success("Coupon code deleted succesfully!");
      });
    window.location.reload();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${server}/coupon/create-coupon-code`,
        {
          name,
          minAmount,
          maxAmount,
          selectedProducts: selectedProducts ? [selectedProducts] : [], // ✅ always array
          value,
          shop: seller._id,
        },
        { withCredentials: true }
      );

      toast.success("Coupon created successfully ✅");
      setOpen(false);
      // ✅ Clear all fields after success
      window.location.reload();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong ❌");
    }
  };

  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
    { field: "name", headerName: "Name", minWidth: 180, flex: 1.4 },
    { field: "price", headerName: "Price", minWidth: 180, flex: 0.6 },

    {
      field: "delete",
      headerName: "Delete",
      flex: 0.8,
      minWidth: 120,
      sortable: false,
      renderCell: (params) => (
        <Button onClick={() => handleDelete(params.id)}>
          <AiOutlineDelete size={20} />
        </Button>
      ),
    },
  ];

  const rows = coupouns
    ? coupouns.map((item) => ({
        id: item._id,
        name: item.name,
        price: item.value + " %",
        sold: 10,
      }))
    : [];

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full ml-45 mr-5 pt-1 mt-5 bg-white">
          <div className="w-full flex justify-end">
            <div
              onClick={() => setOpen(true)}
              className={`${styles.button} !w-max !h-[45px] px-3 !rouned-[5px] mr-3 mb-3`}
            >
              <span className="text-white">Create Coupon Code</span>
            </div>
          </div>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />

          {open && (
            <div className="fixed top-0 left-0 w-full h-screen bg-[#00000062] z-[20000] flex items-center justify-center p-2">
              <div className="w-full max-w-[600px] h-[80vh] bg-white rounded-md shadow relative flex flex-col">
                {/* Close Button */}
                <div className="w-full flex justify-end p-3">
                  <RxCross1
                    size={30}
                    className="cursor-pointer"
                    onClick={() => setOpen(false)}
                  />
                </div>

                {/* Title */}
                <h5 className="text-[24px] font-Poppins text-center mb-3">
                  Create Coupon Code
                </h5>

                {/* Scrollable Form */}
                <form
                  onSubmit={handleSubmit}
                  className="px-5 pb-5 overflow-y-auto flex-1"
                >
                  {/* Coupon Name */}
                  <div>
                    <label className="pb-2 block">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={name}
                      className="mt-2 block w-full px-3 h-[40px] border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-sm"
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter Your Coupon Code Name..."
                    />
                  </div>

                  {/* Coupon Discount */}
                  <div className="mt-4">
                    <label className="pb-2 block">
                      Discount Percentage{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="discount"
                      required
                      value={value}
                      className="mt-2 block w-full px-3 h-[40px] border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-sm"
                      onChange={(e) => setValue(e.target.value)}
                      placeholder="Enter Coupon Discount..."
                    />
                  </div>

                  {/* Min Amount */}
                  <div className="mt-4">
                    <label className="pb-2 block">Min Amount</label>
                    <input
                      type="number"
                      name="minAmount"
                      value={minAmount || ""}
                      className="mt-2 block w-full px-3 h-[40px] border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-sm"
                      onChange={(e) => setMinAmount(e.target.value)}
                      placeholder="Enter Minimum Amount..."
                    />
                  </div>

                  {/* Max Amount */}
                  <div className="mt-4">
                    <label className="pb-2 block">Max Amount</label>
                    <input
                      type="number"
                      name="maxAmount"
                      value={maxAmount || ""}
                      className="mt-2 block w-full px-3 h-[40px] border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-sm"
                      onChange={(e) => setMaxAmount(e.target.value)}
                      placeholder="Enter Maximum Amount..."
                    />
                  </div>

                  {/* Selected Products */}
                  <div className="mt-4">
                    <label className="pb-2 block">Selected Products</label>
                    <select
                      className="w-full mt-2 border h-[40px] rounded-md text-sm"
                      value={selectedProducts}
                      onChange={(e) => setSelectedProducts(e.target.value)}
                    >
                      <option value="">Choose a product</option>
                      {products &&
                        products.map((i) => (
                          <option value={i.name} key={i._id}>
                            {i.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  {/* Submit Button */}
                  <div className="mt-6">
                    <input
                      type="submit"
                      value="Create"
                      className="mt-2 bg-gray-500 text-white block w-full sm:w-[70%] px-3 h-[50px] border cursor-pointer  border-gray-300 rounded-[3px] mx-auto"
                    />
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default AllCoupouns;
