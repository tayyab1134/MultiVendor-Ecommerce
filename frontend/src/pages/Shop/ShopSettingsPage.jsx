import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import ShopSettings from "../../components/Shop/ShopSettings";
import DashboardSidebar from "../../components/Shop/Layout/DashboardSidebar";

const ShopSettingsPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="800px:w-[330px] w-[80px]">
          <DashboardSidebar active={11} />
        </div>
        <ShopSettings />
      </div>
    </div>
  );
};

export default ShopSettingsPage;
