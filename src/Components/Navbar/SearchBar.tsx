import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { SearchBarProps } from '../../types';

export default function SearchBar({ placeholder = "Search...", onChange }: SearchBarProps) {
  return (
    <div className="relative flex-1 max-w-4xl">
      <FontAwesomeIcon 
        icon={faSearch} 
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" 
      />
      <input
        type="search"
        placeholder={placeholder}
        onChange={onChange}
        className="pl-10 pr-4 py-2 w-full bg-white border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-100"
        aria-label="Search"
      />
    </div>
  );
}

