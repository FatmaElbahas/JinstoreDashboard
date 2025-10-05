import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

const ICONS = {
  dashboard: new URL('../../assets/Images/DasboardIcon.svg', import.meta.url).href,
  orders: new URL('../../assets/Images/OrdersIcon.svg', import.meta.url).href,
  invoices: new URL('../../assets/Images/InvoicesIcon.svg', import.meta.url).href,
  products: new URL('../../assets/Images/ProductsIcon.png', import.meta.url).href,
  customers: new URL('../../assets/Images/CustomersIcon.svg', import.meta.url).href,
  chats: new URL('../../assets/Images/ChatsIcon.svg', import.meta.url).href,
  email: new URL('../../assets/Images/EmailIcon.svg', import.meta.url).href,
  todo: new URL('../../assets/Images/TodoIcon.svg', import.meta.url).href,
  profile: new URL('../../assets/Images/ProfileIcon.svg', import.meta.url).href,
  user: new URL('../../assets/Images/UserIcon.svg', import.meta.url).href,
  authentication: new URL('../../assets/Images/AuthenticationIcon.svg', import.meta.url).href,
  errorPage: new URL('../../assets/Images/ErrorPageIcon.svg', import.meta.url).href,
};

const LOGO = new URL('../../assets/Images/LOGO.svg', import.meta.url).href;

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  badge?: number;
  path?: string;
  submenu?: { id: string; label: string; path: string }[];
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

interface SidebarProps {
  onLinkClick?: () => void;
}

