import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faSave, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { useOrdersContext } from '../../context/OrdersContext';
import PageLayout from '../../Components/Layout/PageLayout';
import { Order } from '../../types';

export default function EditOrder() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  
  const isRTL = i18n.language === 'ar';
  const { orders, updateOrder } = useOrdersContext();
  
  const [formData, setFormData] = useState<Partial<Order>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Find the order by ID
  const order = orders.find(o => o.id === id);

  useEffect(() => {
    if (order) {
      setFormData({
        id: order.id,
        name: order.name,
        date: order.date,
        total: order.total,
        status: order.status
      });
    }
  }, [order]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'total' ? parseFloat(value) || 0 : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name?.trim()) {
      newErrors.name = t('orders.errors.nameRequired') || 'Name is required';
    }
    
    if (!formData.date?.trim()) {
      newErrors.date = t('orders.errors.dateRequired') || 'Date is required';
    }
    
    if (!formData.total || formData.total <= 0) {
      newErrors.total = t('orders.errors.totalRequired') || 'Total must be greater than 0';
    }
    
    if (!formData.status) {
      newErrors.status = t('orders.errors.statusRequired') || 'Status is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm() || !id) return;
    
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      updateOrder(id, formData);
      navigate('/orders');
    } catch (error) {
      console.error('Error updating order:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/orders');
  };

  if (!order) {
    return (
      <PageLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {t('orders.notFound') || 'Order Not Found'}
            </h1>
            <p className="text-gray-600 mb-6">
              {t('orders.notFoundMessage') || 'The order you are looking for does not exist.'}
            </p>
            <button
              onClick={() => navigate('/orders')}
              className="bg-primary-100 text-white px-6 py-2 rounded-lg hover:bg-primary-200 transition-colors"
            >
              {t('orders.backToOrders') || 'Back to Orders'}
            </button>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto p-6">
          {/* Header */}
          <div className="mb-6">
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              <span>{t('common.back') || 'Back'}</span>
            </button>
            <h1 className="text-2xl font-bold text-gray-900">
              {t('orders.editOrder') || 'Edit Order'}
            </h1>
            <p className="text-gray-600 mt-1">
              {t('orders.editOrderDescription') || 'Update order information below'}
            </p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="space-y-6">
              {/* Order ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('orders.orderId') || 'Order ID'}
                </label>
                <input
                  type="text"
                  value={formData.id ? `#${formData.id}` : ''}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                />
              </div>

              {/* Customer Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('orders.customerName') || 'Customer Name'}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-100 ${
                    errors.name ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder={t('orders.enterCustomerName') || 'Enter customer name'}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('orders.date') || 'Date'}
                </label>
                <input
                  type="text"
                  name="date"
                  value={formData.date || ''}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-100 ${
                    errors.date ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder={t('orders.enterDate') || 'Enter date'}
                />
                {errors.date && (
                  <p className="text-red-500 text-sm mt-1">{errors.date}</p>
                )}
              </div>

              {/* Total */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('orders.total') || 'Total'}
                </label>
                <input
                  type="number"
                  name="total"
                  value={formData.total || ''}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-100 ${
                    errors.total ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder={t('orders.enterTotal') || 'Enter total amount'}
                />
                {errors.total && (
                  <p className="text-red-500 text-sm mt-1">{errors.total}</p>
                )}
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('orders.status') || 'Status'}
                </label>
                <select
                  name="status"
                  value={formData.status || ''}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-100 ${
                    errors.status ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="">{t('orders.selectStatus') || 'Select status'}</option>
                  <option value="processing">{t('orders.statuses.processing') || 'Processing'}</option>
                  <option value="shipped">{t('orders.statuses.shipped') || 'Shipped'}</option>
                  <option value="completed">{t('orders.statuses.completed') || 'Completed'}</option>
                  <option value="refunded">{t('orders.statuses.refunded') || 'Refunded'}</option>
                  <option value="cancelled">{t('orders.statuses.cancelled') || 'Cancelled'}</option>
                </select>
                {errors.status && (
                  <p className="text-red-500 text-sm mt-1">{errors.status}</p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={handleCancel}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {t('common.cancel') || 'Cancel'}
              </button>
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="px-6 py-2 bg-primary-100 text-white rounded-lg hover:bg-primary-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                    {t('common.saving') || 'Saving...'}
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faSave} />
                    {t('common.save') || 'Save'}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}