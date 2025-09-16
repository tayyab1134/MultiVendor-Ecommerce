import { useEffect } from "react";
import ShopLogin from "../components/Shop/ShopLogin";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function ShopLoginPage() {
  const { isSeller, isloading } = useSelector((state) => state.seller);
  console.log(isSeller);
  const navigate = useNavigate();
  useEffect(() => {
    if (isSeller === true) {
      navigate(`/dashboard`);
    }
  }, [isSeller, isloading]);

  return (
    <div>
      <ShopLogin />
    </div>
  );
}

export default ShopLoginPage;
