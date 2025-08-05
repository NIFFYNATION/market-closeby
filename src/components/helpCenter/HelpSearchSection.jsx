import React from 'react';

const HelpSearchSection = ({ 
  title, 
  description, 
  searchQuery, 
  setSearchQuery, 
  onSearch, 
  containerClassName = "p-8 mb-12",
  titleClassName = "text-2xl md:text-3xl font-semibold text-center text-gray-800 mb-4",
  descriptionClassName = "text-center mb-8 max-w-2xl mx-auto",
  searchContainerClassName = "max-w-2xl mx-auto mb-12"
}) => {
  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    } else {
      console.log('Searching for:', searchQuery);
    }
  };

  return (
    <div className={containerClassName}>
      {/* Section Title */}
      <h2 className={titleClassName}>
        {title}
      </h2>
      
      {/* Section Description */}
      <p className={descriptionClassName}>
        {description}
      </p>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className={searchContainerClassName}>
        <div className="relative flex">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for answer..."
            className="flex-1 px-6 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent text-gray-700 placeholder-gray-400"
          />
          <button
            type="submit"
            className="bg-secondary absolute right-0 hover:bg-secondary-light px-8 py-[19px] rounded-r-lg transition-colors duration-200 flex items-center justify-center"
          >
            <img src="/icons/search.svg" alt="Search" className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default HelpSearchSection;