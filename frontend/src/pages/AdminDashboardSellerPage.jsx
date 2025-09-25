import React from "react";
import AdminHeader from "../components/Layout/AdminHeader";
import AdminSidebar from "../components/Admin/Layout/AdminSidebar";
import AllSellers from "../components/Admin/AllSellers";

const AdminDashboardSellerPage = () => {
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="800px:w-[330px] w-[80px]">
          <AdminSidebar active={3} />
        </div>
        <AllSellers />
      </div>
    </div>
  );
};

export default AdminDashboardSellerPage;
