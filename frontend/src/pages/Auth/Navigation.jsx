import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineShoppingCart,
  AiOutlineLogin,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./Navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/userApiSlice";
import { logOut } from "../../redux/features/auth/authSlice";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [dropdown, setDropdown] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleDropdown = () => setDropdown(!dropdown);
  const toggleSidebar = () => setShowSidebar(!showSidebar);
  const closeSidebar = () => setShowSidebar(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logOut());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div
      style={{ zIndex: 9999 }}
      className={`${
        showSidebar ? "hidden" : "flex"
      } xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-black h-[100vh] fixed transition-all duration-300`}
      id="navigation-container"
    >
      <div className="flex flex-col justify-center space-y-4">
        <Link
          to="/"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineHome className="mr-2" size={26} />
          <span className="nav-item-name ml-2">HOME</span>
        </Link>
        <Link
          to="/shop"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineShopping className="mr-2" size={26} />
          <span className="nav-item-name ml-2">SHOP</span>
        </Link>
        <Link
          to="/cart"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineShoppingCart className="mr-2" size={26} />
          <span className="nav-item-name ml-2">CART</span>
        </Link>
        <Link
          to="/favorite"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <FaHeart className="mr-2" size={20} />
          <span className="nav-item-name ml-2">FAVORITES</span>
        </Link>
      </div>
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          {userInfo && (
            <span className="text-white ml-2">{userInfo.username}</span>
          )}
        </button>
      </div>
      <ul>
        <li>
          <Link
            to="/login"
            className="flex items-center transition-transform transform hover:translate-x-2"
          >
            <AiOutlineLogin className="mr-2" size={26} />
            <span className="nav-item-name ml-2">LOGIN</span>
          </Link>
        </li>
        <li>
          <Link
            to="/register"
            className="flex items-center transition-transform transform hover:translate-x-2"
          >
            <AiOutlineUserAdd size={26} />
            <span className="nav-item-name ml-2">REGISTER</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
