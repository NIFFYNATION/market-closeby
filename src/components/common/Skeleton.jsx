import React from "react";

const cn = (...classes) => classes.filter(Boolean).join(" ");

export const Skeleton = ({ className = "", rounded = "rounded-md" }) => {
  return (
    <div className={cn("bg-gray-200 skeleton-shimmer", rounded, className)} />
  );
};

export const SkeletonText = ({ lines = 3, className = "", gap = "space-y-2" }) => {
  const widths = ["w-11/12", "w-9/12", "w-10/12", "w-8/12"]; // varied widths for realism
  return (
    <div className={gap}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className={cn("h-3", widths[i % widths.length], className)} rounded="rounded" />
      ))}
    </div>
  );
};

export const SkeletonCircle = ({ size = "h-10 w-10", className = "" }) => (
  <Skeleton className={cn(size, className)} rounded="rounded-full" />
);

export const SkeletonImage = ({ className = "", aspect = "h-40" }) => (
  <Skeleton className={cn("w-full", aspect, className)} rounded="rounded-lg" />
);

export default Skeleton;

