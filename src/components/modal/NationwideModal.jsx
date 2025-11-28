// src/components/modal/NationwideModal.jsx
import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { statesAndCities } from "../common/locationsData";


function groupByFirstLetter(items, key = null) {
  return items.reduce((acc, item) => {
    const label = key ? item[key] : item;
    const letter = label[0].toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(item);
    return acc;
  }, {});
  
}

export default function NationwideModal({ isOpen, onClose, setSelectedCity }) {
  
  
  const [selectedState, setSelectedState] = useState(null);
  const [search, setSearch] = useState("");
  const modalRef = useRef(null);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original || "";
      };
    }
  }, [isOpen]);

  // Close on outside click
  useEffect(() => {
    function handleClick(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Filter states/cities by search
  const filteredStates = search
    ? statesAndCities.filter((s) =>
        s.name.toLowerCase().includes(search.toLowerCase())
      )
    : statesAndCities;

  const groupedStates = groupByFirstLetter(filteredStates, "name");

  const handleStateClick = (state) => setSelectedState(state);

  const handleBack = () => setSelectedState(null);
  

  // For city search
  let cityList = [];
  if (selectedState) {
    cityList = selectedState.cities.filter((city) =>
      city.toLowerCase().includes(search.toLowerCase())
    );
  }
  const groupedCities = groupByFirstLetter(cityList);
  

  const modalContent = (
    <div className="fixed inset-0 z-[80] flex md:items-center items-end justify-center bg-black/70 backdrop-blur-sm">
      <div
        className="bg-white md:rounded-2xl rounded-t-2xl shadow-xl w-full md:w-[90vw] md:max-w-5xl p-5 md:p-8 relative max-h-[90vh] md:max-h-[70vh] flex flex-col"
        ref={modalRef}
      >
        {/* Drag handle for mobile */}
        <div className="md:hidden flex justify-center">
          <span className="block w-12 h-1.5 bg-gray-300 rounded-full" />
        </div>
        {/* Header */}
        <div className="grid md:grid-cols-2 items-center mb-6 md:mb-8">
          {selectedState ? (
            <button
              className="text-primary font-bold flex items-center mr-4"
              onClick={handleBack}
            >
              <img src="/icons/arrow-back.svg" alt="Arrow Back" className="w-5 h-5"/>
              Nationwide - Nigeria <span className="mx-2">-</span> {selectedState.name}
            </button>
          ) : (
            <span className="text-primary font-extrabold text-lg md:text-xl mr-4">
              Nationwide - Nigeria
            </span>
          )}
          <div className="flex-1 flex justify-center md:justify-end">
            <SearchBar value={search} onChange={setSearch} />
          </div>
        </div>
        {/* Content */}
        <div className="overflow-y-auto md:max-h-[60vh] max-h-[70vh] sidebar-scrollbar">
          {!selectedState ? (
            <StateList groupedStates={groupedStates} onStateClick={handleStateClick} />
          ) : (
            <CityList
              groupedCities={groupedCities}
              stateName={selectedState.name}
              onCityClick={(city) => {
                setSelectedCity(city);
                onClose();
              }}
            />
          )}
        </div>
      </div>
    </div>
  );

  return isOpen ? createPortal(modalContent, document.body) : null;
}

function StateList({ groupedStates, onStateClick }) {
  return (
    <div className="grid md:grid-cols-3 gap-4 md:gap-8">
      {Object.keys(groupedStates)
        .sort()
        .map((letter) => (
          <div key={letter}>
            <div className="font-bold text-primary mb-2">{letter}</div>
            <ul>
              {groupedStates[letter].map((state) => (
                <li
                  key={state.name}
                  className="flex items-center justify-between py-3 px-3 cursor-pointer hover:bg-gray-100 rounded-lg"
                  onClick={() => onStateClick(state)}
                >
                  {state.name}
                  <span className="text-gray-400 text-2xl">&#8250;</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
    </div>
  );
}

function CityList({ groupedCities, stateName, onCityClick }) {
  return (
    <div className="grid md:grid-cols-3 gap-4 md:gap-8">
      {Object.keys(groupedCities)
        .sort()
        .map((letter) => (
          <div key={letter}>
            <div className="font-bold text-primary mb-2">{letter}</div>
            <ul>
              {groupedCities[letter].map((city) => (
                <li
                  key={city}
                  className="py-3 px-3 cursor-pointer hover:bg-gray-100 rounded-lg"
                  onClick={() => onCityClick(`${city}`)}
                >
                  {city} - {stateName}
                </li>
              ))}
            </ul>
          </div>
        ))}
    </div>
  );
}

function SearchBar({ value, onChange }) {
  return (
    <div className="relative w-full md:w-80 mt-4 md:mt-0">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search states or cities..."
        className="w-full pl-4 text-sm pr-10 py-3 rounded-md shadow-lg focus:outline-none focus:ring-1 focus:ring-[#130C76] text-[#333] placeholder-gray-400 focus:border-transparent"
      />
      <div className="absolute right-0 top-0 h-full flex items-center">
        <span className="bg-secondary p-[12px] rounded-r-md">
          <img src="/icons/search.svg" alt="search" className="w-4 h-4" />
        </span>
      </div>



    </div>
  );
}
