import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/HeaderDashboard";
import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";
import "../styles/HomeOrders.css";

const dummyOrderDetails = {
  59217: {
    id: 59217,
    customerName: "د. أحمد الخشتي",
    items: [
      {
        id: 1,
        name: "Hemostal - Hemostal",
        image: "/assets/apple.jpg",
        quantity: 5,
        price: 55.00,
        total: 275.00,
        status: "pending"
      },
      {
        id: 2,
        name: "Hemostal - Hemostal",
        image: "/assets/apple.jpg",
        quantity: 3,
        price: 55.00,
        total: 165.00,
        status: "pending"
      },
      {
        id: 3,
        name: "Hemostal - Hemostal",
        image: "/assets/apple.jpg",
        quantity: 2,
        price: 55.00,
        total: 110.00,
        status: "pending"
      }
    ]
  }
};

function HomeOrders() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [orderItems, setOrderItems] = useState(
    dummyOrderDetails[orderId]?.items || []
  );

  const orderData = dummyOrderDetails[orderId];

  if (!orderData) {
    return <div>الطلب غير موجود</div>;
  }

  const handleItemAction = (itemId, action) => {
    setOrderItems(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, status: action } : item
      )
    );
  };

  const handleAcceptAll = () => {
    setOrderItems(prev =>
      prev.map(item => ({ ...item, status: "accepted" }))
    );
  };

  const handleRejectAll = () => {
    setOrderItems(prev =>
      prev.map(item => ({ ...item, status: "rejected" }))
    );
  };

  const totalItems = orderItems.length;
  const totalPrice = orderItems.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="dashboard-container">
      <Header />
      <div className="main-layout">
        <Sidebar />
        <div className="header-dash-container">
          <div className="order-details-container">
            <div className="order-details-header">
              <h1 className="order-details-title">تفاصيل الطلب</h1>
              <div className="breadcrumb">
                <span onClick={() => navigate("/dashboard")} className="breadcrumb-link">
                  الصفحة الرئيسية
                </span>
                <span className="breadcrumb-separator">➡️</span>
                <span>تفاصيل الطلب</span>
              </div>
              <button className="back-btn" onClick={() => navigate(-1)}>
                رجوع
              </button>
            </div>

            <div className="order-details-content">
              <div className="order-main-section">
                <div className="order-header-card">
                  <div className="order-header-item">
                    <span className="order-header-label">رقم الطلب</span>
                    <span className="order-header-value">#{orderData.id}</span>
                  </div>
                  <div className="order-header-item">
                    <span className="order-header-label">اسم الزبون</span>
                    <span className="order-header-value">{orderData.customerName}</span>
                  </div>
                </div>
                <hr className="order-header-divider" />
                
                <div className="order-table-container">
                <table className="order-items-table">
                  <thead>
                    <tr>
                      <th>المنتج</th>
                      <th>الكمية المطلوبة</th>
                      <th>سعر المنتج</th>
                      <th>مجموع السعر</th>
                      <th>أزرار الإجراء</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderItems.map((item) => (
                      <tr key={item.id}>
                        <td className="product-cell">
                          <img src={item.image} alt={item.name} className="product-image" />
                          <span>{item.name}</span>
                        </td>
                        <td>{item.quantity}</td>
                        <td>${item.price.toFixed(2)}</td>
                        <td>${item.total.toFixed(2)}</td>
                        <td className="action-buttons">
                          <button
                            className={`action-btn accept-btn ${item.status === 'accepted' ? 'active' : ''}`}
                            onClick={() => handleItemAction(item.id, 'accepted')}
                          >
                            ✅ قبول
                          </button>
                          <button
                            className={`action-btn reject-btn ${item.status === 'rejected' ? 'active' : ''}`}
                            onClick={() => handleItemAction(item.id, 'rejected')}
                          >
                            ❌ رفض
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                </div>

                <div className="bulk-actions">
                  <button className="bulk-btn reject-all-btn" onClick={handleRejectAll}>
                    رفض الكل
                  </button>
                  <button className="bulk-btn accept-all-btn" onClick={handleAcceptAll}>
                    ✅ قبول الكل
                  </button>
                </div>

                <div className="order-summary">
                <h3>ملخص الطلب</h3>
                <div className="summary-item">
                  <span>إجمالي عدد العناصر:</span>
                  <span>{totalItems}</span>
                </div>
                <div className="summary-item">
                  <span>إجمالي السعر:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <button className="confirm-btn">
                  ✅ تأكيد
                </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeOrders;