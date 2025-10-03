import React from "react";
import Header from "../components/HeaderDashboard";
import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";

function Sales() {
  return (
    <div className="dashboard-container">
      <Header />
      <div className="main-layout">
        <Sidebar />
        <div className="header-dash-container">
          <div className="page-unavailable">
            <div className="unavailable-message">
              <i className="fa fa-exclamation-triangle unavailable-icon"></i>
              <h2>الصفحة لا تعمل الآن</h2>
              <p>نعتذر، هذه الصفحة غير متاحة حالياً. يرجى المحاولة لاحقاً.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sales;