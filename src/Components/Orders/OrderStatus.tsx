import { OrderStatusProps } from '../../types';
import { useTranslation } from 'react-i18next';

export default function OrderStatus({ status }: OrderStatusProps) {
  const { t } = useTranslation();
  
  const statusConfig = {
    processing: {
      label: t('orders.status.processing'),
      className: 'text-white',
      style: { backgroundColor: '#FF6E40' }
    },
    shipped: {
      label: t('orders.status.shipped'),
      className: 'bg-gray-800 text-white',
      style: {}
    },
    completed: {
      label: t('orders.status.completed'),
      className: 'text-white',
      style: { backgroundColor: '#05B171' }
    },
    refunded: {
      label: t('orders.status.refunded'),
      className: 'text-white',
      style: { backgroundColor: '#FAAE42' }
    },
    cancelled: {
      label: t('orders.status.cancelled'),
      className: 'text-white',
      style: { backgroundColor: '#EA4444' }
    }
  };

  const config = statusConfig[status] || statusConfig.processing;

  return (
    <span 
      className={`px-3 py-1 rounded-full text-xs font-medium ${config.className}`}
      style={config.style}
    >
      {config.label}
    </span>
  );
}
