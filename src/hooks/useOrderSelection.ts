import { useState, useCallback } from 'react';
import { Order } from '../types';

export function useOrderSelection() {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

  const handleSelectOrder = useCallback((orderId: string) => {
    setSelectedOrders(prev =>
      prev.includes(orderId)
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  }, []);

  const handleSelectAll = useCallback((orders: Order[]) => {
    setSelectedOrders(prev => {
      const orderIds = orders.map(order => order.id);
      const allSelected = orderIds.every(id => prev.includes(id)) && orderIds.length === prev.length;
      return allSelected ? [] : orderIds;
    });
  }, []);

  const clearSelection = useCallback(() => setSelectedOrders([]), []);

  return {
    selectedOrders,
    handleSelectOrder,
    handleSelectAll,
    clearSelection,
  };
}

