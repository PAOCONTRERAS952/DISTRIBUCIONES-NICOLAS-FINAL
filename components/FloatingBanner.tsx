import React from 'react';

export const FloatingBanner: React.FC = () => {
  const handleScrollToProducts = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('product-list-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="fixed top-0 right-0 h-40 w-40 z-40 overflow-hidden pointer-events-none" aria-hidden="true">
      <a
        href="#product-list-section"
        onClick={handleScrollToProducts}
        className="absolute top-[30px] right-[-40px] w-48 transform rotate-45 bg-neutral-secondary text-white text-center font-bold py-2 shadow-lg pointer-events-auto hover:bg-neutral-secondary-hover transition-colors animate-pulse-bright"
      >
        Ofertas
      </a>
    </div>
  );
};
