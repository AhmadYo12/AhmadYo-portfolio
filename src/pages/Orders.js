import React, { useState, useEffect } from "react";
import Header from "../components/HeaderDashboard";
import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";
import "../styles/Products.css";
import "../styles/order.css";
import { ReactComponent as ToRight } from "../assets/icons/Icon-2.svg";
import { ReactComponent as ToLeft } from "../assets/icons/Icon-1.svg";
import { ReactComponent as Filter } from "../assets/icons/filter-list-1.svg";

const dummyOrders = [
  {
    id: 557,
    customerName: "د. أحمد الخشي",
    status: "قيد التوصيل",
    productCount: 3,
    dateTime: "8:25 PM / 2025-04-10",
  },
  {
    id: 57,
    customerName: "د. أحمد الخشي",
    status: "يرجى تجهيز الطلب",
    productCount: 3,
    dateTime: "8:25 PM / 2025-04-10",
  },

  {
    id: 59218,
    customerName: "د. أحمد الخشي",
    status: "جاري البحث عن مراسل",
    productCount: 3,
    dateTime: "8:25 PM / 2025-04-10",
  },
  {
    id: 59219,
    customerName: "د. أحمد الخشي",
    status: "بانتظار الموافقة من قبلك",
    productCount: 3,
    dateTime: "8:25 PM / 2025-04-10",
  },
  {
    id: 59220,
    customerName: "د. أحمد الخشي",
    status: "جاري المعالجة",
    productCount: 3,
    dateTime: "8:25 PM / 2025-04-10",
  },
  {
    id: 557,
    customerName: "د. أحمد الخشي",
    status: "قيد التوصيل",
    productCount: 3,
    dateTime: "8:25 PM / 2025-04-10",
  },
  {
    id: 57,
    customerName: "د. أحمد الخشي",
    status: "يرجى تجهيز الطلب",
    productCount: 3,
    dateTime: "8:25 PM / 2025-04-10",
  },

  {
    id: 59218,
    customerName: "د. أحمد الخشي",
    status: "جاري البحث عن مراسل",
    productCount: 3,
    dateTime: "8:25 PM / 2025-04-10",
  },
  {
    id: 59219,
    customerName: "د. أحمد الخشي",
    status: "بانتظار الموافقة من قبلك",
    productCount: 3,
    dateTime: "8:25 PM / 2025-04-10",
  },
  {
    id: 59220,
    customerName: "د. أحمد الخشي",
    status: "جاري المعالجة",
    productCount: 3,
    dateTime: "8:25 PM / 2025-04-10",
  },
  {
    id: 557,
    customerName: "د. أحمد الخشي",
    status: "قيد التوصيل",
    productCount: 3,
    dateTime: "8:25 PM / 2025-04-10",
  },
  {
    id: 57,
    customerName: "د. أحمد الخشي",
    status: "يرجى تجهيز الطلب",
    productCount: 3,
    dateTime: "8:25 PM / 2025-04-10",
  },

  {
    id: 520,
    customerName: "د. أحمد الخشي",
    status: "جاري المعالجة",
    productCount: 3,
    dateTime: "8:25 PM / 2025-04-10",
  },
  {
    id: 598,
    customerName: "د. أحمد الخشي",
    status: "جاري البحث عن مراسل",
    productCount: 3,
    dateTime: "8:25 PM / 2025-04-10",
  },
  {
    id: 519,
    customerName: "د. أحمد الخشي",
    status: "بانتظار الموافقة من قبلك",
    productCount: 3,
    dateTime: "8:25 PM / 2025-04-10",
  },
  {
    id: 592,
    customerName: "د. أحمد الخشي",
    status: "جاري المعالجة",
    productCount: 3,
    dateTime: "8:25 PM / 2025-04-10",
  },
];

function Orders() {
  const [orders, setOrders] = useState(dummyOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage, setOrdersPerPage] = useState(8);

  useEffect(() => {
    const calculateRows = () => {
      const headerHeight = 380;
      const rowHeight = 60;
      const availableHeight = window.innerHeight - headerHeight;
      const visibleRows = Math.floor(availableHeight / rowHeight);
      setOrdersPerPage(visibleRows > 0 ? visibleRows : 1);
    };

    calculateRows();
    window.addEventListener("resize", calculateRows);
    return () => window.removeEventListener("resize", calculateRows);
  }, []);

  const filteredOrders = orders.filter((order) =>
    Object.values(order).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getBadgeClass = (status) => {
    switch (status) {
      case "بانتظار الموافقة من قبلك":
        return "awaiting-approval";
      case "جاري المعالجة":
        return "processing";
      case "جاري البحث عن مراسل":
        return "searching-courier";
      case "يرجى تجهيز الطلب":
        return "preparing";
      case "قيد التوصيل":
        return "in-transit";
      default:
        return "waiting";
    }
  };

  return (
    <div className="dashboard-container">
      <Header />
      <div className="main-layout">
        <Sidebar />
        <div className="header-dash-container">
          <div className="products-page-container">
            <h1 className="page-title"> سجل الطلبات الحالية</h1>
            <div className="orders-table-area">
              <div className="new-orders-table-wrapper">
                <div className="products-header">
                  <div className="header-actions">
                    <div className="search-bar">
                      <input
                        type="text"
                        placeholder=" البحث عن طريق رقم طلب"
                        value={searchTerm}
                        onChange={(e) => {
                          setSearchTerm(e.target.value);
                          setCurrentPage(1);
                        }}
                      />
                      <i className="fa-solid fa-search search-icon"></i>
                    </div>
                    <button className="btn-filter">
                      تصفية <Filter className="filter-icon" />
                    </button>
                  </div>
                </div>

                <div className="orders-table new-orders-table">
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
                      {currentOrders.map((order) => (
                        <tr key={order.id}>
                          <td className="id-order">{order.id}</td>
                          <td className="name-doctor">{order.customerName}</td>
                          <td className="state-order">
                            <span
                              className={`badge ${getBadgeClass(order.status)}`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="orders-num">{order.productCount}</td>
                          <td className="date-time">{order.dateTime}</td>
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

                <div className="pagination">
                  <span>
                    الصفحة رقم <span className="first">{currentPage}</span> من{" "}
                    {totalPages} صفحة
                  </span>
                  <div className="pagination-buttons">
                    <button
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <ToLeft className="ToLeft-icon" />
                    </button>
                    <button
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      <ToRight className="ToRight-icon" />
                    </button>
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

export default Orders;
