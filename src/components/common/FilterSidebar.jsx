import React, { useState } from "react";
import OrangeRangeSlider from "./OrangeRangeSlider";

const priceRanges = [
  { label: "Under ₦2000", min: 0, max: 2000 },
  { label: "₦2000 – ₦5000", min: 2000, max: 5000 },
  { label: "₦5000 – ₦10000", min: 5000, max: 10000 },
  { label: "₦10000 – ₦20000", min: 10000, max: 20000 },
  { label: "₦20000 – ₦40000", min: 20000, max: 40000 },
  { label: "Above ₦40000", min: 40000, max: Infinity }
];

const brands = [
  "Kenwood",
  "SilverCrest",
  "Pinnacle",
  "Andrew James",
  "Binstone",
  "QASA"
];

const conditions = ["Brand New", "Refurbished", "Used"];
const discounts = ["Show All", "With Discount", "Without Discount"];

// Update the function signature to accept currentCategory
export default function FilterSidebar({ filters, setFilters, currentCategory }) {
  // Accordion state
  const [open, setOpen] = useState({
    category: true,
    location: true,
    price: true,
    brand: true,
    condition: true,
    discount: true,
  });
  const [brandSearch, setBrandSearch] = useState("");

  // Handlers
  const handleAccordion = (section) =>
    setOpen((prev) => ({ ...prev, [section]: !prev[section] }));

  const handlePriceRange = (range) => {
    setFilters((prev) => ({
      ...prev,
      price: { min: range.min, max: range.max },
    }));
  };

  const handleBrand = (brand) => {
    setFilters((prev) => ({
      ...prev,
      brand,
    }));
  };

  const handleCondition = (condition) => {
    setFilters((prev) => ({
      ...prev,
      condition,
    }));
  };

  const handleDiscount = (discount) => {
    setFilters((prev) => ({
      ...prev,
      discount,
    }));
  };

  // UI
  return (
    <aside className="w-full min-w-[300px] bg-background  shadow-xl py-10 ">
      {/* CATEGORY */}
      <Section
        title="CATEGORY"
        open={open.category}
        onClick={() => handleAccordion("category")}
        icon={open.category ? "/icons/arrow-up.svg" : "/icons/arrow-down.svg"}
      >
        <p className="px-6 pb-5 text-text-grey text-sm">{currentCategory || 'All Categories'}</p>
      </Section>
      {/* LOCATION */}
      <Section
        title="LOCATION"
        open={open.location}
        onClick={() => handleAccordion("location")}
        icon={open.location ? "/icons/arrow-up.svg" : "/icons/arrow-down.svg"}
      >
        <div className="px-6 pb-4 text-text-grey text-sm">Nationwide</div>
      </Section>
      {/* PRICE */}
      <Section
        title="PRICE"
        open={open.price}
        onClick={() => handleAccordion("price")}
        icon={open.price ? "/icons/arrow-up.svg" : "/icons/arrow-down.svg"}
      >
        <div className="px-6 pb-4">
          {/* Range slider */}
          <div className="flex items-center justify-between my-6">
            <OrangeRangeSlider
              min={0}
              max={50000}
              value={filters.price?.min || 0}
              onChange={e => setFilters(prev => ({
                ...prev,
                price: { ...prev.price, min: Number(e.target.value) },
              }))}
            />
          </div>
          {/* Min/Max inputs and Apply button */}
          <div className="items-center gap-2 mb-3">
            <button
              className="w-full bg-background border border-secondary text-secondary text-sm px-4 py-2 rounded my-4 font-semibold"
              onClick={() => {}}
            >
              APPLY
            </button>
            <div className="py-6 gap-4 flex justify-between items-center">
              <input
                type="number"
                className="border border-[#9E9D9D] rounded px-2 py-1 w-30 text-sm"
                placeholder="Min"
                value={filters.price?.min || ""}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    price: { ...prev.price, min: Number(e.target.value) },
                  }))
                }
              />
              <span className="text-sm text-[#9E9D9D]">—</span>
              <input
                type="number"
                className="border border-[#9E9D9D] rounded px-2 py-1 w-30 text-sm"
                placeholder="Max"
                value={filters.price?.max || ""}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    price: { ...prev.price, max: Number(e.target.value) },
                  }))
                }
              />
            </div>
          </div>
          {/* Price ranges */}
          <div className="flex flex-col gap-1">
            {priceRanges.map((range, i) => (
              <label key={i} className="flex items-center gap-3 text-[#404040] text-sm py-2 cursor-pointer">
                <div className="relative">
                  <input
                    type="radio"
                    name="price"
                    checked={
                      filters.price?.min === range.min &&
                      filters.price?.max === range.max
                    }
                    onChange={() => handlePriceRange(range)}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    filters.price?.min === range.min && filters.price?.max === range.max ? 'border-secondary' : 'border-gray-300'
                  }`}>
                    {filters.price?.min === range.min && filters.price?.max === range.max && (
                      <div className="w-3 h-3 rounded-full bg-background border border-secondary flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-secondary"></div>
                      </div>
                    )}
                  </div>
                </div>
                {range.label}
              </label>
            ))}
          </div>
        </div>
      </Section>
      {/* BRAND */}
      <Section
        title="BRAND"
        open={open.brand}
        onClick={() => handleAccordion("brand")}
        icon={open.brand ? "/icons/arrow-up.svg" : "/icons/arrow-down.svg"}
      >
        <div className="px-6 pb-4">
          <div className="flex items-center border border-[#D9D9D9] rounded mb-3 px-2 py-1">
            <input
              type="text"
              placeholder="Search Brand"
              className="flex-1 p-2 text-sm outline-none bg-transparent"
              value={brandSearch}
              onChange={e => setBrandSearch(e.target.value)}
            />
            <img src="/icons/search-bold.svg" alt="Search" className="w-4 h-4" />
          </div>
          <div className="flex flex-col gap-1 max-h-46 overflow-y-auto sidebar-scrollbar">
            {brands
              .filter(b => b.toLowerCase().includes(brandSearch.toLowerCase()))
              .map((brand, i) => (
                <label key={i} className="flex items-center gap-2 text-sm py-1 cursor-pointer">
                  <div className="relative">
                    <input
                      type="radio"
                      name="brand"
                      checked={filters.brand === brand}
                      onChange={() => handleBrand(brand)}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      filters.brand === brand ? 'border-secondary' : 'border-gray-300'
                    }`}>
                      {filters.brand === brand && (
                        <div className="w-3 h-3 rounded-full bg-background border border-secondary flex items-center justify-center">
                          <div className="w-3 h-3 rounded-full bg-secondary"></div>
                        </div>
                      )}
                    </div>
                  </div>
                  {brand}
                </label>
              ))}
          </div>
        </div>
      </Section>
      {/* CONDITION */}
      <Section
        title="CONDITION"
        open={open.condition}
        onClick={() => handleAccordion("condition")}
        icon={open.condition ? "/icons/arrow-up.svg" : "/icons/arrow-down.svg"}
      >
        <div className="px-6 pb-4">
          <div className="flex flex-col gap-1">
            {conditions.map((cond, i) => (
              <label key={i} className="flex items-center gap-2 text-sm py-1 cursor-pointer">
                <div className="relative">
                  <input
                    type="radio"
                    name="condition"
                    checked={filters.condition === cond}
                    onChange={() => handleCondition(cond)}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    filters.condition === cond ? 'border-secondary' : 'border-gray-300'
                  }`}>
                    {filters.condition === cond && (
                      <div className="w-3 h-3 rounded-full bg-background border border-secondary flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-secondary"></div>
                      </div>
                    )}
                  </div>
                </div>
                {cond}
              </label>
            ))}
          </div>
        </div>
      </Section>
      {/* DISCOUNTS */}
      <Section
        title="DISCOUNTS"
        open={open.discount}
        onClick={() => handleAccordion("discount")}
        icon={open.discount ? "/icons/arrow-up.svg" : "/icons/arrow-down.svg"}
      >
        <div className="px-6 pb-4">
          <div className="flex flex-col gap-1">
            {discounts.map((d, i) => (
              <label key={i} className="flex items-center gap-2 text-sm py-1 cursor-pointer">
                <div className="relative">
                  <input
                    type="radio"
                    name="discount"
                    checked={filters.discount === d}
                    onChange={() => handleDiscount(d)}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    filters.discount === d ? 'border-secondary' : 'border-gray-300'
                  }`}>
                    {filters.discount === d && (
                      <div className="w-3 h-3 rounded-full bg-background border border-secondary flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-secondary"></div>
                      </div>
                    )}
                  </div>
                </div>
                {d}
              </label>
            ))}
          </div>
        </div>
      </Section>
    </aside>
  );
}

// Accordion Section Component
function Section({ title, open, onClick, icon, children }) {
  return (
    <div className="border-b last:border-b-0 border-[#BBBBBB] ">
      <button
        className="w-full flex items-center justify-between px-6 py-6 font-bold text-sm focus:outline-none"
        onClick={onClick}
        type="button"
      >
        {title}
        <img src={icon} alt="" className="w-6 h-6 ml-2" />
      </button>
      {open && children}
    </div>
  );
}