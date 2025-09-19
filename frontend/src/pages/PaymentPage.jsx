import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Route/Footer";
import CheckoutSteps from "../components/CheckOut/CheckoutSteps";
import Payment from "../components/Payment/Payment";

const PaymentPage = () => {
  return (
    <div className="w-full min-h-screen bg-[#f6f9fc]">
      <Header />
      <br />
      <br />
      <CheckoutSteps active={2} />
      <Payment />
      <br />
      <br />
      <Footer />
    </div>
  );
};

export default PaymentPage;
