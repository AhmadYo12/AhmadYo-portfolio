import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/HeaderDashboard.css";

axios.defaults.withCredentials = true;

export default function HeaderDashboard() {
  const [supplier, setSupplier] = useState(null);

  useEffect(() => {
    // تحقق من وجود البيانات في localStorage أولاً
    const savedSupplier = localStorage.getItem('supplierData');
    if (savedSupplier) {
      setSupplier(JSON.parse(savedSupplier));
      return; // لا تستدعي API إذا كانت البيانات محفوظة
    }

    const fetchProfile = async () => {
      try {
        await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie");

        const response = await axios.get(
          "http://localhost:8000/api/supplier/profile"
        );

        let supplierData = null;
        // جرب هياكل مختلفة للاستجابة
        if (response.data.supplier) {
          supplierData = response.data.supplier;
        } else if (response.data.data?.supplier) {
          supplierData = response.data.data.supplier;
        } else if (response.data.first_name) {
          supplierData = response.data;
        }

        if (supplierData) {
          setSupplier(supplierData);
          // احفظ البيانات في localStorage
          localStorage.setItem('supplierData', JSON.stringify(supplierData));
        }
      } catch (error) {
        console.error("خطأ في جلب البيانات:", error);
      }
    };

    fetchProfile();
  }, []);

  const fullName = supplier
    ? `${supplier.first_name || ""} ${supplier.last_name || ""}`.trim() ||
      "اسم المستخدم"
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
