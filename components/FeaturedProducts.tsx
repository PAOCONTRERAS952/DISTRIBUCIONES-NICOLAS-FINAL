

import React, { useRef, useState, useEffect } from 'react';
import type { Product } from '../types';
import { ProductCard } from './ProductCard';

interface FeaturedProductsProps {
  title: string;
  products: Product[];
  onAddToCart: (product: Product) => void;
  favoriteIds: Set<number>;
  onToggleFavorite: (productId: number) => void;
  onViewProductDetail: (product: Product) => void;
  isAdminMode: boolean;
  onEditProduct: (product: Product) => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ title, products, onAddToCart, favoriteIds, onToggleFavorite, onViewProductDetail, isAdminMode, onEditProduct }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState({ prev: false, next: false });

  const checkScrollability = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const hasOverflow = container.scrollWidth > container.clientWidth;
      const atStart = container.scrollLeft === 0;
      const atEnd = Math.ceil(container.scrollLeft) >= container.scrollWidth - container.clientWidth -1; // -1 for precision issues

      setCanScroll({ prev: hasOverflow && !atStart, next: hasOverflow && !atEnd });
    }
  };
  
  // Check on mount, resize, and when products change
  useEffect(() => {
    const container = scrollContainerRef.current;
    checkScrollability();
    window.addEventListener('resize', checkScrollability);
    if (container) {
      container.addEventListener('scroll', checkScrollability);
    }
    
    return () => {
      window.removeEventListener('resize', checkScrollability);
      if (container) {
        container.removeEventListener('scroll', checkScrollability);
      }
    };
  }, [products]);

  const scroll = (direction: 'prev' | 'next') => {
    const container = scrollContainerRef.current;
    if (container) {
      // Find the first card to measure its width including margin/gap
      const firstCard = container.querySelector(':scope > div') as HTMLElement;
      if (!firstCard) return;

      const cardWidth = firstCard.offsetWidth;
      const gap = parseInt(window.getComputedStyle(container).gap, 10) || 32; // Corresponds to gap-8
      const scrollAmount = (cardWidth + gap) * 2; // Scroll by two cards

      container.scrollBy({
        left: direction === 'next' ? scrollAmount : -scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (!products || products.length === 0) return null;

  return (
    <section className="py-12 bg-neutral-bg">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-neutral-text mb-8">{title}</h2>
        <div className="relative group">
          <div
            ref={scrollContainerRef}
            className="flex gap-8 overflow-x-auto pb-6 -mb-6 no-scrollbar scroll-smooth"
          >
            {products.map(product => (
              <div key={product.id} className="flex-shrink-0 w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1.33rem)] lg:w-[calc(25%-1.5rem)]">
                <ProductCard
                  product={product}
                  onAddToCart={onAddToCart}
                  isFavorite={favoriteIds.has(product.id)}
                  onToggleFavorite={onToggleFavorite}
                  onViewProductDetail={onViewProductDetail}
                  isAdminMode={isAdminMode}
                  onEditProduct={onEditProduct}
                />
              </div>
            ))}
          </div>
          
          {canScroll.prev && (
            <button 
              onClick={() => scroll('prev')}
              aria-label="Previous products"
              className="absolute top-1/2 -translate-y-1/2 -left-5 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-neutral-accent hover:bg-white transition-all opacity-0 group-hover:opacity-100 z-20 focus:outline-none focus:ring-2 focus:ring-neutral-accent hidden md:flex"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {canScroll.next && (
            <button 
              onClick={() => scroll('next')}
              aria-label="Next products"
              className="absolute top-1/2 -translate-y-1/2 -right-5 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-neutral-accent hover:bg-white transition-all opacity-0 group-hover:opacity-100 z-20 focus:outline-none focus:ring-2 focus:ring-neutral-accent hidden md:flex"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
