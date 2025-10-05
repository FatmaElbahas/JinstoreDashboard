import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '../Components/Navbar/Navbar';
import OrdersHeader from '../Components/Orders/OrdersHeader';
import OrdersFilters from '../Components/Orders/OrdersFilters';
import OrdersTable from '../Components/Orders/OrdersTable';
import Pagination from '../Components/Orders/Pagination';
import Footer from '../Components/Footer/Footer';
import { useOrders } from '../hooks/useOrders';
import { useOrderSelection } from '../hooks/useOrderSelection';
import { useOrdersContext } from '../context/OrdersContext';
import { ITEMS_PER_PAGE } from '../constants/orderData';
import { useTranslation } from 'react-i18next';
import { Order } from '../types';

export default function Orders() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const navigate = useNavigate();
  const { orders, updateOrder, deleteOrder } = useOrdersContext();
  
  const {
    filters,
    searchTerm,
    currentPage,
    totalPages,
    currentOrders,
    itemsPerPage,
    handleFilterChange,
    handleSearchChange,
    handlePageChange,
    handleItemsPerPageChange,
  } = useOrders(orders, ITEMS_PER_PAGE);


  const {
    selectedOrders,
    handleSelectOrder,
    handleSelectAll,
  } = useOrderSelection();

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearchChange(e.target.value);
  }, [handleSearchChange]);

  const handleSelectAllOrders = useCallback(() => {
    handleSelectAll(currentOrders);
  }, [handleSelectAll, currentOrders]);

  const handleEditOrder = useCallback((orderId: string) => {
    navigate(`/orders/edit/${orderId}`);
  }, [navigate]);

  const handleDeleteOrder = useCallback((orderId: string) => {
    if (window.confirm(t('orders.confirmDelete') || 'Are you sure you want to delete this order?')) {
      deleteOrder(orderId);
    }
  }, [deleteOrder, t]);



  return (
    <>
      <Helmet>
        <title>{t('nav.orders')} - JinStore</title>
        <meta name="description" content="Manage and track all your orders in one place. View order status, filter, and search orders easily." />
      </Helmet>
      <main className="flex-1 overflow-y-auto flex flex-col bg-primary-50" dir={isRTL ? 'rtl' : 'ltr'}>
        <Navbar onSearch={handleSearch} />
      
      <div className="flex-1 px-3 sm:px-4 md:px-8 pt-4 sm:pt-6 md:pt-8 pb-4 bg-primary-50">
        <h1 className="sr-only">{t('nav.orders')}</h1>
        <OrdersHeader />
        
        <section aria-label="Orders management">
          <OrdersFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={handleItemsPerPageChange}
          />

          <OrdersTable
            orders={currentOrders}
            selectedOrders={selectedOrders}
            onSelectOrder={handleSelectOrder}
            onSelectAll={handleSelectAllOrders}
            onEditOrder={handleEditOrder}
            onDeleteOrder={handleDeleteOrder}
          />

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </section>
      </div>
      
      
      <Footer />
    </main>
    </>
  );
}
