import React from "react";
import AdminHeader from "../components/Layout/AdminHeader";
import AdminSidebar from "../components/Admin/Layout/AdminSidebar";
import AllProducts from "../components/Admin/AllProducts.jsx";
const AdminDashboardProductsPage = () => {
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="800px:w-[330px] w-[80px]">
          <AdminSidebar active={5} />
        </div>
        <AllProducts />
      </div>
    </div>
  );
};

export default AdminDashboardProductsPage;
