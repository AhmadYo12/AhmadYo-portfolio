import React, { useState, useRef, useEffect } from "react";
import "./../styles/Products.css";
import Header from "../components/HeaderDashboard";
import Sidebar from "../components/Sidebar";
import { ReactComponent as Add } from "../assets/icons/add-1.svg";
import { ReactComponent as Delete } from "../assets/icons/delete-1.svg";
import { ReactComponent as Edit } from "../assets/icons/edit-03.svg";
import { ReactComponent as Star } from "../assets/icons/Vector-1.svg";
import { ReactComponent as ToRight } from "../assets/icons/Icon-1.svg";
import { ReactComponent as ToLeft } from "../assets/icons/Icon-2.svg";
function Products() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Hemostal - هيموستال",
      imageUrl: "/path/to/product-image.png",
      price: 20.0,
      quantity: 234,
      status: "متاحة",
      rating: 4.3,
      reviews: 1031,
      orderId: "#59217",
    },
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
      id: 1,
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
      id: 1,
      name: "Hemostal-هيموستال",
      imageUrl: "/path/to/product-image.png",
      price: 20.0,
      quantity: 234,
      status: "متاحة",
      rating: 4.0,
      reviews: 1031,
      orderId: "#59217",
    },
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
      id: 1,
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
      id: 1,
      name: "Hemostal-هيموستال",
      imageUrl: "/path/to/product-image.png",
      price: 20.0,
      quantity: 234,
      status: "متاحة",
      rating: 4.5,
      reviews: 1031,
      orderId: "#59217",
    },
    {
      id: 1,
      name: "Hemostal-هيموستال",
      imageUrl: "/path/to/product-image.png",
      price: 20.0,
      quantity: 234,
      status: "متاحة",
      rating: 4.0,
      reviews: 1031,
      orderId: "#59217",
    },
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

    // ... نسخ أخرى من نفس المنتج لتجربة الترقيم
    // يمكنك تكرار أو توليد المزيد
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(8);
  const tableWrapperRef = useRef(null);

  // حساب عدد المنتجات الظاهرة حسب ارتفاع الصفحة
  useEffect(() => {
    const calculateVisibleRows = () => {
      if (!tableWrapperRef.current) return;

      const wrapperHeight = tableWrapperRef.current.offsetHeight;
      const rowHeight = 60; // تقدير ارتفاع كل صف
      const maxRows = Math.floor(wrapperHeight / rowHeight);
      setProductsPerPage(maxRows);
    };

    calculateVisibleRows();

    const resizeObserver = new ResizeObserver(calculateVisibleRows);
    resizeObserver.observe(document.body);

    return () => resizeObserver.disconnect();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <h1 className="page-title">المنتجات</h1>
            <div className="orders-table-area">
              <div className="new-orders-table-wrapper">
                <div className="products-header">
                  <div className="header-actions">
                    <div className="search-bar">
                      <input
                        type="text"
                        placeholder="البحث عن منتج"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <i className="fa-solid fa-search search-icon"></i>
                    </div>
                    <button className="btn btn-add-product">
                      إضافة منتج جديد <Add className="add-icon" />
                    </button>
                  </div>
                </div>
                <div
                  className="orders-table new-orders-table"
                  ref={tableWrapperRef}
                >
                  <table>
                    <thead>
                      <tr>
                        <th>المنتج</th>
                        <th>السعر</th>
                        <th>الحالة</th>
                        <th>التقييم</th>
                        <th>أزرار الإجراء</th>
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
                              <span className="reviews">
                                {" "}
                                ({product.reviews}){" "}
                              </span>
                              <span className="num"> {product.rating}</span>
                              <Star className="star-icon" />
                            </div>
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
                      <ToRight className="ToRight-icon" />
                    </button>
                    <button
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      <ToLeft className="ToLeft-icon" />
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

export default Products;
