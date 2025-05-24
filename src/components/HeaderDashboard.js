import React from "react";
import "../styles/HeaderDashboard.css";
export default function HeaderDashboard() {
  return (
    <header className="header">
      <div className="header-content">
        {/* اسم الشركة */}
        <span className="company-name">شركة أبو حسين</span>
        <i class="fa-regular fa-circle-user"></i>
      </div>
    </header>
  );
}
