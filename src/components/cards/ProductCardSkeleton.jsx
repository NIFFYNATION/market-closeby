import React from "react";
import { Skeleton, SkeletonText, SkeletonImage } from "../common/Skeleton";

const ProductCardSkeleton = () => {
  return (
    <div className="bg-whiten xl:px-4 rounded-xl overflow-hidden shadow">
      <div className="relative">
        <div className="absolute top-4 right-4 z-10">
          <Skeleton className="h-5 w-5" rounded="rounded" />
        </div>
        <div className="p-4">
          <SkeletonImage aspect="h-40" />
        </div>
      </div>
      <div className="py-4 px-3 space-y-3">
        <div className="flex justify-between items-center">
          <Skeleton className="h-5 w-24" />
          <div className="flex gap-2 items-center">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-5 w-16" />
          </div>
        </div>
        <SkeletonText lines={2} />
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4" rounded="rounded" />
          <Skeleton className="h-3 w-24" />
        </div>
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-12" />
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;

