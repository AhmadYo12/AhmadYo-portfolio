import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/base.css";
import "../styles/login.css";
import logo from "../assets/logo.png";
import sideImage from "../assets/L.png";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const isValidPhone = /^09\d{8}$/.test(phone);

  const validate = () => {
    const newErrors = {};
    if (!phone) newErrors.phone = "يرجى إدخال رقم الهاتف";
    else if (!isValidPhone)
      newErrors.phone = "رقم الهاتف يجب أن يبدأ بـ 09 ويتكون من 10 أرقام";

    if (!password) newErrors.password = "يرجى إدخال كلمة المرور";
    else if (password.length < 8)
      newErrors.password = "كلمة المرور يجب أن تكون 8 أحرف على الأقل";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("تم تسجيل الدخول بنجاح!");
      // navigate("/dashboard");
    }
  };

  return (
    <div className="login-page">
      <div className="login-right">
        <div className="login-container">
          <img src={logo} alt="Dento Logo" className="logo" />
          <div className="login-title">
            مرحباً بك في <span className="dento-text">Dento</span>
          </div>

          <form onSubmit={handleLogin}>
            {/* رقم الهاتف */}
            <div className="input-group">
              <input
                className={`input ${
                  errors.phone
                    ? "input-error"
                    : isValidPhone
                    ? "input-success"
                    : ""
                }`}
                type="tel"
                placeholder=" "
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <label>رقم الهاتف</label>
              {!errors.phone && isValidPhone && (
                <span className="valid-icon">
                  <i className="fa-regular fa-circle-check"></i>
                </span>
              )}
              {errors.phone && <div className="error">{errors.phone}</div>}
            </div>

            {/* كلمة المرور */}
            <div className="password-wrapper">
              <div className="input-group">
                <input
                  className={`input ${errors.password ? "input-error" : ""}`}
                  type={showPassword ? "text" : "password"}
                  placeholder=" "
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label>كلمة المرور</label>
                <span
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i
                    className={`fa-regular ${
                      showPassword ? "fa-eye-slash" : "fa-eye"
                    }`}
                  ></i>
                </span>
              </div>
              {errors.password && (
                <div className="error">{errors.password}</div>
              )}
            </div>

            <Link to="/forgot-password" className="forgot-password">
              نسيت كلمة المرور؟
            </Link>

            <button type="submit" className="login-button">
              تسجيل الدخول
            </button>
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
