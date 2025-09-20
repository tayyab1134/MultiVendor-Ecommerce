import React from "react";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Route/Footer";
import UserOrderDetails from "../../components/UserOrderDetails";
const OrderDetailPage = () => {
  return (
    <div>
      <Header />
      <UserOrderDetails />
      <Footer />
    </div>
  );
};

export default OrderDetailPage;