export default function Sidebar({ onLinkClick }: SidebarProps = {}) {
  const location = useLocation();
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const { t } = useTranslation();

  const menuSections: MenuSection[] = [
    {
      title: t('sidebar.ecommerce'),
      items: [
        { id: 'dashboard', label: t('sidebar.dashboard'), icon: ICONS.dashboard, path: '/dashboard' },
        { id: 'orders', label: t('sidebar.orders'), icon: ICONS.orders, badge: 2, path: '/orders' },
        { id: 'detail', label: t('sidebar.detail'), icon: ICONS.invoices, path: '/detail' },
        { 
          id: 'products', 
          label: t('sidebar.products'), 
          icon: ICONS.products,
          submenu: [
            { id: 'list-view', label: t('sidebar.listView'), path: '/products/list' },
            { id: 'grid-view', label: t('sidebar.gridView'), path: '/products/grid' },
            { id: 'product-detail', label: t('sidebar.productDetail'), path: '/products/detail' },
            { id: 'shopping-cart', label: t('sidebar.shoppingCart'), path: '/products/cart' },
            { id: 'checkout', label: t('sidebar.checkout'), path: '/products/checkout' },
          ]
        },
        { id: 'buyer', label: t('sidebar.buyer'), icon: ICONS.user, path: '/buyer' },
        { id: 'customers', label: t('sidebar.customers'), icon: ICONS.customers, path: '/customers' },
        { id: 'invoices', label: t('sidebar.invoices'), icon: ICONS.invoices, path: '/invoices' },
      ]
    },
    {
      title: t('sidebar.apps'),
      items: [
        { id: 'chats', label: t('sidebar.chats'), icon: ICONS.chats, badge: 6, path: '/chats' },
        { id: 'email', label: t('sidebar.email'), icon: ICONS.email, path: '/email' },
        { id: 'todo', label: t('sidebar.todo'), icon: ICONS.todo, path: '/todo' },
      ]
    },
    {
      title: t('sidebar.pages'),
      items: [
        { id: 'profile', label: t('sidebar.profile'), icon: ICONS.profile, path: '/profile' },
        { id: 'users', label: t('sidebar.users'), icon: ICONS.user, path: '/users' },
        { id: 'authentication', label: t('sidebar.authentication'), icon: ICONS.authentication, path: '/authentication' },
        { id: 'error', label: t('sidebar.error'), icon: ICONS.errorPage, path: '/error' },
      ]
    }
  ];

  const isPathActive = (path?: string) => {
    if (!path) return false;
    return location.pathname === path;
  };

  const isSubmenuActive = (submenu?: { id: string; label: string; path: string }[]) => {
    if (!submenu) return false;
    return submenu.some(item => location.pathname === item.path);
  };

  useEffect(() => {
    for (const section of menuSections) {
      for (const item of section.items) {
        if (item.submenu && isSubmenuActive(item.submenu)) {
          setExpandedMenu(item.id);
          return;
        }
      }
    }
  }, [location.pathname]);

  return (
    <aside className="h-full lg:h-screen bg-primary-50 overflow-y-auto flex-shrink-0 scrollbar-hide w-full lg:w-[280px] transition-all duration-300 ease-in-out" role="navigation" aria-label="Main navigation">
      <div className="w-full">
        <div className="flex items-center justify-center lg:justify-start w-full h-[98px] pb-2 px-4 lg:px-0">
          <img 
            src={LOGO} 
            alt="JinStore Logo" 
            className="object-contain max-h-20 max-w-full"
          />
        </div>
        
        <div className="flex items-center gap-3 relative bg-white h-[70px] py-2 mx-4 lg:mx-6 -mt-1.5 rounded-lg px-3 transition-all duration-300 hover:shadow-md">
          <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white font-semibold">
            B
          </div>
          <div>
            <p className="text-gray-900 text-[15px] leading-[22.5px] font-medium">
              Showan Forohl
            </p>
            <p className="text-xs text-gray-500 leading-[18px] font-normal">
              {t('sidebar.salesManager')}
            </p>
          </div>
        </div>
      </div>

      <nav className="p-4" aria-label="Main navigation">
        {menuSections.map((section) => (
          <div key={section.title} className="mb-4 lg:mb-6">
            <h3 className="px-3 lg:px-6 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {section.title}
            </h3>
            <ul>
              {section.items.map((item) => (
                <li key={item.id}>
                {item.submenu ? (
                  <button
                    onClick={() => setExpandedMenu(expandedMenu === item.id ? null : item.id)}
                    className={`flex items-center gap-3 transition-all duration-200 text-gray-700 w-full lg:w-[calc(100%-24px)] h-[43px] rounded-full py-2.5 px-4 lg:px-6 text-[15px] leading-[22.5px] font-normal hover:scale-105
                      ${isSubmenuActive(item.submenu) ? 'bg-white shadow-sm' : 'hover:bg-gray-100'}
                    `}
                    >
                    <img 
                      src={item.icon} 
                      alt={item.label} 
                      className="w-5 h-5 object-contain transition-all"
                    />
                    <span className="flex-1 text-start">{item.label}</span>
                    {item.badge && (
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium align-middle bg-[#05B171] text-white">
                        {item.badge}
                      </span>
                    )}
                      <FontAwesomeIcon 
                        icon={faChevronRight} 
                        className={`w-3 text-gray-400 transition-transform align-middle ${
                          expandedMenu === item.id ? 'rotate-90' : ''
                        }`} 
                      />
                    </button>
                ) : (
                  <Link
                    to={item.path || '#'}
                    onClick={onLinkClick}
                    className={`flex items-center gap-3 transition-all duration-200 w-full lg:w-[calc(100%-24px)] h-[43px] rounded-full py-2.5 px-4 lg:px-6 text-[15px] leading-[22.5px] font-normal hover:scale-105
                      ${isPathActive(item.path) 
                        ? 'bg-primary-100 text-white shadow-sm' 
                        : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                    <img 
                      src={item.icon} 
                      alt={item.label} 
                      className={`w-5 h-5 object-contain transition-all ${
                        isPathActive(item.path) ? 'brightness-0 invert' : ''
                      }`}
                    />
                    <span className="flex-1 text-start">{item.label}</span>
                    {item.badge && (
                      <span 
                        className={`px-2 py-0.5 rounded-full text-xs font-medium align-middle ${
                          isPathActive(item.path) ? 'bg-white text-[#05B171]' : 'bg-[#05B171] text-white'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                    </Link>
                  )}
                  
                  {item.submenu && expandedMenu === item.id && (
                    <ul className="mt-2 space-y-2 ps-4 lg:ps-8">
                      {item.submenu.map((subItem) => (
                        <li key={subItem.id}>
                          <Link
                            to={subItem.path}
                            onClick={onLinkClick}
                            className={`flex items-center transition-colors w-full h-[43px] rounded-full py-2.5 px-4 lg:px-6 text-[15px] leading-[22.5px] font-normal
                              ${isPathActive(subItem.path)
                                ? 'text-white bg-primary-100 font-medium'
                                : 'text-gray-600 hover:text-primary-100 hover:bg-gray-50'
                              }`}
                          >
                            {subItem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
