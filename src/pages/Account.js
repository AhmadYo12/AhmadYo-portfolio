import "./../styles/Products.css";
import "./../styles/Account.css";
import Header from "../components/HeaderDashboard";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

axios.defaults.withCredentials = true;

function Account() {
  const navigate = useNavigate();

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
            <div className="account-content">
              <button onClick={handleLogout} className="logout-button">
                تسجيل الخروج
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
