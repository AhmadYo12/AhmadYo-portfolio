import React, { useState } from "react";
import "./../styles/Products.css";
import { Link } from "react-router-dom";

import Header from "../components/HeaderDashboard";
import Sidebar from "../components/Sidebar";

function Products() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "هيموستال",
      imageUrl: "/path/to/product-image.png",
      price: 20.0,
      quantity: 234,
      status: "متاحة",
      rating: 4.0,
      reviews: 1031,
      orderId: "#59217",
    },
    {
      id: 2,
      name: "هيموستال",
      imageUrl: "/path/to/product-image.png",
      price: 20.0,
      quantity: 234,
      status: "مخفية",
      rating: 4.0,
      reviews: 1031,
      orderId: "#59217",
    },
    {
      id: 3,
      name: "هيموستال",
      imageUrl: "/path/to/product-image.png",
      price: 20.0,
      quantity: 234,
      status: "متاحة",
      rating: 4.0,
      reviews: 1031,
      orderId: "#59217",
    },
    {
      id: 4,
      name: "هيموستال",
      imageUrl: "/path/to/product-image.png",
      price: 20.0,
      quantity: 234,
      status: "مخفية",
      rating: 4.0,
      reviews: 1031,
      orderId: "#59217",
    },
    {
      id: 5,
      name: "هيموستال",
      imageUrl: "/path/to/product-image.png",
      price: 20.0,
      quantity: 234,
      status: "متاحة",
      rating: 4.0,
      reviews: 1031,
      orderId: "#59217",
    },
    {
      id: 6,
      name: "هيموستال",
      imageUrl: "/path/to/product-image.png",
      price: 20.0,
      quantity: 234,
      status: "مخفية",
      rating: 4.0,
      reviews: 1031,
      orderId: "#59217",
    },
    {
      id: 7,
      name: "هيموستال",
      imageUrl: "/path/to/product-image.png",
      price: 20.0,
      quantity: 234,
      status: "متاحة",
      rating: 4.0,
      reviews: 1031,
      orderId: "#59217",
    },
    {
      id: 8,
      name: "هيموستال",
      imageUrl: "/path/to/product-image.png",
      price: 20.0,
      quantity: 234,
      status: "مخفية",
      rating: 4.0,
      reviews: 1031,
      orderId: "#59217",
    },
    {
      id: 9,
      name: "هيموستال",
      imageUrl: "/path/to/product-image.png",
      price: 20.0,
      quantity: 234,
      status: "متاحة",
      rating: 4.0,
      reviews: 1031,
      orderId: "#59217",
    },
  ]);

  // حالة للبحث والتصفية والترقيم
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8; // عدد المنتجات في الصفحة

  // منطق البحث والتصفية (يمكن تطويره لاحقاً)
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // منطق الترقيم
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="dashboard-container">
      <Header />
      <div className="main-layout">
        <Sidebar />
        <div className="header-dash-container">
          <div className="products-page-container">
            {/* رأس الصفحة وأدوات التحكم */}
            <div className="products-header">
              <h1 className="page-title">المنتجات</h1>
              <div className="header-actions">
                <button className="btn btn-add-product">
                  + إضافة منتج جديد
                </button>
                <button className="btn btn-filter">
                  تصفية <i className="fa-solid fa-filter"></i>
                </button>
                <div className="search-bar">
                  <input
                    type="text"
                    placeholder="بحث عن منتج"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <i className="fa-solid fa-search search-icon"></i>
                </div>
              </div>
            </div>

            {/* جدول المنتجات */}
            <div className="orders-table-area">
              <div className="new-orders-table-wrapper">
                <div className="orders-table new-orders-table">
                  <table>
                    <thead>
                      <tr>
                        <th>
                          <input type="checkbox" />
                        </th>{" "}
                        {/* تحديد الكل */}
                        <th>المنتج</th>
                        <th>السعر</th>
                        <th>الكمية</th>
                        <th>الحالة</th>
                        <th>التقييم</th>
                        <th>أزرار الإجراء</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentProducts.map((product) => (
                        <tr key={product.id}>
                          <td>
                            <input type="checkbox" />
                          </td>
                          <td>
                            <div className="product-cell">
                              <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="product-image"
                              />
                              <span>
                                {product.orderId} - {product.name}
                              </span>
                            </div>
                          </td>
                          <td>${product.price.toFixed(2)}</td>
                          <td>{product.quantity}</td>
                          <td>
                            <span
                              className={`badge ${
                                product.status === "متاحة"
                                  ? "available"
                                  : "hidden"
                              }`}
                            >
                              {product.status}
                            </span>
                          </td>
                          <td>
                            <div className="rating">
                              <i className="fa-solid fa-star star-icon"></i>{" "}
                              {product.rating} ({product.reviews})
                            </div>
                          </td>
                          <td>
                            <div className="action-buttons">
                              <button className="btn-action btn-edit">
                                تعديل <i className="fa-solid fa-pencil"></i>
                              </button>
                              <button className="btn-action btn-delete">
                                حذف <i className="fa-solid fa-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* الترقيم (Pagination) */}
            <div className="pagination">
              <span>
                الصفحة رقم {currentPage} من {totalPages} صفحة
              </span>
              <div className="pagination-buttons">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  &lt;
                </button>
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  &gt;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
