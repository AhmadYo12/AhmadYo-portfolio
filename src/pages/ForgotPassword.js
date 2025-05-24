import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/base.css";
import "../styles/login.css";
import logo from "../assets/logo.png";
import sideImage from "../assets/L.png";

export default function ForgotPassword() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const isValidPhone = /^09\d{8}$/.test(phone);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidPhone) {
      setError("يرجى إدخال رقم هاتف صحيح يبدأ بـ 09 ويتكون من 10 أرقام");
      return;
    }

    setError("");
    // هنا يمكنك إرسال الرمز عبر API إذا أردت

    // التوجيه إلى صفحة الرمز مع تمرير الرقم
    navigate("/verify-code", { state: { phone } });
  };

  return (
    <div className="login-page">
      <div className="login-right">
        <div className="login-container">
          <img src={logo} alt="Dento Logo" className="logo" />
          <div className="main-title">نسيت كلمة المرور</div>
          <p className="main-desc">
            لا تقلق! هذا يحدث أحيانًا. الرجاء إدخال رقم الهاتف المرتبط بحسابك.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                className={`input ${
                  error ? "input-error" : isValidPhone ? "input-success" : ""
                }`}
                type="tel"
                placeholder=" "
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <label>رقم الهاتف</label>
            </div>
            {error && <div className="error">{error}</div>}

            <button
              type="submit"
              className="login-button"
              style={{ marginTop: "35px" }}
            >
              إرسال الرمز
            </button>
            <Link
              to="/login"
              className="forgot-password"
              style={{ display: "block", marginTop: "15px" }}
            >
              العودة لتسجيل الدخول
            </Link>
          </form>
        </div>
      </div>
      <div className="login-left">
        <img src={sideImage} alt="Dento visual" className="side-image" />
        <div className="left-title">Dento</div>
        <div className="left-p">
          تابع مبيعاتك، أدر منتجاتك، وراقب الطلبات بسهولة عبر لوحة التحكم الخاصة
          بك على Dento
        </div>
      </div>
    </div>
  );
}
