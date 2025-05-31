import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Sidebar.css";
import logo from "../assets/logo.png";
import { ReactComponent as Close } from "../assets/icons/Panel-close-1.svg";
import { ReactComponent as CloseCollapsed } from "../assets/icons/Panel-close.svg";
import { ReactComponent as Home } from "../assets/icons/Content-1.svg";
import { ReactComponent as NewOrder } from "../assets/icons/Content-2.svg";
import { ReactComponent as Order } from "../assets/icons/google-doc.svg";
import { ReactComponent as Products } from "../assets/icons/Content-3.svg";
import { ReactComponent as Sale } from "../assets/icons/Content-4.svg";
import { ReactComponent as Account } from "../assets/icons/elements.svg";

const menuItems = [
  {
    label: "الرئيسية",
    icon: <Home className="home-icons side-icons" />,
    path: "/dashboard",
  },
  {
    label: "الطلبات الجديدة",
    icon: <NewOrder className="neworder-icons side-icons" />,
    path: "/orders/new",
  },
  {
    label: "سجل الطلبات",
    icon: <Order className="order-icons side-icons" />,
    path: "/orders/history",
  },
  {
    label: "المنتجات",
    icon: <Products className="products-icons side-icons" />,
    path: "/dashboard/products",
  },
  {
    label: "تقرير المبيعات",
    icon: <Sale className="sale-icons side-icons" />,
    path: "/sales",
  },
  {
    label: "معلومات الحساب",
    icon: <Account className="account-icons side-icons" />,
    path: "/account",
  },
];

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [collapsed, setCollapsed] = useState(() => {
    // Get the initial state from localStorage, default to false if not found
    const savedState = localStorage.getItem("sidebarCollapsed");
    return savedState ? JSON.parse(savedState) : false;
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const container = document.querySelector(".dashboard-container");
    if (container) {
      if (collapsed) {
        container.classList.add("sidebar-collapsed");
      } else {
        container.classList.remove("sidebar-collapsed");
      }
    }
    // Save the collapsed state to localStorage whenever it changes
    localStorage.setItem("sidebarCollapsed", JSON.stringify(collapsed));
  }, [collapsed]);

  useEffect(() => {
    const currentPath = location.pathname;
    const foundIndex = menuItems.findIndex((item) => item.path === currentPath);
    setActiveIndex(foundIndex);
  }, [location.pathname]);

  const handleMenuItemClick = (item, idx) => {
    navigate(item.path);
  };

  return (
    <div className={`sidebar${collapsed ? " sidebar-collapsed" : ""}`}>
      <div className="sidebar-header">
        <img src={logo} alt="Dento Logo" className="logo" />
        <div className="head-dash">
          {!collapsed && <p className="title-dash">لوحة التحكم</p>}
          <span
            onClick={() => setCollapsed((prev) => !prev)}
            style={{ cursor: "pointer" }}
          >
            {collapsed ? (
              <CloseCollapsed className="close-icons" />
            ) : (
              <Close className="close-icons" />
            )}
          </span>
        </div>
      </div>
      <ul className="sidebar-menu">
        {menuItems.map((item, idx) => (
          <li
            key={item.label}
            className={activeIndex === idx ? "active" : ""}
            onClick={() => handleMenuItemClick(item, idx)}
          >
            {item.icon}
            {!collapsed && item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
