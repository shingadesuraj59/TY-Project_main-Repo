import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({ onSearch, placeholder = "Search experiences, companies, roles, authors..." }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (value) => {
    setSearchTerm(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary-600 transition-colors duration-200" size={20} />
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full pl-12 pr-12 py-4 text-lg border-2 border-primary-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary-300/50 focus:border-primary-500 transition-all duration-300 bg-white text-gray-900 placeholder-gray-400 shadow-lg hover:shadow-xl font-medium"
        />
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition-all duration-200 transform hover:scale-110"
          >
            <X size={18} />
          </button>
        )}
      </div>
      
      {searchTerm && (
        <div className="mt-3 text-sm text-gray-600 text-center">
          Searching for: <span className="font-bold text-primary-700 bg-primary-100 px-2 py-1 rounded-full">"{searchTerm}"</span>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
