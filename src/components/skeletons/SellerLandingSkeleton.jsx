import React from "react";
import { Skeleton, SkeletonText, SkeletonImage, SkeletonCircle } from "../common/Skeleton";

const SellerLandingSkeleton = () => {
  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 bg-background">
      {/* Hero Section */}
      <section className="py-8 sm:py-12 lg:py-16 md:mt-40">
        <div className="w-full mx-auto text-center pt-16 sm:pt-24 md:pt-[170px] lg:pt-[250px]">
          <Skeleton className="h-8 w-72 mx-auto mb-3" />
          <Skeleton className="h-10 w-96 mx-auto mb-6" />
          <Skeleton className="h-10 w-52 mx-auto rounded-full" />

          {/* Seller Images Grid */}
          <div className="relative mx-auto mt-8 sm:mt-12">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4 px-2 sm:px-4">
              {Array.from({ length: 10 }).map((_, i) => (
                <SkeletonImage key={i} className="w-full h-32 sm:h-48 md:h-56" />
              ))}
            </div>
            <div className="flex justify-center mt-4 sm:mt-6 space-x-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <SkeletonCircle key={i} size="h-3 w-3" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-4">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-5 w-80" />
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-80 rounded-lg" />
              ))}
            </div>
          </div>
          <div className="relative">
            <SkeletonImage className="w-full h-64 sm:h-80" />
            <SkeletonText className="mt-4" lines={2} />
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
        <div className="space-y-3 text-center">
          <Skeleton className="h-8 w-64 mx-auto" />
          <SkeletonText className="mx-auto" lines={2} />
        </div>
        <div className="space-y-8 sm:space-y-0 sm:grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-8 mx-auto mt-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="p-6">
              <SkeletonCircle size="h-12 w-12" />
              <Skeleton className="h-5 w-40 mt-4" />
              <Skeleton className="h-4 w-32 mt-2" />
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-8 sm:py-12 lg:py-16">
        <div className="text-center space-y-3">
          <Skeleton className="h-8 w-80 mx-auto" />
          <Skeleton className="h-4 w-96 mx-auto" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-[#F5F6FA] rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm">
              <div className="flex items-center mb-4 gap-3">
                <SkeletonCircle size="h-12 w-12" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24 mt-2" />
                </div>
              </div>
              <SkeletonText lines={3} />
            </div>
          ))}
        </div>
        <div className="text-center mt-8 sm:mt-12">
          <Skeleton className="h-11 w-48 mx-auto rounded-full" />
        </div>
      </section>
    </div>
  );
};

export default SellerLandingSkeleton;

