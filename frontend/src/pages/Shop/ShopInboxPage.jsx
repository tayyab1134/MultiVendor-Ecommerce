import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSidebar from "../../components/Shop/Layout/DashboardSidebar.jsx";
import DashBoardMessages from "../../components/Shop/DashBoardMessages.jsx";
const ShopInboxPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="800px:w-[330px] w-[80px]">
          <DashboardSidebar active={8} />
        </div>
        <DashBoardMessages />
      </div>
    </div>
  );
};

export default ShopInboxPage;
