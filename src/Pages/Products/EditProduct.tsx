import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faSave, faUpload } from '@fortawesome/free-solid-svg-icons';
import { useProducts } from '../../context/ProductsContext';
import PageLayout from '../../Components/Layout/PageLayout';

export default function EditProduct() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { products, updateProduct } = useProducts();
  const isRTL = i18n.language === 'ar';

  const product = products.find(p => p.id === parseInt(id || '0'));

  const [formData, setFormData] = useState({
    name: product?.name || '',
    price: product?.price.toString() || '',
    oldPrice: product?.oldPrice?.toString() || '',
    category: product?.category || '',
    color: product?.color || '',
    description: '',
    image: null as File | null
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price.toString(),
        oldPrice: product.oldPrice?.toString() || '',
        category: product.category,
        color: product.color,
        description: '',
        image: null
      });
    }
  }, [product]);

  const categories = [
    { value: 'beverages', label: t('products.filters.beverages') },
    { value: 'snacks', label: t('products.filters.snacks') },
    { value: 'food', label: t('products.filters.food') },
  ];

  const colors = [
    { value: 'blue', label: 'Blue' },
    { value: 'green', label: 'Green' },
    { value: 'pink', label: 'Pink' },
    { value: 'mint', label: 'Mint' },
    { value: 'lime', label: 'Lime' },
    { value: 'orange', label: 'Orange' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      image: file
    }));
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.name.trim()) {
      newErrors.name = t('validation.nameRequired') || 'Product name is required';
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = t('validation.priceRequired') || 'Valid price is required';
    }

    if (!formData.category) {
      newErrors.category = t('validation.categoryRequired') || 'Category is required';
    }

    if (!formData.color) {
      newErrors.color = t('validation.colorRequired') || 'Color is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!product) return;
    
    if (validateForm()) {
      const updatedProduct = {
        name: formData.name,
        price: parseFloat(formData.price),
        oldPrice: formData.oldPrice ? parseFloat(formData.oldPrice) : undefined,
        category: formData.category,
        color: formData.color,
        image: formData.image ? URL.createObjectURL(formData.image) : product.image
      };

      updateProduct(product.id, updatedProduct);
      
      alert(t('products.productUpdated') || 'Product updated successfully!');
      navigate('/products/grid');
    }
  };

  const handleBack = () => {
    navigate('/products/grid');
  };

  if (!product) {
    return (
      <PageLayout title="Product Not Found - JinStore">
        <div className="flex-1 px-3 sm:px-4 md:px-8 pt-4 sm:pt-6 md:pt-8 pb-4 bg-primary-50">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
            <button
              onClick={handleBack}
              className="px-6 py-3 bg-primary-100 text-white rounded-lg font-medium hover:bg-primary-200 transition-colors"
            >
              Back to Products
            </button>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title="Edit Product - JinStore"
      description="Edit product information and details."
    >
      <div className="flex-1 px-3 sm:px-4 md:px-8 pt-4 sm:pt-6 md:pt-8 pb-4 bg-primary-50">
        <div className="max-w-4xl mx-auto">
          <div className={`flex items-center gap-4 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <button
              onClick={handleBack}
              className={`flex items-center gap-2 text-primary-100 hover:text-primary-200 transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <FontAwesomeIcon icon={faArrowLeft} className={`text-lg ${isRTL ? 'rotate-180' : ''}`} />
              <span className="hidden sm:inline">{t('common.back') || 'Back'}</span>
            </button>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {t('common.edit') || 'Edit'} {product.name}
            </h1>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('products.productName') || 'Product Name'} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 transition-colors ${
                      errors.name ? 'border-red-500' : 'border-gray-200'
                    }`}
                    placeholder={t('products.productNamePlaceholder') || 'Enter product name'}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('products.price') || 'Price'} *
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 transition-colors ${
                      errors.price ? 'border-red-500' : 'border-gray-200'
                    }`}
                    placeholder="0.00"
                  />
                  {errors.price && (
                    <p className="mt-1 text-sm text-red-600">{errors.price}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="oldPrice" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('products.oldPrice') || 'Old Price (Optional)'}
                  </label>
                  <input
                    type="number"
                    id="oldPrice"
                    name="oldPrice"
                    value={formData.oldPrice}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 transition-colors"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('products.category') || 'Category'} *
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 transition-colors ${
                      errors.category ? 'border-red-500' : 'border-gray-200'
                    }`}
                  >
                    <option value="">{t('products.selectCategory') || 'Select Category'}</option>
                    {categories.map(category => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('products.color') || 'Color'} *
                  </label>
                  <select
                    id="color"
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 transition-colors ${
                      errors.color ? 'border-red-500' : 'border-gray-200'
                    }`}
                  >
                    <option value="">{t('products.selectColor') || 'Select Color'}</option>
                    {colors.map(color => (
                      <option key={color.value} value={color.value}>
                        {color.label}
                      </option>
                    ))}
                  </select>
                  {errors.color && (
                    <p className="mt-1 text-sm text-red-600">{errors.color}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('products.description') || 'Description'}
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 transition-colors resize-none"
                    placeholder={t('products.descriptionPlaceholder') || 'Enter product description'}
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('products.productImage') || 'Product Image'}
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-100 transition-colors">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-32 h-32 object-contain mx-auto mb-4 rounded-lg"
                    />
                    <FontAwesomeIcon icon={faUpload} className="text-3xl text-gray-400 mb-4" />
                    <input
                      type="file"
                      id="image"
                      name="image"
                      onChange={handleImageChange}
                      accept="image/*"
                      className="hidden"
                    />
                    <label
                      htmlFor="image"
                      className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-white rounded-lg hover:bg-primary-200 transition-colors"
                    >
                      <FontAwesomeIcon icon={faUpload} />
                      <span>{t('products.uploadNewImage') || 'Upload New Image'}</span>
                    </label>
                    <p className="text-sm text-gray-500 mt-2">
                      {formData.image ? formData.image.name : t('products.noNewImageSelected') || 'No new image selected'}
                    </p>
                  </div>
                </div>
              </div>

              <div className={`flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  {t('common.cancel') || 'Cancel'}
                </button>
                <button
                  type="submit"
                  className={`flex-1 px-6 py-3 bg-primary-100 text-white rounded-lg font-medium hover:bg-primary-200 transition-colors flex items-center justify-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  <FontAwesomeIcon icon={faSave} />
                  <span>{t('common.save') || 'Save Changes'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
