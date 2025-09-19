import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Route/Footer";
import Lottie from "react-lottie";
import animationData from "../assets/Animation/payment-success.json";

const OrderSuccessPage = () => {
  return (
    <div>
      <Header />
      <Success />
      <Footer />
    </div>
  );
};
const Success = () => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div>
      <Lottie options={defaultOptions} width={300} height={300} />
      <h5 className="text-center mb-14 text-[25px] text-[#000000a1]">
        Now the Order is Successfull 😍
      </h5>
      <br />
      <br />
    </div>
  );
};

export default OrderSuccessPage;
