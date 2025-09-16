import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../components/Layout/Loader";

const SellerProtectedRoute = ({ children }) => {
  const { isLoading, isSeller } = useSelector((state) => state.seller);

  // While loading, show spinner or placeholder
  if (isLoading === true) {
    return <Loader />; // you can use a spinner here
  } else {
    if (!isSeller) {
      return <Navigate to="/shop-login" replace />; //shop-login
    }

    return children;
  }
};

export default SellerProtectedRoute;
