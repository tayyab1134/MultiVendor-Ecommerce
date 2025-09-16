import React from "react";
import DashboardSidebar from "../../components/Shop/Layout/DashboardSidebar";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import AllCoupons from "../../components/Shop/AllCoupons";
function ShopAllCoupouns() {
  return (
    <div>
      <DashboardHeader />
      <div className="flex  justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSidebar active={9} />
        </div>
        <div className="w-full justify-center flex">
          <AllCoupons />
        </div>
      </div>
    </div>
  );
}

export default ShopAllCoupouns;
