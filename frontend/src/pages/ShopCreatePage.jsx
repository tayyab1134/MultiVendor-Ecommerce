import { useNavigate } from "react-router-dom";
import ShopCreate from "../components/Shop/ShopCreate";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const ShopCreatePage = () => {
  const { isSeller, seller } = useSelector((state) => state.seller);
  const navigate = useNavigate();
  useEffect(() => {
    if (isSeller && seller) {
      navigate(`/shop/${seller._id}`);
    }
  }, []);
  
  return (
    <div>
      <ShopCreate />
    </div>
  );
};

export default ShopCreatePage;
