import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyCode from "./pages/VerifyCode";
import NewPassword from "./pages/NewPassword";
import CheckAccount from "./pages/CheckAccount";
import Dashboard from "./pages/DashboardHome";
import NewOrder from "./pages/NewOrders";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import Sales from "./pages/Sales";
import Account from "./pages/Account";
import "./styles/base.css";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-code" element={<VerifyCode />} />
        <Route path="/new-password" element={<NewPassword />} />
        <Route path="/check-account" element={<CheckAccount />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/neworder" element={<NewOrder />} />
        <Route path="/dashboard/orders" element={<Orders />} />
        <Route path="/dashboard/products" element={<Products />} />
        <Route path="/dashboard/sales" element={<Sales />} />
        <Route path="/dashboard/account" element={<Account />} />
      </Routes>
    </Router>
  );
}
