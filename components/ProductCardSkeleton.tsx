
import React from 'react';

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="bg-neutral-card rounded-lg shadow-md overflow-hidden">
      <div className="w-full h-56 bg-stone-200 animate-pulse"></div>
      <div className="p-5">
        <div className="h-4 w-1/3 bg-stone-200 rounded animate-pulse mb-2"></div>
        <div className="h-6 w-3/4 bg-stone-200 rounded animate-pulse mb-4"></div>
        <div className="h-7 w-1/2 bg-stone-200 rounded animate-pulse"></div>
      </div>
    </div>
  );
};
