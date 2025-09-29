import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Signup from "../components/SignUp";
import { Navigate, useNavigate } from "react-router-dom";

const SignUppage = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated === true) {
      navigate("/");
    }
  }, []);
  return (
    <div>
      <Signup />
    </div>
  );
};

export default SignUppage;
