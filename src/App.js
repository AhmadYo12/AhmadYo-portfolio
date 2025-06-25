import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyCode from "./pages/VerifyCode";
import NewPassword from "./pages/NewPassword";
import CheckAccount from "./pages/CheckAccount";
import DashboardHome from "./pages/DashboardHome";
import NewOrder from "./pages/NewOrders";
import Orders from "./pages/Orders";
import OrdersEnded from "./pages/OrdersEnded";
import Products from "./pages/Products";
import Sales from "./pages/Sales";
import Account from "./pages/Account";
import HomeOrders from "./pages/HomeOrders"; // صفحة تفاصيل الطلب
import ProtectedRoute from "./components/ProtectedRoute";

import "./styles/base.css";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* صفحات خارج الداشبورد */}
        <Route path="/" element={<ProtectedRoute guestOnly><Login /></ProtectedRoute>} />
        <Route path="/login" element={<ProtectedRoute guestOnly><Login /></ProtectedRoute>} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-code" element={<VerifyCode />} />
        <Route path="/new-password" element={<NewPassword />} />
        <Route path="/check-account" element={<CheckAccount />} />

        {/* صفحات الداشبورد */}
        <Route path="/dashboard" element={<ProtectedRoute><DashboardHome /></ProtectedRoute>} />
        <Route path="/dashboard/neworder" element={<ProtectedRoute><NewOrder /></ProtectedRoute>} />
        <Route path="/dashboard/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
        <Route path="/dashboard/ordersended" element={<ProtectedRoute><OrdersEnded /></ProtectedRoute>} />
        <Route path="/dashboard/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
        <Route path="/dashboard/sales" element={<ProtectedRoute><Sales /></ProtectedRoute>} />
        <Route path="/dashboard/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
        <Route
          path="/dashboard/order-details/:orderId"
          element={<ProtectedRoute><HomeOrders /></ProtectedRoute>}
        />
      </Routes>
    </Router>
  );
}
