import React, { useState } from 'react'
import NationwideModal from '../modal/NationwideModal'


// Utility function for truncation
function truncate(str, maxLength = 24) {
  if (!str) return "";
  return str.length > maxLength ? str.slice(0, maxLength - 1) + "…" : str;
}

export default function SearchBar() {

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null); // <-- NEW

  return (
    <div className="shadow-xl my-4 md:my-0 items-center flex-1 max-w-[900px] relative mx-4 md:mx-10 px-0 xl:px-10">
              <div className=" relative flex items-center w-full">
                <NationwideModal
                  isOpen={modalOpen}
                  onClose={() => setModalOpen(false)}
                  setSelectedCity={setSelectedCity}
                />
                <button
                  onClick={() => setModalOpen(true)}
                  className="absolute left-3 text-gray-400"
                >
                  <span className="text-xs uppercase font-bold text-text-primary flex items-center border-r px-2 border-[#DBDBDB]">
                    {selectedCity ? truncate(selectedCity, 8) : "NATIONWIDE"}
                    <img src="/icons/arrow-down.svg" alt="Dropdown" className="ml-2 w-4 h-4" />
                  </span>
                </button>
                <input
                  type="text"
                  placeholder="I'm searching for..."
                  className="w-full pl-36 pr-10 py-2 bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-[#130C76] text-[#A7A7A7] focus:border-transparent"
                />
                <button className="absolute right-0 bg-secondary p-3 rounded-r-md hover:bg-secondary-light">
                  <img src="/icons/search.svg" alt="Search" className="w-4 h-4" />
                </button>
              </div>
            </div>
  )
}
