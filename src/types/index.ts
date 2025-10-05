export interface Order {
  id: string;
  name: string;
  date: string;
  total: number;
  status: 'processing' | 'shipped' | 'completed' | 'refunded' | 'cancelled';
}

export interface Filters {
  status: string;
  sortBy: string;
}

export interface NavbarProps {
  onSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  notifications?: number;
  cartItems?: number;
}

export interface SearchBarProps {
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface NotificationButtonProps {
  icon: any;
  count: number;
  label: string;
}

export interface NavbarActionsProps {
  notifications?: number;
  cartItems?: number;
}

export interface OrderStatusProps {
  status: Order['status'];
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface OrdersFiltersProps {
  filters: Filters;
  onFilterChange: (key: string, value: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  itemsPerPage: number;
  onItemsPerPageChange: (items: number) => void;
}

export interface OrdersTableProps {
  orders: Order[];
  selectedOrders: string[];
  onSelectOrder: (orderId: string) => void;
  onSelectAll: () => void;
  onEditOrder?: (orderId: string) => void;
  onDeleteOrder?: (orderId: string) => void;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  color?: string;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface ProductFilters {
  keyword: string;
  categories: string[];
  priceRange: [number, number];
  colors: string[];
}
