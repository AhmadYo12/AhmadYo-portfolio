import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/base.css";
import "../styles/login.css";
import "../styles/Code.css";
import logo from "../assets/logo.png";
import sideImage from "../assets/L.png";

export default function VerifyCode() {
  const location = useLocation();
  const phone = location.state?.phone || "";

  const [code, setCode] = useState(["", "", "", "", ""]);
  const [error, setError] = useState("");

  const handleChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      if (value && index < 4) {
        document.getElementById(`code-${index + 1}`).focus();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullCode = code.join("");
    if (fullCode.length !== 5) {
      setError("يرجى إدخال الرمز الكامل المكون من 5 أرقام");
      return;
    }
    setError("");
    console.log("الرمز المُدخل:", fullCode);
  };

  // دالة تمويه رقم الهاتف
  const formatPhone = (phone) => {
    if (!phone) return "رقم غير متوفر";
    const digits = phone.replace(/\D/g, ""); // إزالة الرموز غير الرقمية
    if (digits.length < 4) return "رقم غير متوفر";
    const first = digits.slice(0, 2);
    const last = digits.slice(-2);
    return `${last}******${first}`;
  };

  const maskedPhone = formatPhone(phone);

  return (
    <div className="login-page">
      <div className="login-right">
        <div className="login-container">
          <img src={logo} alt="Dento Logo" className="logo" />
          <div className="main-title">أدخل الرمز</div>
          <p className="main-desc">
            لقد أرسلنا رمز التحقق برسالة SMS إلى رقمك {maskedPhone}. يرجى إدخال
            الرمز المكوّن من 5 أرقام لإتمام التحقق.
          </p>
          <div className="input-title">رمز التحقق</div>
          <form onSubmit={handleSubmit}>
            <div className="code-inputs">
              {code.map((digit, i) => (
                <input
                  key={i}
                  id={`code-${i}`}
                  type="text"
                  inputMode="numeric"
                  maxLength="1"
                  className="code-box"
                  value={digit}
                  onChange={(e) => handleChange(i, e.target.value)}
                />
              ))}
            </div>
            {error && <div className="error">{error}</div>}

            <button
              type="submit"
              className="login-button"
              style={{ marginTop: "35px" }}
            >
              تحقق
            </button>
          </form>

          <div className="resend-text">
            لم تستلم الرمز؟{" "}
            <span
              className="resend-link"
              onClick={() => alert("تمت إعادة الإرسال")}
            >
              إعادة الإرسال
            </span>
          </div>
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
