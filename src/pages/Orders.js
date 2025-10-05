import React, { useState, useEffect } from "react";
import Header from "../components/HeaderDashboard";
import Sidebar from "../components/Sidebar";
import DatePicker from "../components/DatePicker";
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
  const [originalOrders] = useState(dummyOrders);
  const [orders, setOrders] = useState(dummyOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage, setOrdersPerPage] = useState(8);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [filterData, setFilterData] = useState({
    orderId: "",
    customerName: "",
    date: "",
    dateRange: "",
    statuses: []
  });
  const [showHint, setShowHint] = useState(true);

  const filteredOrders = orders.filter((order) =>
    Object.values(order).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // استخدام البيانات الأصلية للتصفية المتقدمة
  const getFilteredData = () => {
    if (!searchTerm) return orders;
    return orders.filter((order) =>
      Object.values(order).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  useEffect(() => {
    const calculateRows = () => {
      const headerHeight = 400;
      const rowHeight = 55;
      const paginationHeight = 60;
      const availableHeight = window.innerHeight - headerHeight - paginationHeight;
      const visibleRows = Math.floor(availableHeight / rowHeight);
      const newRowsPerPage = Math.max(visibleRows, 5);
      setOrdersPerPage(newRowsPerPage);
      
      const newTotalPages = Math.ceil(getFilteredData().length / newRowsPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }
    };

    calculateRows();
    window.addEventListener("resize", calculateRows);
    return () => window.removeEventListener("resize", calculateRows);
  }, [filteredOrders.length, currentPage]);

  const finalFilteredOrders = getFilteredData();
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = finalFilteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );
  const totalPages = Math.ceil(finalFilteredOrders.length / ordersPerPage);

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

  const handleFilterChange = (field, value) => {
    setFilterData(prev => ({ ...prev, [field]: value }));
    setShowHint(false);
  };

  const handleStatusToggle = (status) => {
    setFilterData(prev => ({
      ...prev,
      statuses: prev.statuses.includes(status)
        ? prev.statuses.filter(s => s !== status)
        : [...prev.statuses, status]
    }));
    setShowHint(false);
  };

  const applyFilter = () => {
    let filtered = [...originalOrders];
    
    if (filterData.orderId) {
      filtered = filtered.filter(order => order.id.toString() === filterData.orderId.toString());
    }
    
    if (filterData.customerName) {
      filtered = filtered.filter(order => order.customerName === filterData.customerName);
    }
    
    if (filterData.statuses.length > 0) {
      filtered = filtered.filter(order => filterData.statuses.includes(order.status));
    }
    
    setOrders(filtered);
    setCurrentPage(1);
    setShowFilterModal(false);
  };

  const clearFilter = () => {
    setFilterData({
      orderId: "",
      customerName: "",
      date: "",
      dateRange: "",
      statuses: []
    });
    setOrders(originalOrders);
    setCurrentPage(1);
  };

  const handleDateApply = (selectedDate, selectedRange) => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1;
    const day = selectedDate.getDate();
    const formattedDate = `${year}/${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}`;
    
    setFilterData(prev => ({
      ...prev,
      date: selectedDate.toISOString().split('T')[0],
      dateRange: selectedRange === 'مخصص' ? formattedDate : selectedRange
    }));
    setShowHint(false);
  };

  const statusOptions = [
    { value: "يرجى تجهيز الطلب", class: "preparing" },
    { value: "جاري البحث عن مراسل", class: "searching-courier" },
    { value: "بانتظار الموافقة من قبلك", class: "awaiting-approval" },
    { value: "جاري المعالجة", class: "processing" },
    { value: "قيد التوصيل", class: "in-transit" }
  ];

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
                    <button className="btn-filter" onClick={() => setShowFilterModal(true)}>
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
                        <th className="show-more">الخيارات</th>
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
      
      {showFilterModal && (
        <div className="filter-modal-overlay" onClick={() => setShowFilterModal(false)}>
          <div className="filter-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="filter-modal-header">
              <h2 className="filter-modal-title">التصفية</h2>
              <button className="filter-modal-close" onClick={() => setShowFilterModal(false)}>
                <i className="fa fa-times"></i>
              </button>
            </div>
            
            <div className="filter-modal-body">
              {showHint && (
                <div className="filter-hint">
                  <i className="fa fa-lightbulb"></i>
                  <span>اختر حقلاً واحداً على الأقل</span>
                </div>
              )}
              
              <div className="filter-field">
                <label>رقم الطلب</label>
                <select 
                  value={filterData.orderId} 
                  onChange={(e) => handleFilterChange('orderId', e.target.value)}
                >
                  <option value="">رقم الطلب</option>
                  {[...new Set(orders.map(order => order.id))].map(id => (
                    <option key={id} value={id}>{id}</option>
                  ))}
                </select>
              </div>
              
              <div className="filter-field">
                <label>اسم الزبون</label>
                <select 
                  value={filterData.customerName} 
                  onChange={(e) => handleFilterChange('customerName', e.target.value)}
                >
                  <option value="">اسم الزبون</option>
                  {[...new Set(orders.map(order => order.customerName))].map(name => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
              </div>
              
              <div className="filter-field">
                <label>التاريخ</label>
                <div className="date-input-wrapper">
                  <input 
                    type="text" 
                    value={filterData.dateRange || filterData.date}
                    placeholder="اختر التاريخ"
                    readOnly
                    onClick={() => setShowDatePicker(true)}
                  />
                </div>
              </div>
              
              <div className="filter-field">
                <label>حالة الطلب</label>
                <div className="status-grid">
                  {statusOptions.map((status) => (
                    <div 
                      key={status.value}
                      className={`status-item ${status.class} ${filterData.statuses.includes(status.value) ? 'selected' : ''}`}
                      onClick={() => handleStatusToggle(status.value)}
                    >
                      <input 
                        type="checkbox" 
                        checked={filterData.statuses.includes(status.value)}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleStatusToggle(status.value);
                        }}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <span>{status.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="filter-modal-footer">
              <button className="filter-btn-primary" onClick={applyFilter}>
                تطبيق التصفية
              </button>
              <button className="filter-btn-secondary" onClick={clearFilter}>
                مسح الكل
              </button>
            </div>
          </div>
        </div>
      )}
      
      <DatePicker
        isOpen={showDatePicker}
        onClose={() => setShowDatePicker(false)}
        onApply={handleDateApply}
        initialDate={filterData.date}
      />
    </div>
  );
}

export default Orders;
