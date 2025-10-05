import { useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useProducts } from '../../context/ProductsContext';
import PageLayout from '../../Components/Layout/PageLayout';
import ProductCard from '../../Components/Products/ProductCard';
import FilterSidebar from '../../Components/Products/FilterSidebar';
import CustomSelect from '../../Components/Orders/CustomSelect';
import { ProductFilters } from '../../types';


export default function ProductsGridView() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const { addToCart, isInCart, items } = useCart();
  const { products, deleteProduct } = useProducts();
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [filters, setFilters] = useState({ category: 'all', sort: 'default', items: 10 });
  const [sidebarFilters, setSidebarFilters] = useState<ProductFilters | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const toggleWishlist = (id: number) => {
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredProducts = products.filter(product => {
    if (searchTerm && searchTerm.trim() !== '') {
      if (!product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
    }

    if (filters.category !== 'all' && product.category !== filters.category) {
      return false;
    }

    if (sidebarFilters) {
      if (sidebarFilters.keyword && sidebarFilters.keyword.trim() !== '') {
        if (!product.name.toLowerCase().includes(sidebarFilters.keyword.toLowerCase())) {
          return false;
        }
      }

      if (sidebarFilters.categories && sidebarFilters.categories.length > 0 && !sidebarFilters.categories.includes('all')) {
        if (!sidebarFilters.categories.includes(product.category)) {
          return false;
        }
      }

      if (sidebarFilters.priceRange && Array.isArray(sidebarFilters.priceRange)) {
        const [min, max] = sidebarFilters.priceRange;
        if (product.price < min || product.price > max) {
          return false;
        }
      }

      if (sidebarFilters.colors && sidebarFilters.colors.length > 0) {
        if (!product.color || !sidebarFilters.colors.includes(product.color)) {
          return false;
        }
      }
    }

    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (filters.sort === 'price-low') return a.price - b.price;
    if (filters.sort === 'price-high') return b.price - a.price;
    if (filters.sort === 'rating') return b.rating - a.rating;
    return 0;
  });

  const totalPages = Math.ceil(sortedProducts.length / filters.items);
  const startIndex = (currentPage - 1) * filters.items;
  const endIndex = startIndex + filters.items;
  const displayedProducts = sortedProducts.slice(startIndex, endIndex);

  const handleFilterChange = (key: string, value: string | number) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleSidebarFilterChange = useCallback((filters: ProductFilters) => {
    setSidebarFilters(filters);
    setCurrentPage(1);
  }, []);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  }, []);

  const handleEditProduct = (id: number) => {
    navigate(`/edit-product/${id}`);
  };

  const handleDeleteProduct = (id: number) => {
    deleteProduct(id);
  };

  return (
    <PageLayout 
      title="Products - JinStore"
      description="Browse our wide selection of products at JinStore. Find beverages, snacks, and food items at great prices."
      onSearch={handleSearch}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="flex-1 pl-2 pr-4 md:pl-2 md:pr-4 pt-8 pb-4">
        <header className="mb-6">
          <h1 className="sr-only">{t('products.title')}</h1>
          <nav className="flex items-center gap-2 text-sm mb-4" aria-label="Breadcrumb">
            <a href="/" className="flex items-center gap-2 text-primary-100 hover:text-primary-200">
              <FontAwesomeIcon icon={faGlobe} className="text-sm" />
              {t('products.breadcrumb.dashboard')}
            </a>
            <span className="text-gray-400">›</span>
            <span className="text-gray-900 font-medium">{t('products.breadcrumb.products')}</span>
          </nav>
        </header>

        <div className="flex flex-col lg:flex-row gap-4">
          <div className="lg:w-[66.7%]">
            <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-6">
              <div className="w-auto">
                <CustomSelect
                  options={[
                    { value: 'all', label: t('products.filters.allProducts') },
                    { value: 'beverages', label: t('products.filters.beverages') },
                    { value: 'snacks', label: t('products.filters.snacks') },
                    { value: 'food', label: t('products.filters.food') },
                  ]}
                  value={filters.category}
                  onChange={(value) => handleFilterChange('category', value as string)}
                  ariaLabel="Filter by category"
                />
              </div>

              <div className="w-auto">
                <CustomSelect
                  options={[
                    { value: 'default', label: t('products.filters.sort') },
                    { value: 'price-low', label: t('products.filters.sortPriceLow') },
                    { value: 'price-high', label: t('products.filters.sortPriceHigh') },
                    { value: 'rating', label: t('products.filters.sortRating') },
                  ]}
                  value={filters.sort}
                  onChange={(value) => handleFilterChange('sort', value as string)}
                  ariaLabel="Sort by"
                />
              </div>

              <div className="w-auto">
                <CustomSelect
                  options={[
                    { value: 6, label: '6' },
                    { value: 10, label: '10' },
                    { value: 20, label: '20' },
                    { value: 50, label: '50' },
                  ]}
                  value={filters.items}
                  onChange={(value) => handleFilterChange('items', value as number)}
                  ariaLabel="Items per page"
                />
              </div>

              <button className="ml-auto px-4 md:px-6 py-2 bg-primary-100 text-white rounded-lg text-sm font-medium hover:bg-primary-200 transition-colors">
                {t('products.filters.actions')}
              </button>
            </div>

            {displayedProducts.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm" role="status" aria-live="polite">
                <p className="text-gray-500 text-lg mb-2">😔 {t('products.noProducts') || 'No products found'}</p>
                <p className="text-gray-400 text-sm">{t('products.tryDifferentFilters') || 'Try adjusting your filters'}</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5" role="list" aria-label="Products grid">
                  {displayedProducts.map((product) => {
                    const cartItem = items.find(item => item.id === product.id);
                    return (
                      <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        oldPrice={product.oldPrice}
                        rating={product.rating}
                        reviews={product.reviews}
                        image={product.image}
                        inCart={isInCart(product.id)}
                        cartQuantity={cartItem?.quantity || 0}
                        inWishlist={wishlist.includes(product.id)}
                        onAddToCart={() => addToCart(product)}
                        onToggleWishlist={() => toggleWishlist(product.id)}
                        onEdit={() => handleEditProduct(product.id)}
                        onDelete={() => handleDeleteProduct(product.id)}
                      />
                    );
                  })}
                </div>

                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-1 mt-8">
                    <button 
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="w-8 h-8 flex items-center justify-center rounded text-gray-500 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      ‹
                    </button>
                    
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`w-8 h-8 flex items-center justify-center rounded font-medium text-sm transition-colors ${
                          currentPage === i + 1
                            ? 'bg-primary-100 text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    
                    <button 
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className="w-8 h-8 flex items-center justify-center rounded text-gray-500 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      ›
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          <FilterSidebar onFilterChange={handleSidebarFilterChange} />
        </div>
      </div>
    </PageLayout>
  );
}
