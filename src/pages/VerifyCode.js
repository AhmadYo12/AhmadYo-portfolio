import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/base.css";
import "../styles/login.css";
import "../styles/Code.css";
import logo from "../assets/logo.png";
import sideImage from "../assets/L.png";

export default function VerifyCode() {
  const location = useLocation();
  const navigate = useNavigate();
  const phone = location.state?.phone || "";

  const [code, setCode] = useState(["", "", "", "", ""]);
  const [error, setError] = useState("");

  // للحساب والتحكم في إعادة الإرسال
  const [resendCount, setResendCount] = useState(0);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [timer, setTimer] = useState(0);

  const timerRef = useRef(null);

  // مفتاح التخزين في localStorage مرتبط بالرقم
  const storageKey = `resendData_${phone}`;

  // حساب مدة الانتظار حسب عدد المحاولات
  const getWaitTime = (count) => {
    if (count < 2) return 60; // 1 دقيقة
    if (count < 5) return 15 * 60; // 15 دقيقة
    return 24 * 60 * 60; // 24 ساعة
  };

  // بدء العد التنازلي مع تحديث التخزين المحلي
  const startTimer = (duration) => {
    setTimer(duration);
    setIsResendDisabled(true);

    timerRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setIsResendDisabled(false);
          localStorage.removeItem(storageKey);
          return 0;
        }
        const newTime = prev - 1;

        // تحديث وقت الانتهاء في localStorage مع الوقت المتبقي وعدد المحاولات
        const resendData = {
          count: resendCount,
          expireAt: Date.now() + newTime * 1000,
        };
        localStorage.setItem(storageKey, JSON.stringify(resendData));

        return newTime;
      });
    }, 1000);
  };

  // استعادة حالة إعادة الإرسال من localStorage عند تحميل الصفحة أو تغير الرقم
  useEffect(() => {
    if (!phone) return; // إذا لم يوجد رقم لا نفعل شيئاً

    const savedDataStr = localStorage.getItem(storageKey);
    if (savedDataStr) {
      try {
        const savedData = JSON.parse(savedDataStr);
        setResendCount(savedData.count || 0);

        const timeLeftMs = savedData.expireAt - Date.now();
        if (timeLeftMs > 0) {
          startTimer(Math.floor(timeLeftMs / 1000));
        } else {
          localStorage.removeItem(storageKey);
          setIsResendDisabled(false);
          setTimer(0);
        }
      } catch {
        localStorage.removeItem(storageKey);
      }
    }
  }, [phone]);

  // دالة إعادة إرسال الرمز
  const handleResend = async () => {
    if (isResendDisabled) return;

    try {
      await axios.post("http://127.0.0.1:8000/api/resend-password-reset-otp");

      const newCount = resendCount + 1;
      setResendCount(newCount);

      const waitTime = getWaitTime(newCount);

      // تخزين بيانات إعادة الإرسال في localStorage
      const resendData = {
        count: newCount,
        expireAt: Date.now() + waitTime * 1000,
      };
      localStorage.setItem(storageKey, JSON.stringify(resendData));

      startTimer(waitTime);
    } catch (err) {
      alert("حدث خطأ أثناء إعادة إرسال الرمز. حاول مجدداً.");
    }
  };

  // دوال الكود والزر الأساسي كما لديك:
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullCode = code.join("");

    if (fullCode.length !== 5) {
      setError("يرجى إدخال الرمز الكامل المكون من 5 أرقام");
      return;
    }

    setError("");

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/verifyOtp", {
        otp: fullCode,
      });

      if (response.data.status === "success") {
        navigate("/new-password", { state: { phone } });
      } else {
        setError(response.data.message || "فشل التحقق من الرمز");
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message); // مثل: "كود التحقق غير صحيح"
      } else {
        setError("حدث خطأ في الاتصال بالخادم. حاول مجددًا.");
      }
    }
  };

  const formatPhone = (phone) => {
    if (!phone) return "رقم غير متوفر";
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 4) return "رقم غير متوفر";
    const first = digits.slice(0, 2);
    const last = digits.slice(-2);
    return `${last}******${first}`;
  };

  const maskedPhone = formatPhone(phone);

  // تنسيق الوقت للعرض "دقائق:ثواني"
  const formatTimer = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

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
            <button
              className="resend-link"
              disabled={isResendDisabled}
              onClick={handleResend}
              style={{
                cursor: isResendDisabled ? "not-allowed" : "pointer",
                color: isResendDisabled ? "gray" : "#00AEEF",
                border: "none",
                background: "none",
                padding: 0,
                fontSize: "1em",
                fontWeight: "bold",
                fontFamily: "Cairo",
              }}
            >
              إعادة الإرسال
              {isResendDisabled && timer > 0 && <> ({formatTimer(timer)})</>}
            </button>
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
