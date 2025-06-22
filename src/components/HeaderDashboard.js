import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/HeaderDashboard.css";

// هذا الإعداد يضمن إرسال الكوكيز (cookies) مع كل طلب، وهو ضروري لنظام المصادقة
axios.defaults.withCredentials = true;

export default function HeaderDashboard() {
  const [supplier, setSupplier] = useState(null);
  const [loading, setLoading] = useState(true); // حالة لتتبع عملية التحميل

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // الخطوة 1: Sanctum يطلب جلب "كعكة" الحماية من CSRF أولاً
        await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie");
        
        // الخطوة 2: استدعاء الراوت الصحيح لجلب بيانات المستخدم
        const response = await axios.get(
          "http://127.0.0.1:8000/api/supplier/profile"
        );
        
        console.log('API Response:', response.data); // مفيد للتأكد من بنية البيانات
        
        // الخطوة 3: قراءة البيانات من المسار الصحيح وتحديث الحالة
        // الباك إند يرسل البيانات داخل data.supplier
        if (response.data.status === "success" && response.data.data.supplier) {
          setSupplier(response.data.data.supplier); // ✅ التصحيح الرئيسي هنا
        } else {
          console.error("Failed to get supplier object from response:", response.data);
        }

      } catch (error) {
        console.error("فشل في جلب بيانات المستخدم:", error.response || error.message);
        if (error.response?.status === 401) {
          console.log("المستخدم غير مصادق عليه (Unauthorized). يجب إعادة توجيهه لصفحة الدخول.");
          // مثال: window.location.href = '/login';
        }
      } finally {
        // إيقاف حالة التحميل سواء نجح الطلب أو فشل
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, []); // الـ [] تضمن أن هذا الكود يعمل مرة واحدة فقط عند تحميل المكون

  // دالة مساعدة لجعل الكود في الأسفل أنظف
  const renderFullName = () => {
    if (loading) {
      return "جاري التحميل..."; // رسالة لطيفة أثناء انتظار البيانات
    }
    if (supplier && supplier.first_name) {
      return `${supplier.first_name} ${supplier.last_name || ''}`.trim();
    }
    return "اسم المستخدم"; // يظهر في حال فشل جلب البيانات
  };

  return (
    <header className="header">
      <div className="header-content">
        <span className="company-name">{renderFullName()}</span>
        <i className="fa-regular fa-circle-user"></i>
      </div>
    </header>
  );
}