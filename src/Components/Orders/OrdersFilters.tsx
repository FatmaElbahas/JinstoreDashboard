import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { OrdersFiltersProps } from '../../types';
import { useTranslation } from 'react-i18next';
import CustomSelect from './CustomSelect';

export default function OrdersFilters({ 
  filters, 
  onFilterChange, 
  searchTerm, 
  onSearchChange,
  itemsPerPage,
  onItemsPerPageChange 
}: OrdersFiltersProps) {
  const { t } = useTranslation();

  const statusOptions = [
    { value: 'all', label: t('orders.filters.allOrders') },
    { value: 'processing', label: t('orders.filters.processing') },
    { value: 'shipped', label: t('orders.filters.shipped') },
    { value: 'completed', label: t('orders.filters.completed') },
    { value: 'refunded', label: t('orders.filters.refunded') },
    { value: 'cancelled', label: t('orders.filters.cancelled') },
  ];

  const itemsPerPageOptions = [
    { value: 10, label: '10' },
    { value: 20, label: '20' },
    { value: 50, label: '50' },
    { value: 100, label: '100' },
  ];

  const sortOptions = [
    { value: 'date', label: t('orders.filters.sort') },
    { value: 'total', label: t('orders.filters.sortByTotal') },
    { value: 'name', label: t('orders.filters.sortByName') },
  ];

  return (
    <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2 md:gap-4 mb-6 bg-white p-3 md:p-4 rounded-lg shadow-sm">
      <div className="w-full sm:w-auto">
        <CustomSelect
          options={statusOptions}
          value={filters.status}
          onChange={(value) => onFilterChange('status', value as string)}
          ariaLabel="Filter by status"
        />
      </div>

      <div className="w-full sm:w-auto">
        <CustomSelect
          options={itemsPerPageOptions}
          value={itemsPerPage}
          onChange={(value) => onItemsPerPageChange(value as number)}
          ariaLabel="Items per page"
        />
      </div>

      <div className="w-full sm:w-auto">
        <CustomSelect
          options={sortOptions}
          value={filters.sortBy}
          onChange={(value) => onFilterChange('sortBy', value as string)}
          ariaLabel="Sort by"
        />
      </div>

      <div className="relative w-full sm:flex-1 sm:min-w-[200px] md:max-w-xs">
        <FontAwesomeIcon 
          icon={faSearch} 
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" 
        />
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={t('orders.filters.search')}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-100"
          aria-label="Search orders"
        />
      </div>

      <div className="w-full sm:w-auto sm:ml-auto">
        <button 
          className="w-full sm:w-auto px-4 md:px-6 py-2 bg-primary-100 text-white rounded-lg text-sm font-medium hover:bg-primary-200 transition-colors"
          onClick={(e) => e.preventDefault()}
        >
          {t('orders.filters.actions')}
        </button>
      </div>
    </div>
  );
}
