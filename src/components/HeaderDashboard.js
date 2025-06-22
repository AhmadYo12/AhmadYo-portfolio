import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/HeaderDashboard.css";

axios.defaults.withCredentials = true;

export default function HeaderDashboard() {
  const [supplier, setSupplier] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie");
        
        const response = await axios.get(
          "http://127.0.0.1:8000/api/supplier/profile"
        );
        
        console.log('Response:', response.data);
        
        // جرب هياكل مختلفة للاستجابة
        if (response.data.supplier) {
          setSupplier(response.data.supplier);
        } else if (response.data.data?.supplier) {
          setSupplier(response.data.data.supplier);
        } else if (response.data.first_name) {
          setSupplier(response.data);
        }
        
      } catch (error) {
        console.error("خطأ في جلب البيانات:", error);
      }
    };
    
    fetchProfile();
  }, []);

  const fullName = supplier 
    ? `${supplier.first_name || ''} ${supplier.last_name || ''}`.trim() || "اسم المستخدم"
    : "اسم المستخدم";

  return (
    <header className="header">
      <div className="header-content">
        <span className="company-name">{fullName}</span>
        <i className="fa-regular fa-circle-user"></i>
      </div>
    </header>
  );
}