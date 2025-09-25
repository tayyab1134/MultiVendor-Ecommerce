import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSidebar from "../../components/Shop/Layout/DashboardSidebar";
import WithdrawMoney from "../../components/Shop/WithDrawMoney";
const ShopWithDrawMoneyPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="800px:w-[330px] w-[80px]">
          <DashboardSidebar active={7} />
        </div>
        <WithdrawMoney />
      </div>
    </div>
  );
};

export default ShopWithDrawMoneyPage;
