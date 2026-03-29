import axios from "axios";
import React, { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { TbReceipt2 } from "react-icons/tb";
import { FaPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";

function Nav() {
  const { userData, city } = useSelector((state) => state.user);
  const { myShopData } = useSelector((state) => state.owner);
  const [showInfo, setShowInfo] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/signout`, { withCredentials: true });
      dispatch(setUserData(null));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full h-[80px] flex items-center justify-between gap-[20px] px-[20px] fixed top-0 z-[9999] bg-[#fff9f6] overflow-visible">
      <h1 className="text-3xl font-bold text-[#ff4d2d]">Food_delivery</h1>

      <div className="flex items-center gap-4">
        <button
          type="button"
          className="md:hidden text-[#ff4d2d] cursor-pointer"
          onClick={() => setShowSearch((prev) => !prev)}
        >
          {showSearch ? <RxCross2 size={25} /> : <IoIosSearch size={25} />}
        </button>

        {userData?.role === "owner" && myShopData && (
          <>
            <button
              type="button"
              className="hidden md:flex items-center gap-1 p-2 cursor-pointer rounded-full bg-[#ff4d2d]/10 text-[#ff4d2d]"
            >
              <FaPlus size={16} />
              <span>Add Food Item</span>
            </button>

            <button
              type="button"
              className="md:hidden flex items-center p-2 cursor-pointer rounded-full bg-[#ff4d2d]/10 text-[#ff4d2d]"
            >
              <FaPlus size={16} />
            </button>
          </>
        )}

        <button
          type="button"
          className="hidden md:block px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] text-sm font-medium cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <TbReceipt2 size={18} />
            <span>My Orders</span>
          </span>
        </button>

        <div className="relative cursor-pointer">
          <FiShoppingCart size={25} className="text-[#ff4d2d]" />
          <span className="absolute right-[-9px] top-[-12px] text-[#ff4d2d]">0</span>
        </div>

        <button
          type="button"
          className="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-[#ff4d2d] text-white text-[18px] shadow-xl font-semibold cursor-pointer"
          onClick={() => setShowInfo((prev) => !prev)}
        >
          {userData?.fullName?.slice(0, 1) || "U"}
        </button>
      </div>

      {showSearch && (
        <div className="w-[90%] h-[70px] bg-white shadow-xl rounded-lg items-center gap-[20px] flex fixed top-[80px] left-[5%] px-[10px]">
          <div className="hidden md:flex items-center w-[30%] overflow-hidden gap-[10px] px-[10px] border-r-[2px] border-gray-400">
            <FaLocationDot size={25} className="text-[#ff4d2d]" />
            <div className="w-[80%] truncate text-gray-600">{city || "Your city"}</div>
          </div>
          <div className="w-full flex items-center gap-[10px]">
            <IoIosSearch size={25} className="text-[#ff4d2d]" />
            <input
              type="text"
              placeholder="search delicious food..."
              className="px-[10px] text-gray-700 outline-0 w-full"
            />
          </div>
        </div>
      )}

      {showInfo && (
        <div className="fixed top-[80px] right-[10px] md:right-[10%] lg:right-[25%] w-[180px] bg-white shadow-2xl rounded-xl p-[20px] flex flex-col gap-[10px] z-[9999]">
          <div className="text-[17px] font-semibold">{userData?.fullName || "User"}</div>
          <div className="text-sm text-gray-500">{city || "Location unavailable"}</div>
          <button
            type="button"
            className="text-left text-[#ff4d2d] font-semibold cursor-pointer"
            onClick={handleLogOut}
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
}

export default Nav;
