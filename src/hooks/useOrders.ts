import { useState, useMemo, useCallback } from 'react';
import { Order, Filters } from '../types';

export function useOrders(initialOrders: Order[], initialItemsPerPage: number) {
  const [filters, setFilters] = useState<Filters>({ status: 'all', sortBy: 'date' });
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(initialItemsPerPage);

  const filteredOrders = useMemo(() => {
    const filtered = initialOrders.filter(order => {
      const matchesStatus = filters.status === 'all' || order.status === filters.status;
      if (!matchesStatus) return false;

      if (!searchTerm) return true;

      const lowerSearchTerm = searchTerm.toLowerCase();
      return order.name.toLowerCase().includes(lowerSearchTerm) ||
             order.id.toLowerCase().includes(lowerSearchTerm);
    });

    if (filters.sortBy === 'total') {
      return filtered.sort((a, b) => parseFloat(b.total) - parseFloat(a.total));
    } else if (filters.sortBy === 'name') {
      return filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
  }, [initialOrders, filters.status, filters.sortBy, searchTerm]);

  const totalPages = useMemo(() => 
    Math.ceil(filteredOrders.length / itemsPerPage),
    [filteredOrders.length, itemsPerPage]
  );

  const currentOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredOrders.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredOrders, currentPage, itemsPerPage]);

  const handleFilterChange = useCallback((key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  }, []);

  const handleSearchChange = useCallback((term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleItemsPerPageChange = useCallback((items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  }, []);

  return {
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
  };
}
