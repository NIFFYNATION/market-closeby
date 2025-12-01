import React from "react";
import { Skeleton, SkeletonText, SkeletonImage, SkeletonCircle } from "../common/Skeleton";

const ProductDetailsSkeleton = () => {
  return (
    <div className="min-h-screen py-8">
      {/* Header */}
      <div className="px-6 mb-6">
        <Skeleton className="h-5 w-40 mb-2" />
        <Skeleton className="h-8 w-64" />
      </div>

      <div className="flex flex-col lg:flex-row gap-6 px-6">
        {/* Left: Image and Gallery */}
        <div className="bg-background shadow-xl flex flex-col md:flex-row w-full lg:w-[80%]">
          <div className="p-6 mb-4 w-full">
            <SkeletonImage className="w-80 h-80 mx-auto" />
            <div className="flex gap-6 mt-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="w-18 h-16 rounded" />
              ))}
            </div>
            {/* Share */}
            <div className="py-8">
              <Skeleton className="h-3 w-40 mb-3" />
              <div className="flex gap-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <SkeletonCircle key={i} size="h-10 w-10" />
                ))}
              </div>
            </div>
          </div>

          {/* Center: Info */}
          <div className="p-6 flex-1 space-y-4">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-7 w-72" />
            <SkeletonText lines={2} />
            <div className="border-b border-gray-200 mb-2 pt-2" />
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-4 w-32" />
            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10" />
                <Skeleton className="h-10 w-12" />
                <Skeleton className="h-10 w-10" />
                <Skeleton className="h-4 w-28" />
              </div>
              <div className="flex flex-col lg:flex-row gap-3">
                <Skeleton className="h-11 w-40 rounded-full" />
                <Skeleton className="h-11 w-40 rounded-full" />
              </div>
            </div>
            <div className="border-y border-gray-200 py-6">
              <Skeleton className="h-4 w-64" />
            </div>
          </div>
        </div>

        {/* Right: Shipping and Returns */}
        <div className="bg-background shadow-xl w-full lg:w-80">
          <Skeleton className="h-5 w-48 m-6" />
          <div className="px-6 space-y-3">
            <Skeleton className="h-4 w-56" />
            <Skeleton className="h-4 w-52" />
            <Skeleton className="h-4 w-48" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;

