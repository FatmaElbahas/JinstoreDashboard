import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CartProvider } from './context/CartContext';
import { ProductsProvider } from './context/ProductsContext';
import { OrdersProvider } from './context/OrdersContext';
import { LanguageProvider } from './context/LanguageContext';
import Sidebar from './Components/Sidebar/Sidebar';
import Orders from './Pages/Orders';
import EditOrder from './Pages/Orders/EditOrder';
import ProductsGridView from './Pages/Products/ProductsGridView';
import ProductsListView from './Pages/Products/ProductsListView';
import ProductDetail from './Pages/Products/ProductDetail';
import ShoppingCart from './Pages/Products/ShoppingCart';
import Checkout from './Pages/Products/Checkout';
import AddProduct from './Pages/Products/AddProduct';
import EditProduct from './Pages/Products/EditProduct';
import NotFound from './Pages/NotFound';
import LoadingDemo from './Pages/LoadingDemo';

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const html = document.documentElement;
    html.lang = i18n.language;
    html.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  return (
    <Router>
      <LanguageProvider>
        <CartProvider>
          <ProductsProvider>
            <OrdersProvider>
          <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-100 focus:text-white focus:rounded">
            Skip to main content
          </a>
          <div className="flex h-screen overflow-hidden gap-5">
            <div className="hidden lg:block">
              <Sidebar />
            </div>
            <div id="main-content" role="main" className="flex-1 overflow-y-auto">
              <Routes>
                <Route path="/" element={<Navigate to="/orders" replace />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/orders/edit/:id" element={<EditOrder />} />
                <Route path="/products/grid" element={<ProductsGridView />} />
                <Route path="/products/list" element={<ProductsListView />} />
                <Route path="/products/detail" element={<ProductDetail />} />
                <Route path="/products/cart" element={<ShoppingCart />} />
                <Route path="/products/checkout" element={<Checkout />} />
                <Route path="/add-product" element={<AddProduct />} />
                <Route path="/edit-product/:id" element={<EditProduct />} />
                <Route path="/loading-demo" element={<LoadingDemo />} />
                <Route path="/dashboard" element={<NotFound />} />
                <Route path="/detail" element={<NotFound />} />
                <Route path="/buyer" element={<NotFound />} />
                <Route path="/customers" element={<NotFound />} />
                <Route path="/invoices" element={<NotFound />} />
                <Route path="/chats" element={<NotFound />} />
                <Route path="/email" element={<NotFound />} />
                <Route path="/todo" element={<NotFound />} />
                <Route path="/profile" element={<NotFound />} />
                <Route path="/users" element={<NotFound />} />
                <Route path="/authentication" element={<NotFound />} />
                <Route path="/error" element={<NotFound />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
            </OrdersProvider>
          </ProductsProvider>
        </CartProvider>
      </LanguageProvider>
    </Router>
  );
}

export default App;
