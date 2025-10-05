import { faBell, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import NotificationButton from './NotificationButton';
import { NavbarActionsProps } from '../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function NavbarActions({ notifications = 3, cartItems = 2 }: NavbarActionsProps) {
  return (
    <nav className="flex items-center gap-4 flex-shrink-0" aria-label="User actions">
      <NotificationButton 
        icon={faBell} 
        count={notifications} 
        label="Notifications" 
      />
      
      <Link 
        to="/products/cart"
        className="relative p-1.5 text-gray-500 hover:text-gray-700 transition-colors" 
        aria-label="Shopping cart"
      >
        <FontAwesomeIcon icon={faShoppingCart} className="text-lg" />
        {cartItems > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-medium rounded-full flex items-center justify-center">
            {cartItems}
          </span>
        )}
      </Link>
    </nav>
  );
}
