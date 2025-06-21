import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/base.css";
import "../styles/login.css";
import logo from "../assets/logo.png";
import sideImage from "../assets/L.png";

export default function NewPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const phone = location.state?.phone;

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasError = false;

    if (newPassword.length < 8) {
      setNewPasswordError("يجب أن تكون كلمة المرور 8 أحرف أو أكثر");
      hasError = true;
    } else {
      setNewPasswordError("");
    }

    if (confirmPassword !== newPassword) {
      setConfirmPasswordError("كلمتا المرور غير متطابقتين");
      hasError = true;
    } else {
      setConfirmPasswordError("");
    }

    if (hasError) return;

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/supplier/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone,
            password: newPassword,
            password_confirmation: confirmPassword,
          }),
        }
      );

      const data = await response.json();

      if (data.status === "success") {
        navigate("/login");
      } else {
        setSubmitError(data.message || "فشل في تغيير كلمة المرور.");
      }
    } catch (err) {
      setSubmitError("فشل الاتصال بالخادم.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-right">
        <div className="login-container">
          <img src={logo} alt="Dento Logo" className="logo" />
          <div className="main-title">تغيير كلمة المرور</div>
          <p className="main-desc">ادخل كلمة مرور جديدة لتأمين حسابك</p>

          <form onSubmit={handleSubmit}>
            {/* كلمة المرور الجديدة */}
            <div className="password-wrapper">
              <div className="input-group">
                <input
                  type={showNewPassword ? "text" : "password"}
                  className={`input ${
                    newPassword && !newPasswordError
                      ? "input-success"
                      : newPasswordError
                      ? "input-error"
                      : ""
                  }`}
                  placeholder=" "
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <label>كلمة المرور الجديدة</label>
                <span
                  className="toggle-password"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  <i
                    className={`fa-regular ${
                      showNewPassword ? "fa-eye-slash" : "fa-eye"
                    }`}
                  ></i>
                </span>
              </div>
              {newPasswordError && (
                <div className="error">{newPasswordError}</div>
              )}
            </div>

            {/* تأكيد كلمة المرور */}
            <div className="password-wrapper">
              <div className="input-group">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className={`input ${
                    confirmPassword && !confirmPasswordError
                      ? "input-success"
                      : confirmPasswordError
                      ? "input-error"
                      : ""
                  }`}
                  placeholder=" "
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <label>تأكيد كلمة المرور الجديدة</label>
                <span
                  className="toggle-password"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <i
                    className={`fa-regular ${
                      showConfirmPassword ? "fa-eye-slash" : "fa-eye"
                    }`}
                  ></i>
                </span>
              </div>
              {confirmPasswordError && (
                <div className="error">{confirmPasswordError}</div>
              )}
            </div>

            {submitError && <div className="error">{submitError}</div>}

            <button type="submit" className="login-button">
              تغيير كلمة المرور
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
