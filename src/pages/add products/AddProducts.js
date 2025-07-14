import { useState, useEffect } from "react";
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
    description: "",
    category: "",
    manufacturer: "",
    price: "",
    country: "",
    isVisible: true,
  });
  const [productImage, setProductImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [manufacturers, setManufacturers] = useState([
    "شركة صينية",
    "شركة يابانية",
    "شركة ألمانية",
    "شركة أمريكية",
    "شركة كورية"
  ]);
  const [showManufacturerDropdown, setShowManufacturerDropdown] = useState(false);
  const [newManufacturer, setNewManufacturer] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleManufacturerSelect = (manufacturer) => {
    setFormData((prev) => ({ ...prev, manufacturer }));
    setShowManufacturerDropdown(false);
    setNewManufacturer("");
  };

  const handleAddNewManufacturer = () => {
    if (newManufacturer.trim() && !manufacturers.includes(newManufacturer.trim())) {
      const updatedManufacturers = [...manufacturers, newManufacturer.trim()];
      setManufacturers(updatedManufacturers);
      setFormData((prev) => ({ ...prev, manufacturer: newManufacturer.trim() }));
      setNewManufacturer("");
      setShowManufacturerDropdown(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.custom-select-container')) {
        setShowManufacturerDropdown(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleImageUpload = (file) => {
    if (file && file.size <= 4 * 1024 * 1024) {
      setProductImage(file);
    }
  };

  const removeImage = () => {
    setProductImage(null);
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

          
            
                <form onSubmit={handleSubmit} className="add-product-form">
                  <div className="form-grid">
            
                    <div className="form-panel info-panel">
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
                          {formData.description.length}/800 حرف
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-field">
                          <label>الشركة المصنعة</label>
                          <div className="custom-select-container">
                            <div 
                              className="custom-select"
                              onClick={() => setShowManufacturerDropdown(!showManufacturerDropdown)}
                            >
                              <span>{formData.manufacturer || "اختر الشركة المصنعة"}</span>
                              <i className={`fa fa-chevron-${showManufacturerDropdown ? 'up' : 'down'}`}></i>
                            </div>
                            {showManufacturerDropdown && (
                              <div className="dropdown-menu">
                                {manufacturers.map((manufacturer, index) => (
                                  <div 
                                    key={index}
                                    className="dropdown-item"
                                    onClick={() => handleManufacturerSelect(manufacturer)}
                                  >
                                    {manufacturer}
                                  </div>
                                ))}
                                <div className="add-new-item">
                                  <input
                                    type="text"
                                    value={newManufacturer}
                                    onChange={(e) => setNewManufacturer(e.target.value)}
                                    placeholder="إضافة شركة جديدة"
                                    onKeyPress={(e) => e.key === 'Enter' && handleAddNewManufacturer()}
                                  />
                                  <button 
                                    type="button"
                                    onClick={handleAddNewManufacturer}
                                    className="add-btn"
                                  >
                                    إضافة
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="form-field">
                          <label>بلد المنشأ</label>
                          <select
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            required
                          >
                            <option value="">اختر بلد المنشأ</option>
                            <option value="china">الصين</option>
                            <option value="japan">اليابان</option>
                            <option value="germany">ألمانيا</option>
                            <option value="usa">أمريكا</option>
                            <option value="korea">كوريا</option>
                          </select>
                        </div>
                      </div>

                      <div className="form-row price-visibility-row">
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
                        <div className="form-field">
                          <label>حالة ظهور المنتج</label>
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
                    </div>

        
                    <div className="right-column">
                      <div className="form-panel image-panel">
                        <h2 className="panel-title">صورة المنتج</h2>
                        <p className="image-note">
                          <span>ملاحظة:</span> أقصى حجم 4 ميغا بايت
                        </p>

                        <div className="single-image-upload">
                          {productImage ? (
                            <div className="uploaded-image">
                              <img
                                src={URL.createObjectURL(productImage)}
                                alt="صورة المنتج"
                              />
                              <button
                                type="button"
                                className="remove-image"
                                onClick={removeImage}
                              >
                                ×
                              </button>
                            </div>
                          ) : (
                            <label className="upload-placeholder">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e.target.files[0])}
                                hidden
                              />
                              <div className="upload-content">
                                <Image className="image-icon" />
                                <span>اضغط لرفع صورة</span>
                              </div>
                            </label>
                          )}
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="submit-btn"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "جاري الإضافة..." : "إضافة المنتج"}
                      </button>
                    </div>
                  </div>
                </form>
              
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProducts;
