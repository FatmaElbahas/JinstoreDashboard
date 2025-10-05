import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus, faMinus, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../../context/CartContext';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import PageLayout from '../../Components/Layout/PageLayout';

export default function ShoppingCart() {
  const { items, itemCount, totalPrice, removeFromCart, updateQuantity } = useCart();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <PageLayout
      title={`${t('cart.title')} - JinStore`}
      description="Review your shopping cart and proceed to checkout. Manage your selected items easily."
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="flex-1 px-3 sm:px-4 md:px-4 pt-4 sm:pt-8 pb-4">
        <header className="mb-6">
          <nav className="flex items-center gap-2 text-sm mb-4" aria-label="Breadcrumb">
            <a href="/" className="flex items-center gap-2 text-primary-100 hover:text-primary-200">
              <FontAwesomeIcon icon={faGlobe} className="text-sm" />
              {t('products.breadcrumb.dashboard')}
            </a>
            <span className="text-gray-400">›</span>
            <span className="text-gray-900 font-medium">{t('cart.title')}</span>
          </nav>
        </header>

        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-4 lg:mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{t('cart.title')}</h1>
                <p className="text-xs sm:text-sm text-gray-500">{t('cart.itemCount', { count: itemCount })}</p>
              </div>

              {items.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 mb-4">{t('cart.empty')}</p>
                  <Link
                    to="/products/grid"
                    className="inline-block px-6 py-3 bg-primary-100 text-white rounded-lg font-medium hover:bg-primary-200 transition-colors"
                  >
                    {t('cart.continueShopping')}
                  </Link>
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4" dir={isRTL ? 'rtl' : 'ltr'}>
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-xl">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"%3E%3Cpath fill="%23ccc" d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/%3E%3C/svg%3E';
                          }}
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm sm:text-base font-medium text-gray-900 mb-1 sm:mb-2 line-clamp-2">
                          {item.name}
                        </h3>
                        <p className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 rounded hover:bg-gray-100 transition-colors"
                          >
                            <FontAwesomeIcon icon={faMinus} className="text-xs text-gray-600" />
                          </button>
                          
                          <span className="w-12 text-center text-sm font-medium text-gray-900">
                            {item.quantity}
                          </span>
                          
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 rounded hover:bg-gray-100 transition-colors"
                          >
                            <FontAwesomeIcon icon={faPlus} className="text-xs text-gray-600" />
                          </button>
                          
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="ml-auto p-2 text-red-500 hover:bg-red-50 rounded transition-colors"
                            aria-label={t('cart.remove')}
                          >
                            <FontAwesomeIcon icon={faTrash} className="text-sm" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <aside className="w-full lg:w-96" role="complementary" aria-label="Order summary">
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 lg:sticky lg:top-24" dir={isRTL ? 'rtl' : 'ltr'}>
              <h2 className="text-lg font-bold text-gray-900 mb-4">{t('cart.orderSummary')}</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{t('cart.subtotal')}</span>
                  <span className="font-medium text-gray-900">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{t('cart.shipping')}</span>
                  <span className="font-medium text-gray-900">$10.00</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{t('cart.tax')}</span>
                  <span className="font-medium text-gray-900">${(totalPrice * 0.1).toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">{t('cart.total')}</span>
                    <span className="text-2xl font-bold text-gray-900">
                      ${(totalPrice + 10 + totalPrice * 0.1).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              
              <Link
                to="/products/checkout"
                className="block w-full py-3 bg-primary-100 text-white text-center rounded-lg font-medium hover:bg-primary-200 transition-colors mb-3"
              >
                {t('cart.checkout')}
              </Link>
              
              <Link
                to="/products/grid"
                className="block w-full py-3 bg-white border border-gray-200 text-gray-700 text-center rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                {t('cart.continueShopping')}
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </PageLayout>
  );
}
