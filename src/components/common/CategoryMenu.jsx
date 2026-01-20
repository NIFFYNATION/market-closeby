// src/components/common/CategoryMenu.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { categories } from "./categoryData";
import '../../styles/scrollbar.css'; // Import the global scrollbar CSS


export default function CategoryMenu() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();

  // Navigation handler for categories
  const handleCategoryNavigation = (categoryName) => {
    setIsNavOpen(false);
    const slug = categoryName
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/\s+/g, '-');
    navigate(`/category/${slug}`);
  };

  // Navigation handler for search terms (sections and items)
  const handleSearchNavigation = (searchTerm) => {
    setIsNavOpen(false);
    navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <div className="relative w-full shadow-md">
      {/* Top Bar */}
      <div className="hidden md:flex items-center bg-background px-4 md:px-6 lg:px-10 py-2">
        <button onClick={() => setIsNavOpen(!isNavOpen)} className={`flex items-center px-6 py-4  font-medium ${isNavOpen ? 'bg-secondary text-white' : 'bg-background text-text-primary'}`}>
          {isNavOpen ? <img src="/icons/menu-white.png" className="mr-2 w-7 h-7" alt="menu" /> : <img src="/icons/menu.svg" className="mr-2 w-7 h-7" alt="menu" />}
          SHOP BY CATEGORY
        </button>
        <div className="flex-1 flex items-center space-x-1 sidebar-scrollbar ml-8 overflow-x-auto pb-2">
          {categories.map((cat, idx) => (
            <span
              key={cat.name}
              onClick={() => handleCategoryNavigation(cat.name)}
              className="text-sm font-medium cursor-pointer hover:text-background hover:bg-secondary whitespace-nowrap py-2 px-4"
              onMouseEnter={() => setActiveIndex(idx)}
            >
              {cat.name}
            </span>
          ))}
        </div>
      </div>

      {/* Dropdown Panel */}
      <div className={`absolute left-0 w-full  flex mt-2 z-10 px-4 md:px-6 lg:px-10  ${isNavOpen ? 'block' : 'hidden'}`}>
        {/* Sidebar - Added max-height and overflow-y-auto for scrollability */}
        <div className="w-48 bg-text-grey-light py-6 max-h-[70vh] overflow-y-auto sidebar-scrollbar ">
          {categories.map((cat, idx) => (
            <div
              key={cat.name}
              onClick={() => handleCategoryNavigation(cat.name)}
              className={`px-6 py-3 cursor-pointer text-sm font-medium ${
                idx === activeIndex
                  ? "bg-background text-primary border-l-4 border-yellow-400"
                  : "text-text-secondary hover:bg-gray-100"
              }`}
              onMouseEnter={() => setActiveIndex(idx)}
            >
              {cat.name}
            </div>
          ))}
        </div>
        {/* Content - Added max-height and overflow-y-auto for scrollability */}
        <div className="flex-1 flex px-8 py-8 bg-background max-h-[70vh] overflow-y-auto sidebar-scrollbar">
          <CategoryContent 
            category={categories[activeIndex]} 
            onSectionClick={handleSearchNavigation}
            onItemClick={handleSearchNavigation}
          />
        </div>
      </div>
    </div>
  );
}

function CategoryContent({ category, onSectionClick, onItemClick }) {
  if (!category.sections) {
    return (
      <div className="flex items-center justify-center w-full h-64 text-gray-400">
        <span>No subcategories available.</span>
      </div>
    );
  }
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 flex-1">
        {category.sections.map((section) => (
          <div key={section.title}>
            <h3 
              onClick={() => onSectionClick(section.title)}
              className="font-bold mb-2 cursor-pointer hover:text-primary transition-colors"
            >
              {section.title}
            </h3>
            <ul className="space-y-4">
              {section.items.map((item) => (
                <li 
                  key={item} 
                  onClick={() => onItemClick(item)}
                  className="text-sm font-medium text-text-secondary hover:text-primary cursor-pointer transition-colors"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {category.image && (
        <div className="ml-8 flex-shrink-0 hidden md:block">
          <img
            src={category.image}
            alt={category.name}
            className="w-64 h-100 object-cover rounded-lg shadow"
          />
        </div>
      )}
    </>
  );
}