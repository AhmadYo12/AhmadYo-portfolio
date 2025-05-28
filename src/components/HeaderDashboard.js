// HeaderDashboard.js
import React from "react";
import "../styles/HeaderDashboard.css";

export default function HeaderDashboard() {
  let supplier = null;

  try {
    const supplierString = localStorage.getItem("supplier");
    if (supplierString) {
      supplier = JSON.parse(supplierString);
    }
  } catch (error) {
    console.error("Failed to parse supplier data from localStorage:", error);
    supplier = null;
  }

  const fullName = supplier
    ? `${supplier.first_name} ${supplier.last_name}`.trim()
    : "";

  return (
    <header className="header">
      <div className="header-content">
        <span className="company-name">{fullName || "اسم المستخدم"}</span>
        <i className="fa-regular fa-circle-user"></i>
      </div>
    </header>
  );
}
