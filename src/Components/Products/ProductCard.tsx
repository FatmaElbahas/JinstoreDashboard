import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid, faEdit, faTrash, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  inCart: boolean;
  inWishlist: boolean;
  cartQuantity?: number;
  onAddToCart: () => void;
  onToggleWishlist: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function ProductCard({
  name,
  price,
  oldPrice,
  rating,
  reviews,
  image,
  inCart,
  inWishlist,
  cartQuantity = 0,
  onAddToCart,
  onToggleWishlist,
  onEdit,
  onDelete,
}: ProductCardProps) {
  const { t } = useTranslation();
  const [showActions, setShowActions] = useState(false);
  const actionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (actionsRef.current && !actionsRef.current.contains(event.target as Node)) {
        setShowActions(false);
      }
    };

    if (showActions) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showActions]);
  return (
    <article className="bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow w-full rounded-2xl relative" role="listitem">
      <div className="absolute top-3 right-3 z-10" ref={actionsRef}>
        <button
          onClick={() => setShowActions(!showActions)}
          className="p-2 bg-white hover:bg-gray-50 rounded-full shadow-md border border-gray-200 transition-colors"
          aria-label="Actions"
        >
          <FontAwesomeIcon icon={faEllipsisVertical} className="text-gray-700 text-sm" />
        </button>
        
        {showActions && (
          <div className="absolute top-10 right-0 bg-white rounded-lg shadow-lg border border-gray-200 py-1 min-w-[120px] z-20">
            <button
              onClick={() => {
                onEdit?.();
                setShowActions(false);
              }}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faEdit} className="text-blue-500" />
              {t('common.edit') || 'Edit'}
            </button>
            <button
              onClick={() => {
                if (window.confirm(t('products.confirmDelete') || 'Are you sure you want to delete this product?')) {
                  onDelete?.();
                }
                setShowActions(false);
              }}
              className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faTrash} className="text-red-500" />
              {t('common.delete') || 'Delete'}
            </button>
          </div>
        )}
      </div>
      
      <div className="relative bg-gray-50 flex items-center justify-center h-[266px]">
        <img 
          src={image} 
          alt={name}
          className="object-contain w-full h-[266px]"
        />
      </div>

      <div className="flex flex-col px-6 pt-4 pb-6 gap-4">
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
          {name}
        </h3>

        <div className="flex items-center gap-2 min-h-[20px]">
          {!inCart && (
            <>
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <span 
                    key={i} 
                    className="w-[14px] h-[14px]"
                    style={{
                      opacity: 1,
                      fontSize: '14px',
                      lineHeight: '14px',
                      color: i < rating ? '#FAAE42' : '#D1D5DB'
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-xs text-gray-500">({reviews})</span>
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900">${price.toFixed(2)}</span>
          {oldPrice && (
            <span className="text-sm text-gray-400 line-through">${oldPrice.toFixed(2)}</span>
          )}
        </div>

        <div className="flex items-center gap-2 w-full h-[44.59px]">
          <button
            onClick={onAddToCart}
            className={`w-[60%] text-sm font-medium transition-colors rounded-lg ${
              inCart
                ? 'text-white opacity-100'
                : 'bg-primary-100 text-white hover:bg-primary-200'
            }`}
            style={inCart ? {
              borderRadius: '8px',
              paddingTop: '11.3px',
              paddingRight: '21px',
              paddingBottom: '12.29px',
              paddingLeft: '21px',
              borderWidth: '1px',
              borderColor: 'transparent',
              backgroundColor: '#05B171',
              height: '44.59px'
            } : {
              height: '44.59px'
            }}
          >
            {inCart ? `${t('products.card.inCart')} (${cartQuantity})` : t('products.card.addToCart')}
          </button>

          <button
            onClick={onToggleWishlist}
            className="w-[40%] flex items-center justify-end rounded-lg hover:bg-gray-50 transition-colors pr-1 h-[44.59px]"
            aria-label={t('products.card.addToWishlist')}
          >
            <FontAwesomeIcon
              icon={inWishlist ? faHeartSolid : faHeartRegular}
              className={`w-[12.51px] h-[14px] ${inWishlist ? 'text-red-500' : 'text-gray-400'}`}
              style={{
                opacity: 1
              }}
            />
          </button>
        </div>
      </div>
    </article>
  );
}
