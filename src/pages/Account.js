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

  const handlePasswordSubmit = () => {
    console.log("Password change submitted:", passwordData);
    setShowPasswordModal(false);
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  const handleModalClose = () => {
    setShowPasswordModal(false);
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setShowPasswords({ current: false, new: false, confirm: false });
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
                        <div className="tooltip-title">معامل الضرب:</div>
                        <div className="tooltip-text">
                          هو الرقم الذي يتم ضربه بسعر المنتج بالدولار لحساب السعر بالليرة السورية.
                        </div>
                        <div className="tooltip-formula">
                          السعر النهائي = السعر بالدولار * معامل الضرب
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
              <div className="modal-field">
                <label>كلمة المرور الحالية</label>
                <div className="modal-password-wrapper">
                  <input
                    type={showPasswords.current ? "text" : "password"}
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordInputChange}
                    placeholder="ادخل كلمة المرور الحالية"
                  />
                  <span className="modal-toggle-password" onClick={() => togglePasswordVisibility('current')}>
                    <i className={`fa ${showPasswords.current ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </span>
                </div>
                <a href="#" className="forgot-password-link">نسيت كلمة المرور؟</a>
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
                  />
                  <span className="modal-toggle-password" onClick={() => togglePasswordVisibility('new')}>
                    <i className={`fa ${showPasswords.new ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </span>
                </div>
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
                  />
                  <span className="modal-toggle-password" onClick={() => togglePasswordVisibility('confirm')}>
                    <i className={`fa ${showPasswords.confirm ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </span>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="modal-btn-primary" onClick={handlePasswordSubmit}>
                تطبيق التغيير
              </button>
              <button className="modal-btn-secondary" onClick={handleModalClose}>
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
