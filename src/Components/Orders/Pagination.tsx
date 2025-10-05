import { useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const pageNumbers = useMemo(() => {
    const pages: (number | string)[] = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      pages.push(totalPages);
    }

    return pages;
  }, [currentPage, totalPages]);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number | string) => {
    if (typeof page === 'number') {
      onPageChange(page);
    }
  };

  return (
    <nav 
      className="flex items-center justify-center gap-1 sm:gap-2 mt-4 md:mt-6 mb-4 px-2" 
      aria-label="Pagination navigation"
      role="navigation"
    >
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`
          flex items-center justify-center px-2 sm:px-3 md:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all
          ${currentPage === 1 
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
            : 'bg-white text-gray-700 hover:bg-primary-100 hover:text-white border border-gray-200'
          }
        `}
        aria-label={t('pagination.previous')}
      >
        <span>«</span>
      </button>

      <div className="flex items-center gap-1 sm:gap-2">
        {pageNumbers.map((page, index) => (
          <button
            key={index}
            onClick={() => handlePageClick(page)}
            disabled={page === '...'}
            className={`
              min-w-[2rem] sm:min-w-[2.5rem] px-1 sm:px-2 md:px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all
              ${page === currentPage 
                ? 'bg-primary-100 text-white shadow-md' 
                : page === '...'
                ? 'bg-transparent text-gray-400 cursor-default'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }
            `}
            aria-label={typeof page === 'number' ? t('pagination.page', { page }) : undefined}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`
          flex items-center justify-center px-2 sm:px-3 md:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all
          ${currentPage === totalPages 
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
            : 'bg-white text-gray-700 hover:bg-primary-100 hover:text-white border border-gray-200'
          }
        `}
        aria-label={t('pagination.next')}
      >
        <span>»</span>
      </button>
    </nav>
  );
}


