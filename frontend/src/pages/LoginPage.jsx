import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Login from "../components/Login";
import { Navigate, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated === true) {
      navigate("/");
    }
  }, []);
  return (
    <div>
      <Login />
    </div>
  );
};

export default LoginPage;
