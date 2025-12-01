import React from "react";
import ProductCardSkeleton from "../cards/ProductCardSkeleton";

const GridSkeleton = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
};

export default GridSkeleton;

