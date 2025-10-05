import SearchBar from './SearchBar.tsx';
import NavbarActions from './NavbarActions.tsx';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher.tsx';
import MobileMenu from '../MobileMenu/MobileMenu.tsx';
import { NavbarProps } from '../../types/index.ts';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export default function Navbar({ onSearch, notifications = 3 }: Omit<NavbarProps, 'cartItems'>) {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const isProductsPage = location.pathname.includes('/products');
  const { itemCount } = useCart();

  const handleAddProduct = () => {
    navigate('/add-product');
  };
  
  return (
    <header className={`sticky top-0 z-50 bg-primary-50 h-[90px] flex items-center py-4 justify-between gap-4 md:gap-8 ${
      isProductsPage ? 'pl-2 pr-4 md:pl-2 md:pr-4' : 'px-4 md:px-8'
    }`} role="banner">
      <div className="flex items-center gap-2 md:gap-4">
        <MobileMenu />
        <h2 className="text-gray-900 flex-shrink-0 align-middle font-poppins font-medium text-lg md:text-[25px] leading-tight md:leading-[37.5px]">
          {isProductsPage ? t('products.title') : t('nav.orders')}
        </h2>
      </div>
      <div className="hidden md:flex flex-1">
        <SearchBar onChange={onSearch} />
      </div>
      <div className="flex items-center gap-2 md:gap-4">
        <LanguageSwitcher />
        {isProductsPage && (
          <button 
            onClick={handleAddProduct}
            className="hidden sm:flex px-3 sm:px-4 py-2 bg-primary-100 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-primary-200 transition-colors items-center gap-1 sm:gap-2 whitespace-nowrap"
          >
            <span className="text-base sm:text-lg">+</span>
            <span className="hidden sm:inline">{t('products.addProduct')}</span>
            <span className="sm:hidden">+</span>
          </button>
        )}
        <NavbarActions notifications={notifications} cartItems={itemCount} />
      </div>
    </header>
  );
}
