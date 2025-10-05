import { createContext, useContext, useState, ReactNode } from 'react';
import { Order } from '../types';
import { INITIAL_ORDERS as ORIGINAL_ORDERS } from '../constants/orderData';

const INITIAL_ORDERS: Order[] = ORIGINAL_ORDERS.map(order => ({
  id: order.id,
  name: order.name,
  date: order.date,
  total: typeof order.total === 'string' ? parseFloat(order.total) : order.total,
  status: order.status as 'processing' | 'shipped' | 'completed' | 'refunded' | 'cancelled'
}));

interface OrdersContextType {
  orders: Order[];
  updateOrder: (orderId: string, updatedOrder: Partial<Order>) => void;
  deleteOrder: (orderId: string) => void;
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);

  const updateOrder = (orderId: string, updatedOrder: Partial<Order>) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, ...updatedOrder } : order
      )
    );
  };

  const deleteOrder = (orderId: string) => {
    setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
  };

  return (
    <OrdersContext.Provider value={{ orders, updateOrder, deleteOrder }}>
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrdersContext() {
  const context = useContext(OrdersContext);
  if (context === undefined) {
    throw new Error('useOrdersContext must be used within an OrdersProvider');
  }
  return context;
}
