import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./../styles/Products.css";
import "../styles/order.css";
import Header from "../components/HeaderDashboard";
import Sidebar from "../components/Sidebar";
import { ReactComponent as Add } from "../assets/icons/add-1.svg";
import { ReactComponent as Delete } from "../assets/icons/delete-1.svg";
import { ReactComponent as Edit } from "../assets/icons/edit-03.svg";
import { ReactComponent as Star } from "../assets/icons/Vector-1.svg";
import { ReactComponent as ToRight } from "../assets/icons/Icon-2.svg"; // سهم لليمين (التالي)
import { ReactComponent as ToLeft } from "../assets/icons/Icon-1.svg"; // سهم لليسار (السابق)
import { ReactComponent as Filter } from "../assets/icons/filter-list-1.svg";
function Products() {
  // بيانات المنتجات مع تصحيح IDs المكررة
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Hemostal - هيموستال",
      imageUrl: "/path/to/product-image.png",
      price: 20.0,
      quantity: 234,
      status: "متاحة",
      category: "أدوات جراحية",
      company: "شركة الطب الحديث",
      origin: "ألمانيا",
      orderId: "#59217",
    },
    {
      id: 2,
      name: "هيموستال",
      imageUrl: "/path/to/product-image.png",
      price: 18.0,
      quantity: 200,
      status: "متاحة",
      category: "أدوات جراحية",
      company: "شركة الطب الحديث",
      origin: "ألمانيا",
      orderId: "#59218",
    },
    {
      id: 3,
      name: "بطاطا",
      imageUrl: "/path/to/product-image.png",
      price: 22.0,
      quantity: 150,
      status: "مخفية",
      category: "مواد استهلاكية",
      company: "شركة الأسنان المتقدمة",
      origin: "أمريكا",
      orderId: "#59219",
    },
    {
      id: 4,
      name: "بطيخ",
      imageUrl: "/path/to/product-image.png",
      price: 21.5,
      quantity: 170,
      status: "متاحة",
      category: "مواد استهلاكية",
      company: "شركة الأسنان المتقدمة",
      origin: "أمريكا",
      orderId: "#59220",
    },
    {
      id: 5,
      name: "كريسبي",
      imageUrl: "/path/to/product-image.png",
      price: 19.5,
      quantity: 190,
      status: "متاحة",
      category: "أجهزة طبية",
      company: "شركة التقنيات الطبية",
      origin: "اليابان",
      orderId: "#59221",
    },
    {
      id: 6,
      name: "Hemostal - هيموستال",
      imageUrl: "/path/to/product-image.png",
      price: 20.0,
      quantity: 180,
      status: "مخفية",
      category: "أدوات جراحية",
      company: "شركة الطب الحديث",
      origin: "ألمانيا",
      orderId: "#59222",
    },
    {
      id: 7,
      name: "Hemostal - هيموستال",
      imageUrl: "/path/to/product-image.png",
      price: 20.0,
      quantity: 180,
      status: "مخفية",
      category: "أدوات جراحية",
      company: "شركة الطب الحديث",
      origin: "ألمانيا",
      orderId: "#59223",
    },
    {
      id: 8,
      name: "food",
      imageUrl: "/path/to/product-image.png",
      price: 20.0,
      quantity: 180,
      status: "مخفية",
      category: "مواد استهلاكية",
      company: "شركة الغذاء الطبي",
      origin: "فرنسا",
      orderId: "#59224",
    },
    {
      id: 9,
      name: "food",
      imageUrl: "/path/to/product-image.png",
      price: 20.0,
      quantity: 180,
      status: "مخفية",
      category: "مواد استهلاكية",
      company: "شركة الغذاء الطبي",
      origin: "فرنسا",
      orderId: "#59225",
    },
    {
      id: 10,
      name: "food",
      imageUrl: "/path/to/product-image.png",
      price: 20.0,
      quantity: 180,
      status: "مخفية",
      category: "مواد استهلاكية",
      company: "شركة الغذاء الطبي",
      origin: "فرنسا",
      orderId: "#59226",
    },
    {
      id: 11,
      name: "food",
      imageUrl: "/path/to/product-image.png",
      price: 20.0,
      quantity: 180,
      status: "مخفية",
      category: "مواد استهلاكية",
      company: "شركة الغذاء الطبي",
      origin: "فرنسا",
      orderId: "#59227",
    },
    {
      id: 12,
      name: "food",
      imageUrl: "/path/to/product-image.png",
      price: 20.0,
      quantity: 180,
      status: "مخفية",
      category: "مواد استهلاكية",
      company: "شركة الغذاء الطبي",
      origin: "فرنسا",
      orderId: "#59228",
    },
  ]);

  const [originalProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(5);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filterData, setFilterData] = useState({
    productName: "",
    priceRange: "",
    category: "",
    company: "",
    origin: "",
    statuses: []
  });
  const [showHint, setShowHint] = useState(true);

  // تصفية المنتجات حسب البحث
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ضبط عدد المنتجات المعروضة حسب ارتفاع الشاشة
  useEffect(() => {
    const calculateRows = () => {
      const headerHeight = 280;
      const rowHeight = 85;
      const paginationHeight = 60;
      const availableHeight = window.innerHeight - headerHeight - paginationHeight;
      const visibleRows = Math.floor(availableHeight / rowHeight);
      const newRowsPerPage = Math.max(visibleRows, 3);
      setProductsPerPage(newRowsPerPage);
      
      // إعادة تعيين الصفحة الحالية إذا تجاوزت العدد الجديد
      const newTotalPages = Math.ceil(filteredProducts.length / newRowsPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }
    };

    calculateRows();
    window.addEventListener("resize", calculateRows);
    return () => window.removeEventListener("resize", calculateRows);
  }, [filteredProducts.length, currentPage]);

  // حساب المنتجات التي يجب عرضها في الصفحة الحالية
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // التنقل بين الصفحات
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
    let filtered = [...originalProducts];
    
    if (filterData.productName) {
      filtered = filtered.filter(product => product.name === filterData.productName);
    }
    
    if (filterData.priceRange) {
      const [min, max] = filterData.priceRange.includes('+') 
        ? [50, Infinity] 
        : filterData.priceRange.split('-').map(Number);
      filtered = filtered.filter(product => 
        product.price >= min && (max === Infinity || product.price <= max)
      );
    }
    
    if (filterData.category) {
      filtered = filtered.filter(product => product.category === filterData.category);
    }
    
    if (filterData.company) {
      filtered = filtered.filter(product => product.company === filterData.company);
    }
    
    if (filterData.origin) {
      filtered = filtered.filter(product => product.origin === filterData.origin);
    }
    
    if (filterData.statuses.length > 0) {
      filtered = filtered.filter(product => filterData.statuses.includes(product.status));
    }
    
    setProducts(filtered);
    setCurrentPage(1);
    setShowFilterModal(false);
  };

  const clearFilter = () => {
    setFilterData({
      productName: "",
      priceRange: "",
      category: "",
      company: "",
      origin: "",
      statuses: []
    });
    setProducts(originalProducts);
    setCurrentPage(1);
  };

  return (
    <div className="dashboard-container">
      <Header />
      <div className="main-layout">
        <Sidebar />
        <div className="header-dash-container">
          <div className="products-page-container">
            <h1 className="page-title">المنتجات</h1>

            <div className="orders-table-area">
              <div className="new-orders-table-wrapper">
                {/* Header Actions */}
                <div className="products-header">
                  <div className="header-actions">
                    <div className="search-bar">
                      <input
                        type="text"
                        placeholder="البحث عن منتج"
                        value={searchTerm}
                        onChange={(e) => {
                          setSearchTerm(e.target.value);
                          setCurrentPage(1);
                        }}
                      />
                      <i className="fa-solid fa-search search-icon"></i>
                    </div>
                    <div className="left-buttons">
                      <button className="btn-filter bt-filter" onClick={() => setShowFilterModal(true)}>
                        تصفية <Filter className="filter-icon" />
                      </button>
                      <Link to="/dashboard/add-products" className="btn btn-add-product">
                        إضافة منتج جديد <Add className="add-icon" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Products Table */}
                <div className="products-table">
                  <table>
                    <thead>
                      <tr>
                        <th>المنتج</th>
                        <th>السعر</th>
                        <th>الصنف</th>
                        <th>الشركة</th>
                        <th>بلد المنشأ</th>
                        <th>الحالة</th>
                        <th>الخيارات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentProducts.map((product) => (
                        <tr key={product.id}>
                          <td>
                            <div className="product-cell">
                              <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="product-image"
                              />
                              <span className="idname">
                                <span className="id-product">
                                  {product.orderId}
                                </span>
                                <span className="name-product">
                                  {product.name}
                                </span>
                              </span>
                            </div>
                          </td>
                          <td className="price">${product.price.toFixed(2)}</td>
                          <td className="category">{product.category}</td>
                          <td className="company">{product.company}</td>
                          <td className="origin">{product.origin}</td>
                          <td>
                            <span
                              className={`badge ${
                                product.status === "متاحة"
                                  ? "available"
                                    : "waiting"
                              }`}
                            >
                              {product.status === "متاحة" ? "ظاهر" : "مخفي"}
                            </span>
                          </td>
                          <td>
                            <div className="action-buttons">
                              <button className="btn-action btn-edit">
                                تعديل <Edit className="edit-icon" />
                              </button>
                              <button className="btn-action btn-delete">
                                حذف <Delete className="delete-icon" />
                              </button>
                            </div>
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
                <label>المنتج</label>
                <select 
                  value={filterData.productName} 
                  onChange={(e) => handleFilterChange('productName', e.target.value)}
                >
                  <option value="">اختر المنتج</option>
                  {[...new Set(originalProducts.map(product => product.name))].map(name => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
              </div>
              
              <div className="filter-field">
                <label>السعر</label>
                <select 
                  value={filterData.priceRange} 
                  onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                >
                  <option value="">نطاق السعر</option>
                  <option value="0-10">$0 - $10</option>
                  <option value="10-20">$10 - $20</option>
                  <option value="20-50">$20 - $50</option>
                  <option value="50+">$50+</option>
                </select>
              </div>
              
              <div className="filter-field">
                <label>الصنف</label>
                <select 
                  value={filterData.category} 
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                >
                  <option value="">اختر الصنف</option>
                  {[...new Set(originalProducts.map(product => product.category))].map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div className="filter-field">
                <label>الشركة</label>
                <select 
                  value={filterData.company} 
                  onChange={(e) => handleFilterChange('company', e.target.value)}
                >
                  <option value="">اختر الشركة</option>
                  {[...new Set(originalProducts.map(product => product.company))].map(company => (
                    <option key={company} value={company}>{company}</option>
                  ))}
                </select>
              </div>
              
              <div className="filter-field">
                <label>بلد المنشأ</label>
                <select 
                  value={filterData.origin} 
                  onChange={(e) => handleFilterChange('origin', e.target.value)}
                >
                  <option value="">اختر بلد المنشأ</option>
                  {[...new Set(originalProducts.map(product => product.origin))].map(origin => (
                    <option key={origin} value={origin}>{origin}</option>
                  ))}
                </select>
              </div>
              
              <div className="filter-field">
                <label>حالة المتنج في المتجر</label>
                <div className="status-grid">
                  <div 
                    className={`status-item available ${filterData.statuses.includes('متاحة') ? 'selected' : ''}`}
                    onClick={() => handleStatusToggle('متاحة')}
                  >
                    <input 
                      type="checkbox" 
                      checked={filterData.statuses.includes('متاحة')}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleStatusToggle('متاحة');
                      }}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <span>ظاهر</span>
                  </div>
                  <div 
                    className={`status-item waiting ${filterData.statuses.includes('مخفية') ? 'selected' : ''}`}
                    onClick={() => handleStatusToggle('مخفية')}
                  >
                    <input 
                      type="checkbox" 
                      checked={filterData.statuses.includes('مخفية')}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleStatusToggle('مخفية');
                      }}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <span>مخفي</span>
                  </div>
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
    </div>
  );
}

export default Products;
