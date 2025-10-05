import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NotificationButtonProps } from '../../types';

export default function NotificationButton({ icon, count, label }: NotificationButtonProps) {
  return (
    <button 
      className="relative p-1.5 text-gray-500 hover:text-gray-700 transition-colors" 
      aria-label={label}
    >
      <FontAwesomeIcon icon={icon} className="text-lg" />
      {count > 0 && (
        <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-medium rounded-full flex items-center justify-center">
          {count}
        </span>
      )}
    </button>
  );
}

