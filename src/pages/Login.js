// Login.js
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/base.css";
import "../styles/login.css";
import logo from "../assets/logo.png";
import sideImage from "../assets/L.png";
import axios from "axios";

// تفعيل إرسال الكوكيز مع كل طلب
axios.defaults.withCredentials = true;

export default function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);
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

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setLoginError("");

    try {
      // 1. طلب CSRF Cookie من السيرفر
      await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie");

      // 2. إرسال بيانات تسجيل الدخول
      const response = await axios.post(
        "http://127.0.0.1:8000/api/supplier/login",
        { phone, password }
      );

      if (response.data.status === "success") {
        // ✅ الجلسة تم إنشاؤها تلقائيًا في الكوكيز
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setLoginError("الرقم أو كلمة المرور غير صحيحة");
      } else {
        setLoginError("حدث خطأ غير متوقع، يرجى المحاولة لاحقاً");
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
          <div className="login-title">
            مرحباً بك في <span className="dento-text">Dento</span>
          </div>

          <form onSubmit={handleLogin}>
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

            {loginError && <div className="error">{loginError}</div>}

            <Link to="/forgot-password" className="forgot-password">
              نسيت كلمة المرور؟
            </Link>

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? (
                <>
                  <i className="fa fa-spinner fa-spin" style={{marginLeft: '8px'}}></i>
                  جاري تسجيل الدخول...
                </>
              ) : (
                "تسجيل الدخول"
              )}
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
