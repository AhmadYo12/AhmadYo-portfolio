import React, { useState, useEffect } from "react";
import Header from "../components/HeaderDashboard";
import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css"; // Assuming styles are similar or shared
import "../styles/neworder.css";
import { ReactComponent as ToRight } from "../assets/icons/Icon-2.svg"; // سهم لليمين (التالي)
import { ReactComponent as ToLeft } from "../assets/icons/Icon-1.svg"; // سهم لليسار (السابق)
import { ReactComponent as Warning } from "../assets/icons/warning 1.svg";

// Dummy data for new orders
const dummyOrders = [
  {
    id: 59217,
    customerName: "د. أحمد الخشي",
    status: "بانتظار القبول",
    productCount: 3,
    dateTime: "8:25 PM / 2025-04-01",
  },
  {
    id: 59218,
    customerName: "د. أحمد الخشي",
    status: "بانتظار القبول",
    productCount: 3,
    dateTime: "8:25 PM / 2025-04-01",
  },
  {
    id: 59219,
    customerName: "د. أحمد الخشي",
    status: "بانتظار القبول",
    productCount: 3,
    dateTime: "8:25 PM / 2025-04-01",
  },
  {
    id: 59220,
    customerName: "د. أحمد الخشي",
    status: "بانتظار القبول",
    productCount: 3,
    dateTime: "8:25 PM / 2025-04-01",
  },
  {
    id: 59221,
    customerName: "د. أحمد الخشي",
    status: "بانتظار القبول",
    productCount: 3,
    dateTime: "8:25 PM / 2025-04-01",
  },
  {
    id: 59222,
    customerName: "د. أحمد الخشي",
    status: "بانتظار القبول",
    productCount: 3,
    dateTime: "8:25 PM / 2025-04-01",
  },
  {
    id: 59223,
    customerName: "د. أحمد الخشي",
    status: "بانتظار القبول",
    productCount: 3,
    dateTime: "8:25 PM / 2025-04-01",
  },
  {
    id: 59224,
    customerName: "د. أحمد الخشي",
    status: "بانتظار القبول",
    productCount: 3,
    dateTime: "8:25 PM / 2025-04-01",
  },
  {
    id: 59225,
    customerName: "د. أحمد الخشي",
    status: "بانتظار القبول",
    productCount: 3,
    dateTime: "8:25 PM / 2025-04-01",
  },
  {
    id: 59226,
    customerName: "د. أحمد الخشي",
    status: "بانتظار القبول",
    productCount: 3,
    dateTime: "8:25 PM / 2025-04-01",
  },
  {
    id: 59227,
    customerName: "د. أحمد الخشي",
    status: "بانتظار القبول",
    productCount: 3,
    dateTime: "8:25 PM / 2025-04-01",
  },
  {
    id: 59228,
    customerName: "د. أحمد الخشي",
    status: "بانتظار القبول",
    productCount: 3,
    dateTime: "8:25 PM / 2025-04-01",
  },
  {
    id: 21212,
    customerName: "د. أحمد الخشي",
    status: "بانتظار القبول",
    productCount: 3,
    dateTime: "8:25 PM / 2025-04-01",
  },
  {
    id: 212,
    customerName: "د. أحمد الخشي",
    status: "بانتظار القبول",
    productCount: 3,
    dateTime: "8:25 PM / 2025-04-01",
  },
];

function NewOrders() {
  const [orders, setOrders] = useState(dummyOrders);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage, setOrdersPerPage] = useState(8); // Initial value, will be calculated

  // Calculate number of rows per page based on screen height
  useEffect(() => {
    const calculateRows = () => {
      // Adjust these values based on your actual header and row heights
      const headerHeight = 460; // Approximate height of header and card area
      const rowHeight = 60; // Approximate height of a table row
      const availableHeight = window.innerHeight - headerHeight;
      const visibleRows = Math.floor(availableHeight / rowHeight);
      setOrdersPerPage(visibleRows > 0 ? visibleRows : 1);
    };

    calculateRows();
    window.addEventListener("resize", calculateRows);
    return () => window.removeEventListener("resize", calculateRows);
  }, []);

  // Get current orders
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(orders.length / ordersPerPage);

  return (
    <div className="dashboard-container">
      <Header />
      <div className="main-layout">
        <Sidebar />
        <div className="header-dash-container">
          <div className="products-page-container">
            {/* Pending Orders Card */}
            <div className="card red card-waiting grid-card neworder-card ">
              <div className="card-row card-row-bottom card-row-order">
                <Warning className="waening-icon" />
                <span className="card-value red-value red-value-order">
                  20<span> طلباً </span>
                </span>
                <span className="card-trend red-trend">قيد الانتظار</span>
              </div>
            </div>

            <div className="orders-table-area">
              <div className="new-orders-table-wrapper">
                <h1
                  className="page-title"
                  style={{
                    textAlign: "center",
                    marginBottom: "0",
                    marginTop: "10px",
                    fontSize: "26px",
                    fontWeight: "700",
                  }}
                >
                  طلبات جديدة
                </h1>
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
                            <span className={`badge waiting`}>
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

                {/* Pagination */}
                <div className="pagination">
                  <span>
                    الصفحة رقم <span className="first">{currentPage}</span> من{" "}
                    {totalPages} صفحة
                  </span>
                  <div className="pagination-buttons">
                    <button
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      aria-label="الصفحة السابقة"
                    >
                      <ToLeft className="ToLeft-icon" />
                    </button>
                    <button
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      aria-label="الصفحة التالية"
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

export default NewOrders;
