import React from "react";
import { AiOutlineLogin, AiOutlineMessage } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import { RxPerson } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { TbAddressBook } from "react-icons/tb";
import { MdOutlineTrackChanges } from "react-icons/md";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
function ProfileSidebar({ active, setActive }) {
  // const [active,setActive] = useState(1);
  const navigate = useNavigate();
  const logoutHandler = () => {
    axios
      .get(`${server}/user/logout`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        window.location.reload(true);

        navigate("/login");
      })
      .catch(
        (error) => {
          toast.error(error.response.data.message);
        },
        { withCredentials: true }
      );
  };
  return (
    <div className="w-56 md:w-64 bg-white shadow-[0_4px_6px_rgba(0,0,0,0.3)] rounded-[10px] p-4 pt-8 min-h-full">
      <div
        className=" flex items-center cursor-pointer w-full mb-6"
        onClick={() => setActive(1)}
      >
        <RxPerson size={20} color={active === 1 ? "red" : ""} />
        <span
          className={`pl-3 ${active === 1 ? "text-[red]" : ""}800px:block `}
        >
          Profile
        </span>
      </div>

      {/* orders */}
      <div
        className="flex items-center cursor-pointer w-full mb-6"
        onClick={() => setActive(2)}
      >
        <HiOutlineShoppingBag size={20} color={active === 2 ? "red" : ""} />
        <span className={`pl-3 ${active === 2 ? "text-[red]" : ""}800px:block`}>
          Orders
        </span>
      </div>

      {/* refunds */}
      <div
        className="flex items-center cursor-pointer w-full mb-6"
        onClick={() => setActive(3)}
      >
        <HiOutlineReceiptRefund size={20} color={active === 3 ? "red" : ""} />
        <span
          className={`pl-3 ${active === 3 ? "text-[red]" : ""}800px:block `}
        >
          Refunds
        </span>
      </div>

      {/* inbox */}
      <div
        className="flex items-center cursor-pointer w-full mb-6"
        onClick={() => setActive(4) || navigate("/inbox")}
      >
        <AiOutlineMessage size={20} color={active === 4 ? "red" : ""} />
        <span className={`pl-3 ${active === 4 ? "text-[red]" : ""}800px:block`}>
          Inbox
        </span>
      </div>

      {/* Track order*/}

      <div
        className="flex items-center cursor-pointer w-full mb-6"
        onClick={() => setActive(5)}
      >
        <MdOutlineTrackChanges size={20} color={active === 5 ? "red" : ""} />
        <span className={`pl-3 ${active === 5 ? "text-[red]" : ""}800px:block`}>
          Track order
        </span>
      </div>

      {/* Password change*/}
      <div
        className="flex items-center cursor-pointer w-full mb-6"
        onClick={() => setActive(6)}
      >
        <RiLockPasswordLine size={20} color={active === 6 ? "red" : ""} />
        <span className={`pl-3 ${active === 6 ? "text-[red]" : ""}800px:block`}>
          Password Change
        </span>
      </div>

      {/* Address*/}
      <div
        className="flex items-center cursor-pointer w-full mb-6"
        onClick={() => setActive(7)}
      >
        <TbAddressBook size={20} color={active === 7 ? "red" : ""} />
        <span className={`pl-3 ${active === 7 ? "text-[red]" : ""}800px:block`}>
          Address
        </span>
      </div>

      {/* Logout */}
      <div
        className="flex items-center cursor-pointer w-full mb-6"
        onClick={() => setActive(8) || logoutHandler()}
      >
        <AiOutlineLogin size={20} color={active === 8 ? "red" : ""} />
        <span className={`pl-3 ${active === 8 ? "text-[red]" : ""}800px:block`}>
          Log out
        </span>
      </div>
    </div>
  );
}

export default ProfileSidebar;
