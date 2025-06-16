import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/HeaderDashboard.css";

axios.defaults.withCredentials = true;

export default function HeaderDashboard() {
  const [supplier, setSupplier] = useState(null);

  useEffect(() => {
    // افتراضاً هذا هو الراوت يلي يرجع بيانات المورّد المسجل
    axios
      .get("http://127.0.0.1:8000/api/supplier/register")
      .then((res) => {
        if (res.data.status === "success") {
          setSupplier(res.data.supplier); // تأكد من اسم المفتاح حسب اللي بيرجعه الباك
        }
      })
      .catch((error) => {
        console.error("فشل في جلب بيانات المستخدم:", error);
      });
  }, []);

  const fullName = supplier
    ? `${supplier.first_name} ${supplier.last_name}`.trim()
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
