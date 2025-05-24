import React from "react";
import Header from "../components/HeaderDashboard";
import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";
export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <Header />
      <div className="main-layout">
        <Sidebar />
        <div className="header-dash-container">
          <div className="dashboard-content main-scroll-area">
            <h1 className="page-title">الرئيسية</h1>

            {/* أقسام الداشبورد (مبسطة – محتوى وهمي) */}
            <div className="cards-row">
              <div className="card orange">
                <div className="card-row card-row-top">
                  <span className="card-title">متوسط تقييمات المستخدمين</span>
                  <i className="fa-solid fa-arrow-up-right card-arrow"></i>
                </div>
                <div className="card-row card-row-bottom">
                  <span className="card-value"><i className="fa-solid fa-star card-icon orange" style={{color: '#FFD600', marginLeft: '6px'}}></i>4.0 <span className="card-value-sub">(1031)</span></span>
                  <span className="card-trend orange-trend"><i className="fa-solid fa-arrow-trend-up"></i>3.6% هذا الشهر</span>
                </div>
              </div>
              <div className="card yellow">
                <div className="card-row card-row-top">
                  <span className="card-title">عدد الطلبات هذا الشهر</span>
                  <i className="fa-solid fa-arrow-up-right card-arrow"></i>
                </div>
                <div className="card-row card-row-bottom">
                  <span className="card-value">1,650</span>
                  <span className="card-trend yellow-trend"><i className="fa-solid fa-arrow-trend-up"></i>3.6% آخر أسبوع</span>
                </div>
              </div>
              <div className="card purple">
                <div className="card-row card-row-top">
                  <span className="card-title">عدد المنتجات المباعة</span>
                  <i className="fa-solid fa-arrow-up-right card-arrow"></i>
                </div>
                <div className="card-row card-row-bottom">
                  <span className="card-value">1,014</span>
                  <span className="card-trend purple-trend"><i className="fa-solid fa-arrow-trend-up"></i>3.6% آخر أسبوع</span>
                </div>
              </div>
              <div className="card green">
                <div className="card-row card-row-top">
                  <span className="card-title">إجمالي الأرباح</span>
                  <i className="fa-solid fa-arrow-up-right card-arrow"></i>
                </div>
                <div className="card-row card-row-bottom">
                  <span className="card-value">$12.5k</span>
                  <span className="card-trend green-trend"><i className="fa-solid fa-arrow-trend-up"></i>3.6% آخر أسبوع</span>
                </div>
              </div>
            </div>

            <div className="dashboard-flex-row">
              <div className="side-cards">
                <div className="card red card-waiting">
                  <div className="card-row card-row-top">
                    <span className="card-title">طلبات قيد الانتظار</span>
                    <i className="fa-solid fa-arrow-up-right card-arrow"></i>
                    <i className="fa-solid fa-triangle-exclamation card-icon red" style={{color: '#E53935', marginLeft: '8px', fontSize: '1.5rem'}}></i>
                  </div>
                  <div className="card-row card-row-bottom">
                    <span className="card-value">20 طلبًا</span>
                    <span className="card-trend red-trend">قيد الانتظار</span>
                  </div>
                </div>
                <div className="chart-card">
                  <div className="card-row card-row-top">
                    <span className="card-title">المبيعات آخر أسبوع</span>
                    <i className="fa-solid fa-arrow-up-right card-arrow"></i>
                  </div>
                  <div className="card-row card-row-bottom">
                    <span className="card-value">1,259</span>
                    <span className="card-trend green-trend">منتج مبيع</span>
                  </div>
                  <div className="fake-chart">
                    <svg width="100%" height="100%" viewBox="0 0 200 80">
                      <rect x="10" y="60" width="12" height="20" rx="3" fill="#00aeef" />
                      <rect x="30" y="50" width="12" height="30" rx="3" fill="#00aeef" />
                      <rect x="50" y="40" width="12" height="40" rx="3" fill="#00aeef" />
                      <rect x="70" y="30" width="12" height="50" rx="3" fill="#00aeef" />
                      <rect x="90" y="60" width="12" height="20" rx="3" fill="#00aeef" />
                      <rect x="110" y="20" width="12" height="60" rx="3" fill="#00aeef" />
                      <rect x="130" y="50" width="12" height="30" rx="3" fill="#00aeef" />
                      <rect x="150" y="35" width="12" height="45" rx="3" fill="#00aeef" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="orders-col">
                <div className="new-orders-table-wrapper">
                  <div className="orders-table new-orders-table">
                    <div className="orders-table-header-row">
                      <span className="orders-table-title">طلبات جديدة</span>
                      <span className="orders-table-view-all">
                        <i className="fa-solid fa-arrow-up-right"></i>
                        مشاهدة الكل
                      </span>
                    </div>
                    <table>
                      <thead>
                        <tr>
                          <th>رقم الطلب</th>
                          <th>اسم الزبون</th>
                          <th>الحالة</th>
                          <th>عدد المنتجات</th>
                          <th>الوقت والتاريخ</th>
                          <th>أزرار الإجراء</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[...Array(8)].map((_, i) => (
                          <tr key={i}>
                            <td>59217</td>
                            <td>د. أحمد الخشي</td>
                            <td>
                              <span className="badge waiting">بانتظار القبول</span>
                            </td>
                            <td>3</td>
                            <td>8:25 PM / 2025-04-01</td>
                            <td>
                              <button className="btn-details">عرض التفاصيل</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
