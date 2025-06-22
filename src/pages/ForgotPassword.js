import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/base.css";
import "../styles/login.css";
import logo from "../assets/logo.png";
import sideImage from "../assets/L.png";

export default function ForgotPassword() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  // إضافة console.log لتشخيص الاستجابة
  const logResponse = (response) => {
    console.log("Server response:", response);
  };
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isValidPhone = /^09\d{8}$/.test(phone);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidPhone) {
      setError("يرجى إدخال رقم هاتف صحيح يبدأ بـ 09 ويتكون من 10 أرقام");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie");
      const response = await axios.post(
        "http://127.0.0.1:8000/api/supplier/password/send-otp",
        {
          phone,
        }
      );

      if (response.data.status === "success") {
        // التوجيه إلى صفحة التحقق من الرمز
        navigate("/verify-code", { state: { phone } });
      } else {
        setError(response.data.message || "حدث خطأ ما");
      }
    } catch (err) {
      console.log("Error details:", err.response?.data); // للتشخيص

      if (err.response?.status === 422) {
        // التحقق من وجود أخطاء محددة في الحقول
        if (err.response.data?.errors?.phone) {
          setError(err.response.data.errors.phone[0]);
        }
        // التحقق من رسالة الخطأ العامة
        else if (err.response.data?.message) {
          const message = err.response.data.message;
          if (
            message.includes("فشل في التحقق من البيانات") ||
            message.includes("validation")
          ) {
            setError("لم يتم إنشاء حساب بهذا الرقم .");
          } else {
            setError(message);
          }
        }
        // رسالة افتراضية لخطأ 422
        else {
          setError(" لم يتم إنشاء حساب بهذا الرقم .");
        }
      }
      // أخطاء أخرى
      else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("فشل في الاتصال بالخادم. حاول لاحقاً.");
      }
    } finally {
      setLoading(false);
    }
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
                disabled={loading}
              />
              <label>رقم الهاتف</label>
            </div>
            {error && <div className="error">{error}</div>}

            <button
              type="submit"
              className="login-button"
              style={{ marginTop: "35px" }}
              disabled={loading}
            >
              {loading ? (
                <>
                  <i className="fa fa-spinner fa-spin" style={{marginLeft: '8px'}}></i>
                  جاري الإرسال...
                </>
              ) : (
                "إرسال الرمز"
              )}
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
