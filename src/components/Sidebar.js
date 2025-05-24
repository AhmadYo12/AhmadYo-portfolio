// components/Sidebar.js
import React, { useState } from "react";
import {
  FaHome,
  FaClipboardList,
  FaShoppingBasket,
  FaChartLine,
  FaCog,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import "../styles/Sidebar.css";
import logo from "../assets/logo.png";

const Sidebar = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode", !darkMode);
  };

  return (
    <div className={`sidebar ${darkMode ? "dark" : ""}`}>
      <div className="sidebar-header">
        <img src={logo} alt="Dento Logo" className="logo" />
        <p className="title-dash">لوحة التحكم</p>
        <i class="fa-regular fa-square-caret-left "></i>
      </div>

      <ul className="sidebar-menu">
        <li>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="20"
            height="20"
            viewBox="0 0 50 50"
          >
            <path d="M 24.962891 1.0546875 A 1.0001 1.0001 0 0 0 24.384766 1.2636719 L 1.3847656 19.210938 A 1.0005659 1.0005659 0 0 0 2.6152344 20.789062 L 4 19.708984 L 4 46 A 1.0001 1.0001 0 0 0 5 47 L 18.832031 47 A 1.0001 1.0001 0 0 0 19.158203 47 L 30.832031 47 A 1.0001 1.0001 0 0 0 31.158203 47 L 45 47 A 1.0001 1.0001 0 0 0 46 46 L 46 19.708984 L 47.384766 20.789062 A 1.0005657 1.0005657 0 1 0 48.615234 19.210938 L 41 13.269531 L 41 6 L 35 6 L 35 8.5859375 L 25.615234 1.2636719 A 1.0001 1.0001 0 0 0 24.962891 1.0546875 z M 25 3.3222656 L 44 18.148438 L 44 45 L 32 45 L 32 26 L 18 26 L 18 45 L 6 45 L 6 18.148438 L 25 3.3222656 z M 37 8 L 39 8 L 39 11.708984 L 37 10.146484 L 37 8 z M 20 28 L 30 28 L 30 45 L 20 45 L 20 28 z"></path>
          </svg>
          الرئيسية
        </li>
        <li>
          <FaClipboardList /> الطلبات الجديدة <span className="badge">16</span>
        </li>
        <li>
          <FaClipboardList /> سجل الطلبات
        </li>
        <li>
          <FaShoppingBasket /> المنتجات
        </li>
        <li>
          <FaChartLine /> تقرير المبيعات
        </li>
        <li>
          <FaCog /> الإعدادات
        </li>
      </ul>

      <div className="sidebar-footer">
        <button className="toggle-dark" onClick={toggleDarkMode}>
          {darkMode ? <FaSun /> : <FaMoon />}
          <span>{darkMode ? "الوضع الفاتح" : "الوضع المظلم"}</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
