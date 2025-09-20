import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSidebar from "../../components/Shop/Layout/DashboardSidebar";
import AllOrders from "../../components/Shop/AllOrders";

const ShopAllOrders = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className="800px:w-[330px] w-[80px]">
          <DashboardSidebar active={2} />
        </div>
        <div className="w-full flex justify-center">
          <AllOrders />
        </div>
      </div>
    </div>
  );
};

export default ShopAllOrders;
