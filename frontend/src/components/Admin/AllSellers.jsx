import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { getAllSellers } from "../../redux/actions/seller";
import { Link } from "react-router-dom";
const AllSellers = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { sellers } = useSelector((state) => state.seller);
  const [userId, setUserId] = useState("");
  useEffect(() => {
    dispatch(getAllSellers());
  }, [dispatch]);

  const handleDelete = async (id) => {
    await axios
      .delete(`${server}/shop/admin-delete-seller/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        dispatch(getAllSellers());
      })
      .catch((error) => {
        toast.error(error.response?.data.message);
      });
  };

  const columns = [
    { field: "id", headerName: "Seller ID", flex: 0.7 },

    {
      field: "name",
      headerName: "Name",
      flex: 0.7,
    },
    {
      field: "email",
      headerName: "Email",
      type: "email",
      flex: 0.7,
    },
    {
      field: "address",
      headerName: "Seller Address",
      type: "address",
      flex: 0.7,
    },

    {
      field: "joinedAt",
      headerName: "joinedAt",
      type: "text",
      flex: 0.8,
    },
    {
      field: " ",
      flex: 1,
      headerName: "Preview Shop",
      type: "text",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/shop/preview/${params.id}`}>
              <Button onClick={() => setUserId(params.id) || setOpen(true)}>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
    {
      field: "  ",
      flex: 1,
      headerName: "Delete Seller",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => setUserId(params.id) || setOpen(true)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];
  const row = [];
  sellers &&
    sellers.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        email: item.email,
        joinedAt: item.createdAt.slice(0, 10),
        address: item.address,
      });
    });
  return (
    <div className="w-full flex justify-center pt-5">
      <div className="w-[97%]">
        <h5 className="text-[22px] pb-2 font-Poppins">All Seller</h5>
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={4}
          disableSelectionOnClick
          autoHeight
        />
      </div>
      {open && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40">
          <div className="w-[90%] max-w-md bg-white rounded-2xl shadow-2xl p-6 transform transition-all duration-300 scale-100">
            {/* Close button */}
            <div className="flex justify-end">
              <button
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <RxCross1 size={22} />
              </button>
            </div>

            {/* Title */}
            <h3 className="text-xl md:text-2xl font-Poppins font-semibold text-gray-800 text-center py-4">
              Are you sure you want to delete this user?
            </h3>

            {/* Buttons */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={() => setOpen(false)}
                className="px-6 py-2 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(userId)}
                className="px-6 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default AllSellers;
