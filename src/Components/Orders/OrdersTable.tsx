import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useRef } from 'react';
import OrderStatus from './OrderStatus';
import { OrdersTableProps } from '../../types';
import { useTranslation } from 'react-i18next';

export default function OrdersTable({ orders, selectedOrders, onSelectOrder, onSelectAll, onEditOrder, onDeleteOrder }: OrdersTableProps) {
  const allSelected = orders.length > 0 && selectedOrders.length === orders.length;
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [openActionsId, setOpenActionsId] = useState<string | null>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (actionsRef.current && !actionsRef.current.contains(event.target as Node)) {
        setOpenActionsId(null);
      }
    };

    if (openActionsId) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openActionsId]);

  return (
    <>
      <div className="hidden md:block bg-primary-50 rounded-lg overflow-x-auto p-1 sm:p-2">
        <table className={`w-full min-w-[640px] border-separate border-spacing-y-2 ${isRTL ? 'rtl' : 'ltr'}`}>
          <thead className="bg-primary-50">
            <tr className="rounded-lg">
              <th className="w-[8%] h-[34px] pt-2.5 px-2 pb-2 opacity-100">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={onSelectAll}
                  className="text-primary-100 opacity-100 border focus:ring-primary-100 w-[14.39px] h-[14.39px] rounded"
                  aria-label={t('orders.table.selectAll')}
                />
              </th>
              <th className={`px-2 opacity-100 text-gray-900 uppercase align-middle w-[12%] h-[34px] pt-2 pb-2 font-poppins font-medium text-xs leading-[18px] tracking-wider ${isRTL ? 'text-right' : 'text-left'}`}>
                {t('orders.table.id')}
              </th>
              <th className={`px-2 opacity-100 text-gray-900 uppercase align-middle w-[30%] h-[34px] pt-2 pb-2 font-poppins font-medium text-xs leading-[18px] tracking-wider ${isRTL ? 'text-right' : 'text-left'}`}>
                {t('orders.table.name')}
              </th>
              <th className={`px-2 opacity-100 text-gray-900 uppercase align-middle w-[22%] h-[34px] pt-2 pb-2 font-poppins font-medium text-xs leading-[18px] tracking-wider ${isRTL ? 'text-right' : 'text-left'}`}>
                {t('orders.table.date')}
              </th>
              <th className={`px-2 opacity-100 text-gray-900 uppercase align-middle w-[15%] h-[34px] pt-2 pb-2 font-poppins font-medium text-xs leading-[18px] tracking-wider ${isRTL ? 'text-right' : 'text-left'}`}>
                {t('orders.table.total')}
              </th>
              <th className={`px-2 opacity-100 text-gray-900 uppercase align-middle w-[18%] h-[34px] pt-2 pb-2 font-poppins font-medium text-xs leading-[18px] tracking-wider ${isRTL ? 'text-right' : 'text-left'}`}>
                {t('orders.table.status')}
              </th>
              <th className={`opacity-100 text-gray-900 uppercase align-middle w-[16%] h-[34px] pt-2 pb-2 pr-2 pl-32 font-poppins font-medium text-xs leading-[18px] tracking-wider ${isRTL ? 'text-right' : 'text-left'}`}>
                {t('orders.table.actions')}
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr 
                key={order.id} 
                onClick={() => onSelectOrder(order.id)}
                className="bg-white hover:bg-gray-50 transition-colors opacity-100 rounded-lg cursor-pointer h-[88.19px]"
              >
                <td 
                  className="opacity-100 w-[8%] h-[34px] pt-[9.8px] px-2 pb-[9.81px]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <input
                    type="checkbox"
                    checked={selectedOrders.includes(order.id)}
                    onChange={() => onSelectOrder(order.id)}
                    className="text-primary-100 opacity-100 border focus:ring-primary-100 cursor-pointer w-[14.39px] h-[14.39px] rounded"
                    aria-label={`Select order ${order.id}`}
                  />
                </td>
                <td className={`px-2 opacity-100 text-gray-900 align-middle w-[12%] h-[34px] pt-2 pb-2 font-poppins font-normal text-sm leading-[21px] tracking-normal ${isRTL ? 'text-right' : 'text-left'}`}>
                  #{order.id}
                </td>
                <td className={`px-2 opacity-100 text-gray-900 align-middle w-[30%] h-[34px] pt-2 pb-2 font-poppins font-normal text-sm leading-[21px] tracking-normal ${isRTL ? 'text-right' : 'text-left'}`}>
                  {order.name}
                </td>
                <td className={`px-2 opacity-100 text-gray-500 align-middle w-[22%] h-[34px] pt-2 pb-2 font-poppins font-normal text-sm leading-[21px] tracking-normal ${isRTL ? 'text-right' : 'text-left'}`}>
                  {order.date}
                </td>
                <td className={`px-2 opacity-100 text-gray-900 align-middle w-[15%] h-[34px] pt-2 pb-2 font-poppins font-normal text-sm leading-[21px] tracking-normal ${isRTL ? 'text-right' : 'text-left'}`}>
                  ${order.total}
                </td>
                <td className={`px-2 opacity-100 align-middle w-[18%] h-[34px] pt-2 pb-2 font-poppins font-normal text-sm leading-[21px] tracking-normal ${isRTL ? 'text-right' : 'text-left'}`}>
                  <OrderStatus status={order.status} />
                </td>
                <td 
                  className="opacity-100 text-gray-500 align-middle relative" 
                  style={{ width: '16%', height: '34px', paddingTop: '7.5px', paddingRight: '8px', paddingBottom: '8.5px', paddingLeft: '128.5px', fontFamily: 'Poppins, sans-serif', fontWeight: 400, fontSize: '14px', lineHeight: '21px', letterSpacing: '0%', textAlign: isRTL ? 'right' : 'left' }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button 
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                    aria-label={`Actions for order ${order.id}`}
                    onClick={() => setOpenActionsId(openActionsId === order.id ? null : order.id)}
                  >
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                  </button>
                  
                  {openActionsId === order.id && (
                    <div ref={actionsRef} className={`absolute top-8 bg-white rounded-lg shadow-lg border border-gray-200 py-1 min-w-[120px] z-[9999] ${isRTL ? 'left-2' : 'right-2'}`}>
                      <button
                        onClick={() => {
                          if (onEditOrder) {
                            onEditOrder(order.id);
                            setOpenActionsId(null);
                          }
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                      >
                        <FontAwesomeIcon icon={faEdit} className="text-blue-500" />
                        {t('common.edit') || 'Edit'}
                      </button>
                      <button
                        onClick={() => {
                          if (onDeleteOrder) {
                            onDeleteOrder(order.id);
                            setOpenActionsId(null);
                          }
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                      >
                        <FontAwesomeIcon icon={faTrash} className="text-red-500" />
                        {t('common.delete') || 'Delete'}
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-3">
        <div className="bg-white rounded-lg p-3 flex items-center gap-2">
          <input
            type="checkbox"
            checked={allSelected}
            onChange={onSelectAll}
            className="text-primary-100 border focus:ring-primary-100"
            style={{ width: '16px', height: '16px', borderRadius: '3px' }}
            aria-label={t('orders.table.selectAll')}
          />
          <span className="text-sm font-medium text-gray-700">{t('orders.table.selectAll')}</span>
        </div>

        {orders.map((order) => (
          <div 
            key={order.id} 
            onClick={() => onSelectOrder(order.id)}
            className="bg-white rounded-lg p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                <input
                  type="checkbox"
                  checked={selectedOrders.includes(order.id)}
                  onChange={() => onSelectOrder(order.id)}
                  className="text-primary-100 border focus:ring-primary-100 cursor-pointer"
                  style={{ width: '16px', height: '16px', borderRadius: '3px' }}
                  aria-label={`Select order ${order.id}`}
                />
              </div>
              <div className="relative">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenActionsId(openActionsId === order.id ? null : order.id);
                  }}
                  className="p-2 hover:bg-gray-100 rounded transition-colors text-gray-500"
                  aria-label={`Actions for order ${order.id}`}
                >
                  <FontAwesomeIcon icon={faEllipsisVertical} />
                </button>
                
                {openActionsId === order.id && (
                  <div ref={actionsRef} className={`absolute top-8 bg-white rounded-lg shadow-lg border border-gray-200 py-1 min-w-[120px] z-[9999] ${isRTL ? 'left-0' : 'right-0'}`}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onEditOrder) {
                          onEditOrder(order.id);
                          setOpenActionsId(null);
                        }
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <FontAwesomeIcon icon={faEdit} className="text-blue-500" />
                      {t('common.edit') || 'Edit'}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onDeleteOrder) {
                          onDeleteOrder(order.id);
                          setOpenActionsId(null);
                        }
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                    >
                      <FontAwesomeIcon icon={faTrash} className="text-red-500" />
                      {t('common.delete') || 'Delete'}
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 uppercase font-medium min-w-[60px] font-poppins">
                  {t('orders.table.id')}:
                </span>
                <span className="text-gray-900 font-medium font-poppins text-sm">
                  #{order.id}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 uppercase font-medium min-w-[60px] font-poppins">
                  {t('orders.table.name')}:
                </span>
                <span className="text-gray-900 font-poppins text-sm">
                  {order.name}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 uppercase font-medium min-w-[60px] font-poppins">
                  {t('orders.table.date')}:
                </span>
                <span className="text-gray-500 font-poppins text-[13px]">
                  {order.date}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 uppercase font-medium min-w-[60px] font-poppins">
                  {t('orders.table.total')}:
                </span>
                <span className="text-gray-900 font-medium font-poppins text-sm">
                  ${order.total}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 uppercase font-medium min-w-[60px] font-poppins">
                  {t('orders.table.status')}:
                </span>
                <OrderStatus status={order.status} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
