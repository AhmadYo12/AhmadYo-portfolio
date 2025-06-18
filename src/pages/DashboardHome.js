import { useNavigate } from "react-router-dom";
import Header from "../components/HeaderDashboard";
import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";
import { ReactComponent as ArrowUpIcon } from "../assets/icons/arrow-up-right.svg";
import { ReactComponent as Star } from "../assets/icons/Vector-1.svg";
import { ReactComponent as Warning } from "../assets/icons/warning 1.svg";

const cardsData = [
  {
    title: "إجمالي المبيعات",
    value: "$12.5k",
    trend: "3.6%",
    colorClass: "green",
  },
  {
    title: "عدد المنتجات المباعة",
    value: "1.014",
    trend: "3.6%",
    colorClass: "purple",
  },
  {
    title: "عدد الطلبات هذا الشهر",
    value: "1.650",
    trend: "3.6%",
    colorClass: "yellow",
  },
  {
    title: "متوسط تقييمات المستخدمين",
    value: (
      <>
        <span className="card-value-sub">(1031)</span>4.0{" "}
        <Star className="star-icon" />
      </>
    ),
    trend: "3.6%",
    colorClass: "orange",
  },
];

export default function Dashboard() {
  const navigate = useNavigate();

  const handleViewAllPendingOrders = () => {
    navigate("/dashboard/neworder");
  };

  return (
    <div className="dashboard-container">
      <Header />
      <div className="main-layout">
        <Sidebar />
        <div className="header-dash-container">
          <div className="dashboard-content main-scroll-area">
            <h1 className="page-title">الرئيسية</h1>
            <div className="dashboard-grid">
              {cardsData.map(({ title, value, trend, colorClass }, i) => (
                <div
                  key={i}
                  className={`card ${colorClass} grid-card card${i + 1}`}
                >
                  <div className="card-row card-row-top">
                    <span className="card-title">{title}</span>
                    <ArrowUpIcon
                      className={`arrow-icon ${colorClass}-arrow-icon`}
                    />
                  </div>
                  <div className="card-row card-row-bottom">
                    <span className="card-value">{value}</span>
                    <span className={`card-trend ${colorClass}-trend`}>
                      <span className="trend-number">
                        {trend}
                        <i className="fa-solid fa-arrow-trend-up"></i>
                      </span>
                      <span className="trend-tail">هذا الشهر</span>
                    </span>
                  </div>
                </div>
              ))}

              <div className="side-box">
                <div className="card red card-waiting grid-card">
                  <div className="card-row card-row-top">
                    <span className="card-title">طلبات قيد الانتظار</span>
                    <Warning className="waening-icon" />
                  </div>
                  <div className="card-row card-row-bottom">
                    <span className="card-value red-value">
                      20<span> طلباً </span>
                    </span>
                    <span className="card-trend red-trend">قيد الانتظار</span>
                  </div>
                </div>

                <div className="chart-card">
                  <div className="card-row card-row-top">
                    <span className="card-title">المبيعات آخر أسبوع</span>
                  </div>
                  <div className="card-row card-row-bottom">
                    <span className="card-value">
                      1.259 <span>منتج مباع</span>
                    </span>
                  </div>
                  <div className="fake-chart">
                    <svg width="100%" height="100%" viewBox="0 0 200 80">
                      {[10, 30, 50, 70, 90, 110, 130, 150].map((x, idx) => (
                        <rect
                          key={idx}
                          x={x}
                          y={idx % 2 === 0 ? 60 - idx * 5 : 50 - idx * 5}
                          width="12"
                          height={20 + idx * 5}
                          rx="3"
                          fill="#00aeef"
                        />
                      ))}
                    </svg>
                  </div>
                </div>
              </div>

              <div className="orders-table-area">
                <div className="new-orders-table-wrapper">
                  <div className="orders-table new-orders-table">
                    <div className="orders-table-header-row">
                      <span className="orders-table-title">
                        طلبات قيد الانتظار
                      </span>
                      <span
                        className="orders-table-view-all"
                        onClick={handleViewAllPendingOrders}
                        style={{ cursor: "pointer" }}
                      >
                        مشاهدة الكل
                        <ArrowUpIcon className="arrow-icon" />
                      </span>
                    </div>
                    <table>
                      <thead>
                        <tr>
                          <th className="id-order">رقم الطلب</th>
                          <th className="name-doctor">اسم الزبون</th>
                          <th className="state-order">الحالة</th>
                          <th className="orders-num">عدد المنتجات</th>
                          <th className="date-time">الوقت والتاريخ</th>
                          <th className="show-more">أزرار الإجراء</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[...Array(8)].map((_, i) => (
                          <tr key={i}>
                            <td className="id-order">59217</td>
                            <td className="name-doctor">د. أحمد الخشي</td>
                            <td className="state-order">
                              <span className="badge waiting ">
                                بانتظار الموافقة من قبلك
                              </span>
                            </td>
                            <td className="orders-num">3</td>
                            <td className="date-time">8:25 PM / 2025-04-01</td>
                            <td>
                              <button className="btn-details show-more">
                                عرض التفاصيل
                              </button>
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
