import React, { useState, useEffect, useRef } from 'react'
import NationwideModal from '../modal/NationwideModal'
import { getSearchSuggestions } from '../data/getSearchSuggestions';
import { useNavigate } from 'react-router-dom';

// Utility function for truncation
function truncate(str, maxLength = 24) {
  if (!str) return "";
  return str.length > maxLength ? str.slice(0, maxLength - 1) + "…" : str;
}

export default function SearchBar() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Handle outside click to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update suggestions when search term changes
  useEffect(() => {
    if (searchTerm.length >= 1) {
      const newSuggestions = getSearchSuggestions(searchTerm);
      setSuggestions(newSuggestions);
      setShowSuggestions(newSuggestions.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setShowSuggestions(false);
    if (term && term.trim().length > 0) {
      navigate(`/search?q=${encodeURIComponent(term.trim())}`);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
    handleSearch(suggestion);
  };

  return (
    <div className="shadow-xl my-4 md:my-0 items-center flex-1 max-w-[900px] relative mx-4 md:mx-10 px-0 xl:px-10" ref={searchRef}>
      <div className="relative flex items-center w-full">
        <NationwideModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          setSelectedCity={setSelectedCity}
        />
        <button
          onClick={() => setModalOpen(true)}
          className="absolute left-3 text-gray-400 z-10"
        >
          <span className="text-xs uppercase font-bold text-text-primary flex items-center border-r px-2 border-[#DBDBDB]">
            {selectedCity ? truncate(selectedCity, 8) : "NATIONWIDE"}
            <img src="/icons/arrow-down.svg" alt="Dropdown" className="ml-2 w-4 h-4" />
          </span>
        </button>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => searchTerm.length >= 1 && suggestions.length > 0 && setShowSuggestions(true)}
          placeholder="I'm searching for..."
          className="w-full pl-36 pr-10 py-2 bg-background rounded-md focus:outline-none text-[#A7A7A7] focus:border-transparent"
        />
        <button 
          className="absolute right-0 bg-secondary p-3 rounded-r-md hover:bg-secondary-light"
          onClick={() => handleSearch(searchTerm)}
        >
          <img src="/icons/search.svg" alt="Search" className="w-4 h-4" />
        </button>
      </div>

      {/* Search Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute max-w-[900px] top-full left-0 right-0 bg-background rounded-lg shadow-lg z-10 mt-1 mx-0 md:mx-4 md:mx-10 px-1">
          <div className="max-h-100 overflow-y-auto sidebar-scrollbar">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full text-left px-4 py-3 hover:bg-gray-50 text-gray-700 text-sm transition-colors duration-150"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
