// src/components/common/CategoryMenu.jsx
import React, { useState, useRef, useEffect } from "react";
import { categories } from "./categoryData";
import '../../styles/scrollbar.css'; // Import the global scrollbar CSS


export default function CategoryMenu() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  // Handle window resize to detect mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  

  return (
    <div className=" hidden md:block relative w-full shadow-md">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center bg-background px-4 md:px-6 lg:px-10 py-2">
        <button onClick={() => setIsNavOpen(!isNavOpen)} className={`flex items-center px-3 sm:px-6 py-2 sm:py-4 font-medium ${isNavOpen ? 'bg-secondary text-white' : 'bg-background text-text-primary'}`}>
          {isNavOpen ? <img src="/icons/menu-white.svg" className="mr-2 w-5 h-5 sm:w-7 sm:h-7" alt="menu" /> : <img src="/icons/menu.svg" className="mr-2 w-5 h-5 sm:w-7 sm:h-7" alt="menu" />}
          <span className="text-xs sm:text-base">SHOP BY CATEGORY</span>
        </button>
        <div className="flex-1 hidden md:flex items-center space-x-1 sidebar-scrollbar ml-2 sm:ml-8 overflow-x-auto pb-2 mt-2 sm:mt-0 w-full sm:w-auto">
          {categories.map((cat, idx) => (
            <span
              key={cat.name}
              onClick={() => setIsNavOpen(!isNavOpen)}
              className="text-xs sm:text-sm font-medium cursor-pointer hover:text-background hover:bg-secondary whitespace-nowrap py-1 sm:py-2 px-2 sm:px-4"
              onMouseEnter={() => setActiveIndex(idx)}
            >
              {cat.name}
            </span>
          ))}
        </div>
      </div>

      {/* Dropdown Panel */}
      <div className={`absolute left-0 w-full flex flex-col md:flex-row mt-2 z-20 px-2 sm:px-4 md:px-6 lg:px-10 ${isNavOpen ? 'block' : 'hidden'}`}>
        {/* Sidebar - Added max-height and overflow-y-auto for scrollability */}
        <div className="w-full md:w-48 bg-text-grey-light py-3 md:py-6 max-h-[30vh] md:max-h-[70vh] overflow-y-auto sidebar-scrollbar">
          {categories.map((cat, idx) => (
            <div
              key={cat.name}
              className={`px-3 sm:px-6 py-2 sm:py-3 cursor-pointer text-xs sm:text-sm font-medium ${
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
        <div className="flex-1 flex px-4 sm:px-8 py-4 sm:py-8 bg-background max-h-[40vh] md:max-h-[70vh] overflow-y-auto sidebar-scrollbar">
          <CategoryContent category={categories[activeIndex]} />
        </div>
      </div>
    </div>
  );
}

function CategoryContent({ category }) {
  if (!category.sections) {
    return (
      <div className="flex items-center justify-center w-full h-64 text-gray-400">
        <span>No subcategories available.</span>
      </div>
    );
  }
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 flex-1">
        {category.sections.map((section) => (
          <div key={section.title}>
            <h3 className="font-bold text-sm sm:text-base mb-1 sm:mb-2">{section.title}</h3>
            <ul className="space-y-2 sm:space-y-4">
              {section.items.map((item) => (
                <li key={item} className="text-xs sm:text-sm font-medium text-text-secondary hover:text-primary cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {category.image && (
        <div className="mt-4 md:mt-0 md:ml-8 flex-shrink-0 hidden sm:block">
          <img
            src={category.image}
            alt={category.name}
            className="w-40 h-64  lg:w-64 lg:h-100 object-cover rounded-lg shadow"
          />
        </div>
      )}
    </>
  );
}