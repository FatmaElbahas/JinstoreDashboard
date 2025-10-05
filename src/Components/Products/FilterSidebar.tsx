import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { ProductFilters } from '../../types';

interface FilterSidebarProps {
  onFilterChange: (filters: ProductFilters) => void;
}

export default function FilterSidebar({ onFilterChange }: FilterSidebarProps) {
  const { t } = useTranslation();
  const [keyword, setKeyword] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['all']);
  const [priceRange, setPriceRange] = useState<[number, number]>([1, 2000]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [expandedSections, setExpandedSections] = useState({
    keywords: true,
    categories: true,
    price: true,
    colors: true
  });

  useEffect(() => {
    onFilterChange({
      keyword,
      categories: selectedCategories,
      priceRange,
      colors: selectedColors
    });
  }, [keyword, selectedCategories, priceRange, selectedColors, onFilterChange]);

  const categories = [
    { id: 'all', label: t('products.filterSidebar.all') },
    { id: 'beverages', label: t('products.filters.beverages') },
    { id: 'snacks', label: t('products.filters.snacks') },
    { id: 'food', label: t('products.filters.food') },
  ];

  const colors = [
    { id: 'blue', color: '#1FA0C6', name: 'Blue' },
    { id: 'green', color: '#008000', name: 'Green' },
    { id: 'pink', color: '#C61FAA', name: 'Pink' },
    { id: 'mint', color: '#1FC662', name: 'Mint' },
    { id: 'lime', color: '#9DC61F', name: 'Lime' },
    { id: 'orange', color: '#C67B1F', name: 'Orange' },
  ];

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleCategoryChange = (categoryId: string) => {
    if (categoryId === 'all') {
      setSelectedCategories(['all']);
    } else {
      const newCategories = selectedCategories.includes(categoryId)
        ? selectedCategories.filter(c => c !== categoryId && c !== 'all')
        : [...selectedCategories.filter(c => c !== 'all'), categoryId];
      setSelectedCategories(newCategories.length === 0 ? ['all'] : newCategories);
    }
  };

  const handleColorChange = (colorId: string) => {
    setSelectedColors(prev =>
      prev.includes(colorId) ? prev.filter(c => c !== colorId) : [...prev, colorId]
    );
  };

  return (
    <aside className="w-full lg:w-[33.3%] bg-white rounded-xl shadow-sm p-6 h-fit sticky top-24" role="complementary" aria-label="Product filters">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('products.filterSidebar.title')}</h2>

      <div className="space-y-5">
        <div>
          <button
            onClick={() => toggleSection('keywords')}
            className="flex items-center justify-between w-full mb-1.5"
          >
            <h3 className="text-sm font-medium text-gray-900">{t('products.filterSidebar.keywords')}</h3>
            <FontAwesomeIcon
              icon={expandedSections.keywords ? faChevronUp : faChevronDown}
              className="text-xs text-gray-400"
            />
          </button>
          {expandedSections.keywords && (
            <div className="relative mt-1">
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder={t('products.filterSidebar.keywordsPlaceholder')}
                className="w-full pl-4 pr-10 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-100"
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"
              />
            </div>
          )}
        </div>

        <div>
          <div className="h-2 bg-primary-50 -mx-6 mb-2 rounded"></div>
          <button
            onClick={() => toggleSection('categories')}
            className="flex items-center justify-between w-full mb-1.5"
          >
            <h3 className="text-sm font-medium text-gray-900">{t('products.filterSidebar.categories')}</h3>
            <FontAwesomeIcon
              icon={expandedSections.categories ? faChevronUp : faChevronDown}
              className="text-xs text-gray-400"
            />
          </button>
          {expandedSections.categories && (
            <div className="space-y-1 mt-1">
              {categories.map((category) => (
                <label key={category.id} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => handleCategoryChange(category.id)}
                    className="w-4 h-4 text-primary-100 rounded border-gray-300 focus:ring-primary-100"
                  />
                  <span className="text-sm text-gray-700">{category.label}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="h-2 bg-primary-50 -mx-6 mb-2 rounded"></div>
          <button
            onClick={() => toggleSection('price')}
            className="flex items-center justify-between w-full mb-1.5"
          >
            <h3 className="text-sm font-medium text-gray-900">{t('products.filterSidebar.price')}</h3>
            <FontAwesomeIcon
              icon={expandedSections.price ? faChevronUp : faChevronDown}
              className="text-xs text-gray-400"
            />
          </button>
          {expandedSections.price && (
            <div className="space-y-4 mt-3">
              <div className="relative pt-8 pb-2">
                <div className="relative h-1 bg-gray-200 rounded-full">
                  <div
                    className="absolute h-full bg-primary-100 rounded-full"
                    style={{
                      left: `${(priceRange[0] / 2000) * 100}%`,
                      right: `${100 - (priceRange[1] / 2000) * 100}%`
                    }}
                  />
                  
                  <input
                    type="range"
                    min="1"
                    max="2000"
                    value={priceRange[0]}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (val < priceRange[1]) {
                        setPriceRange([val, priceRange[1]]);
                      }
                    }}
                    className="absolute w-full h-1 bg-transparent appearance-none pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-primary-100 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-3 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-primary-100 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-3 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-lg"
                    style={{ zIndex: priceRange[0] > 1000 ? 5 : 3 }}
                  />
                  
                  <input
                    type="range"
                    min="1"
                    max="2000"
                    value={priceRange[1]}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (val > priceRange[0]) {
                        setPriceRange([priceRange[0], val]);
                      }
                    }}
                    className="absolute w-full h-1 bg-transparent appearance-none pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-primary-100 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-3 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-primary-100 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-3 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-lg"
                    style={{ zIndex: priceRange[1] <= 1000 ? 5 : 3 }}
                  />
                  
                  <div
                    className="absolute -top-7 -translate-x-1/2 bg-primary-100 text-white text-xs font-semibold px-2 py-1 rounded"
                    style={{ left: `${(priceRange[0] / 2000) * 100}%` }}
                  >
                    ${priceRange[0]}
                  </div>
                  <div
                    className="absolute -top-7 -translate-x-1/2 bg-primary-100 text-white text-xs font-semibold px-2 py-1 rounded"
                    style={{ left: `${(priceRange[1] / 2000) * 100}%` }}
                  >
                    ${priceRange[1]}
                  </div>
                </div>
                
                <div className="flex justify-between mt-3 text-xs text-gray-400">
                  <span>$1</span>
                  <span>501</span>
                  <span>1001</span>
                  <span>1501</span>
                  <span>$2,000</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div>
          <div className="h-2 bg-primary-50 -mx-6 mb-2 rounded"></div>
          <button
            onClick={() => toggleSection('colors')}
            className="flex items-center justify-between w-full mb-1.5"
          >
            <h3 className="text-sm font-medium text-gray-900">{t('products.filterSidebar.colors')}</h3>
            <FontAwesomeIcon
              icon={expandedSections.colors ? faChevronUp : faChevronDown}
              className="text-xs text-gray-400"
            />
          </button>
          {expandedSections.colors && (
            <div className="flex items-center gap-2 flex-wrap mt-1">
              {colors.map((color) => (
                <button
                  key={color.id}
                  onClick={() => handleColorChange(color.id)}
                  className={`rounded relative transition-all hover:scale-110 ${
                    selectedColors.includes(color.id) ? 'ring-2 ring-gray-900 ring-offset-2' : ''
                  }`}
                  style={{ 
                    backgroundColor: color.color,
                    width: '21px',
                    height: '23.1px',
                    opacity: 1,
                    paddingTop: '2.1px',
                    transform: 'rotate(0deg)'
                  }}
                  title={color.name}
                  aria-label={`Filter by ${color.name} color`}
                >
                  {selectedColors.includes(color.id) && (
                    <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-[10px] drop-shadow">
                      ✓
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
