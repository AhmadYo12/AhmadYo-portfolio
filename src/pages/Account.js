import { useState } from "react";
import "./../styles/Products.css";
import "./../styles/Account.css";
import Header from "../components/HeaderDashboard";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

axios.defaults.withCredentials = true;

function Account() {
  const navigate = useNavigate();
  const [showTooltip, setShowTooltip] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    companyName: "",
    address: "",
    multiplier: ""
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [passwordErrors, setPasswordErrors] = useState({});
  const [passwordLoading, setPasswordLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = () => {
    console.log("Saving changes:", formData);
  };

  const handleChangePassword = () => {
    setShowPasswordModal(true);
  };

  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const validatePassword = () => {
    const newErrors = {};
    
    if (!passwordData.currentPassword) {
      newErrors.currentPassword = "يرجى إدخال كلمة المرور الحالية";
    }
    
    if (!passwordData.newPassword) {
      newErrors.newPassword = "يرجى إدخال كلمة المرور الجديدة";
    } else if (passwordData.newPassword.length < 8) {
      newErrors.newPassword = "كلمة المرور يجب أن تكون 8 أحرف على الأقل";
    }
    
    if (!passwordData.confirmPassword) {
      newErrors.confirmPassword = "يرجى تأكيد كلمة المرور الجديدة";
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = "كلمة المرور الجديدة وتأكيدها غير متطابقتين";
    }
    
    setPasswordErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePasswordSubmit = async () => {
    if (!validatePassword()) return;
    
    setPasswordLoading(true);
    setPasswordErrors({});
    
    try {
      await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie");
      
      const response = await axios.post(
        "http://127.0.0.1:8000/api/supplier/password/reset",
        {
          current_password: passwordData.currentPassword,
          password: passwordData.newPassword,
          password_confirmation: passwordData.confirmPassword
        }
      );
      
      if (response.data.status === "success") {
        setShowPasswordModal(false);
        setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
        setPasswordErrors({});
        // يمكن إضافة رسالة نجاح هنا
      }
    } catch (error) {
      if (error.response?.status === 422) {
        const serverErrors = error.response.data.errors || {};
        const newErrors = {};
        
        if (serverErrors.current_password) {
          newErrors.currentPassword = serverErrors.current_password[0];
        }
        if (serverErrors.password) {
          newErrors.newPassword = serverErrors.password[0];
        }
        if (error.response.data.message) {
          newErrors.general = error.response.data.message;
        }
        
        setPasswordErrors(newErrors);
      } else if (error.response?.status === 401) {
        setPasswordErrors({ currentPassword: "كلمة المرور الحالية غير صحيحة" });
      } else {
        setPasswordErrors({ general: "حدث خطأ غير متوقع، يرجى المحاولة لاحقاً" });
      }
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleModalClose = () => {
    setShowPasswordModal(false);
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setShowPasswords({ current: false, new: false, confirm: false });
    setPasswordErrors({});
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleLogout = async () => {
    localStorage.clear();
    sessionStorage.clear();
    try {
      await axios.post("http://localhost:8000/api/supplier/logout");
    } catch (error) {
      console.log("Logout error:", error);
    }
    window.location.href = "/login";
  };

  return (
    <div className="dashboard-container">
      <Header />
      <div className="main-layout">
        <Sidebar />
        <div className="header-dash-container">
          <div className="products-page-container">
            <h1 className="page-title">تعديل معلوماتك الشخصية</h1>
            <div className="account-form-container">
              <div className="form-header"></div>
              <div className="user-info-section">
                <div className="user-info-left">
                  <div className="user-avatar">
                    <i className="fa-regular fa-circle-user"></i>
                  </div>
                  <div className="company-name">
                    <span>شركة سن</span>
                  </div>
                </div>
                <button type="button" onClick={handleSaveChanges} className="save-btn">
                  حفظ التغييرات
                </button>
              </div>

              <form className="account-form">
                <div className="account-form-row">
                  <div className="account-form-field">
                    <label>الاسم الأول</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="اسمك الأول"
                    />
                  </div>
                  <div className="account-form-field">
                    <label>الاسم الأخير</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="اسمك الأخير"
                    />
                  </div>
                </div>

                <div className="account-form-row">
                  <div className="account-form-field">
                    <label>البريد الإلكتروني</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="عنوان بريدك الإلكتروني"
                    />
                  </div>
                  <div className="account-form-field">
                    <label>اسم الشركة</label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      placeholder="اسم شركتك"
                    />
                  </div>
                </div>

                <div className="account-form-row">
                  <div className="account-form-field">
                    <label>العنوان</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="عنوانك"
                    />
                  </div>
                  <div className="account-form-field multiplier-field">
                    <label>معامل الضرب الخاص بك</label>
                    <div className="input-with-icon">
                      <input
                        type="number"
                        name="multiplier"
                        value={formData.multiplier}
                        onChange={handleInputChange}
                        placeholder="ادخل معامل الضرب"
                      />
                      <i className="fa fa-exclamation-circle info-icon-inside"></i>
                      <div className="tooltip">
                        <div className="tooltip-title">سعر الصرف :</div>
                        <div className="tooltip-text">
                         سيتم عرض ثمن المنتج بالليرة السورية وفقا لسعر الصرف الخاص بك.
                        </div>
                        <div className="tooltip-formula">
                          السعر النهائي = السعر بالدولار * <span className="highlight">معامل الضرب</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="password-section">
                  <div className="password-field">
                    <label>كلمة المرور</label>
                    <button type="button" onClick={handleChangePassword} className="change-password-btn">
                      اضغط لتغيير كلمة المرور
                    </button>
                  </div>
                  <button type="button" onClick={handleLogout} className="logout-button">
                    تسجيل الخروج
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      {showPasswordModal && (
        <div className="modal-overlay" onClick={handleModalClose}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">تغيير كلمة المرور</h2>
              <button className="modal-close" onClick={handleModalClose}>
                <i className="fa fa-times"></i>
              </button>
            </div>
            
            <div className="modal-body">
              {passwordErrors.general && (
                <div className="error" style={{marginBottom: '15px'}}>{passwordErrors.general}</div>
              )}
              
              <div className="modal-field">
                <label>كلمة المرور الحالية</label>
                <div className="modal-password-wrapper">
                  <input
                    type={showPasswords.current ? "text" : "password"}
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordInputChange}
                    placeholder="ادخل كلمة المرور الحالية"
                    className={passwordErrors.currentPassword ? "input-error" : ""}
                    disabled={passwordLoading}
                  />
                  <span className="modal-toggle-password" onClick={() => togglePasswordVisibility('current')}>
                    <i className={`fa ${showPasswords.current ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </span>
                </div>
                {passwordErrors.currentPassword && (
                  <div className="error">{passwordErrors.currentPassword}</div>
                )}
                <button 
                  type="button" 
                  onClick={() => navigate('/forgot-password')} 
                  className="forgot-password-link"
                  style={{background: 'none', border: 'none', padding: 0, cursor: 'pointer'}}
                >
                  نسيت كلمة المرور؟
                </button>
              </div>
              
              <div className="modal-field">
                <label>كلمة المرور الجديدة</label>
                <div className="modal-password-wrapper">
                  <input
                    type={showPasswords.new ? "text" : "password"}
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordInputChange}
                    placeholder="ادخل كلمة المرور الجديدة"
                    className={passwordErrors.newPassword ? "input-error" : ""}
                    disabled={passwordLoading}
                  />
                  <span className="modal-toggle-password" onClick={() => togglePasswordVisibility('new')}>
                    <i className={`fa ${showPasswords.new ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </span>
                </div>
                {passwordErrors.newPassword && (
                  <div className="error">{passwordErrors.newPassword}</div>
                )}
              </div>
              
              <div className="modal-field">
                <label>تأكيد كلمة المرور الجديدة</label>
                <div className="modal-password-wrapper">
                  <input
                    type={showPasswords.confirm ? "text" : "password"}
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordInputChange}
                    placeholder="ادخل تأكيد كلمة المرور الجديدة"
                    className={passwordErrors.confirmPassword ? "input-error" : ""}
                    disabled={passwordLoading}
                  />
                  <span className="modal-toggle-password" onClick={() => togglePasswordVisibility('confirm')}>
                    <i className={`fa ${showPasswords.confirm ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </span>
                </div>
                {passwordErrors.confirmPassword && (
                  <div className="error">{passwordErrors.confirmPassword}</div>
                )}
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                className="modal-btn-primary" 
                onClick={handlePasswordSubmit}
                disabled={passwordLoading}
              >
                {passwordLoading ? (
                  <>
                    <i className="fa fa-spinner fa-spin" style={{marginLeft: '8px'}}></i>
                    جاري التحديث...
                  </>
                ) : (
                  "تطبيق التغيير"
                )}
              </button>
              <button 
                className="modal-btn-secondary" 
                onClick={handleModalClose}
                disabled={passwordLoading}
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Account;
