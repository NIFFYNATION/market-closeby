// src/components/common/NationwideModal.jsx
import React, { useState, useRef, useEffect } from "react";
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
  

  return (
    
    
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md">
      <div
        className="bg-white rounded-2xl shadow-xl w-[90vw] max-w-5xl p-8 relative"
        ref={modalRef}
      >
        {/* Header */}
        <div className="grid md:grid-cols-2 items-center mb-10">
          {selectedState ? (
            <button
              className="text-primary font-bold flex items-center mr-4"
              onClick={handleBack}
            >
              <img src="/icons/arrow-back.svg" alt="Arrow Back" className="w-5 h-5"/>
              Nationwide - Nigeria <span className="mx-2">-</span> {selectedState.name}
            </button>
          ) : (
            <span className="text-primary font-bold text-lg mr-4">
              Nationwide - Nigeria
            </span>
          )}
          <div className="flex-1 flex justify-center md:justify-end">
            <SearchBar value={search} onChange={setSearch} />
          </div>
        </div>
        {/* Content */}
        <div className="overflow-y-auto max-h-[60vh] sidebar-scrollbar">
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
}

function StateList({ groupedStates, onStateClick }) {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      {Object.keys(groupedStates)
        .sort()
        .map((letter) => (
          <div key={letter}>
            <div className="font-bold text-primary mb-2">{letter}</div>
            <ul>
              {groupedStates[letter].map((state) => (
                <li
                  key={state.name}
                  className="flex items-center justify-between py-4 px-2 cursor-pointer hover:bg-gray-100 "
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
    <div className="grid md:grid-cols-3 gap-8">
      {Object.keys(groupedCities)
        .sort()
        .map((letter) => (
          <div key={letter}>
            <div className="font-bold text-primary mb-2">{letter}</div>
            <ul>
              {groupedCities[letter].map((city) => (
                <li
                  key={city}
                  className="py-4 px-2 cursor-pointer hover:bg-gray-100 border-b border-[#BBBBBB] inline-block"
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
    <div className="relative w-75 mt-6 md:mt-0">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search for items in your state or LGA..."
        className="w-full pl-4 text-sm pr-10 py-3 rounded-md shadow-lg focus:outline-none focus:ring-1 focus:ring-[#130C76] text-[#A7A7A7] focus:border-transparent"
      />
      <button className="absolute right-0 bg-secondary p-[14px] rounded-r-md hover:bg-secondary-light">
        <img src="/icons/search.svg" alt="search" className="w-4 h-4" />
      </button>



    </div>
  );
}