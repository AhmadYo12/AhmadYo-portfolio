import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/HeaderDashboard";
import Sidebar from "../../components/Sidebar";
import "../../styles/dashboard.css";
import "./AddProducts.css";
import { ReactComponent as Image } from "../../assets/icons/image.svg";
function AddProducts() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    productName: "",
    productNameAlt: "",
    description: "",
    category: "",
    manufacturer: "",
    price: "",
    isVisible: true,
  });
  const [productImages, setProductImages] = useState([
    null,
    null,
    null,
    null,
    null,
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (index, file) => {
    if (file && file.size <= 4 * 1024 * 1024) {
      const newImages = [...productImages];
      newImages[index] = file;
      setProductImages(newImages);
    }
  };

  const removeImage = (index) => {
    const newImages = [...productImages];
    newImages[index] = null;
    setProductImages(newImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // هنا بتضيف منطق إرسال البيانات للـ API
    setTimeout(() => {
      setIsSubmitting(false);
      navigate("/dashboard/products");
    }, 2000);
  };

  return (
    <div className="dashboard-container">
      <Header />
      <div className="main-layout">
        <Sidebar />
        <div className="header-dash-container">
          <div className="products-page-container">
            <div className="page-header">
              <h1 className="page-title">إضافة منتج جديد</h1>
              <div className="breadcrumbs">
                <Link to="/dashboard/products" className="breadcrumb-link">
                  المنتجات
                </Link>
                <span className="breadcrumb-separator">←</span>
                <span className="breadcrumb-current">إضافة منتج</span>
              </div>
            </div>

            <div className="orders-table-area">
              <div className="new-orders-table-wrapper">
                <form onSubmit={handleSubmit} className="add-product-form">
                  <div className="form-panel">
                    <h2 className="panel-title">معلومات المنتج</h2>

                    <div className="form-row">
                      <div className="form-field">
                        <label>اسم المنتج</label>
                        <input
                          type="text"
                          name="productName"
                          value={formData.productName}
                          onChange={handleInputChange}
                          placeholder="ادخل اسم المنتج"
                          required
                        />
                      </div>
                      <div className="form-field">
                        <label>الصنف</label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">اختر الصنف</option>
                          <option value="dental">أدوات طبية</option>
                          <option value="equipment">معدات</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-field">
                      <label>وصف المنتج</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="ادخل وصف المنتج"
                        maxLength={800}
                      />
                      <div className="char-counter">
                        800/{formData.description.length} حرف
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-field">
                        <label>الشركة المصنعة</label>
                        <select
                          name="manufacturer"
                          value={formData.manufacturer}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">اختر الشركة المصنعة</option>
                          <option value="chinese">شركة صينية</option>
                          <option value="japanese">شركة يابانية</option>
                          <option value="german">شركة ألمانية</option>
                          <option value="american">شركة أمريكية</option>
                          <option value="korean">شركة كورية</option>
                        </select>
                      </div>
                      <div className="form-field price-field">
                        <label>سعر المنتج</label>
                        <div className="price-input-container">
                          <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            placeholder="ادخل سعر المنتج بالدولار"
                            min="0"
                            step="0.01"
                            required
                          />
                          <span className="currency-icon">$</span>
                        </div>
                      </div>
                    </div>

                    <div className="form-field">
                      <label>حالة ظهور المنتج في المتجر:</label>
                      <div className="toggle-switch">
                        <input
                          type="checkbox"
                          id="visibility"
                          checked={formData.isVisible}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              isVisible: e.target.checked,
                            }))
                          }
                        />
                        <label
                          htmlFor="visibility"
                          className="toggle-label"
                        ></label>
                      </div>
                    </div>
                  </div>

                  <div className="form-panel">
                    <h2 className="panel-title">صور المنتج</h2>
                    <p className="image-note">
                      <span>ملاحظة:</span> أقصى حجم للصورة 4 ميغا بايت فقط .
                    </p>

                    <div className="images-grid">
                      {productImages.map((image, index) => (
                        <div key={index} className="image-upload-box">
                          {image ? (
                            <div className="uploaded-image">
                              <img
                                src={URL.createObjectURL(image)}
                                alt={`صورة ${index + 1}`}
                              />
                              <button
                                type="button"
                                className="remove-image"
                                onClick={() => removeImage(index)}
                              >
                                ×
                              </button>
                            </div>
                          ) : (
                            <label className="upload-placeholder">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                  handleImageUpload(index, e.target.files[0])
                                }
                                hidden
                              />
                              <div className="upload-content">
                                <Image className="image-icon" />
                                <span>الصورة {index + 1}</span>
                              </div>
                            </label>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "جاري الإضافة..." : "إضافة المنتج"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProducts;
