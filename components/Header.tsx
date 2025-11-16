import React, { useState, useEffect, useRef } from 'react';
import type { Product } from '../types';

interface HeaderProps {
  cartCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onProductSuggestionClick: (product: Product) => void;
  allProducts: Product[];
  onSelectCategory: (category: string) => void;
  productCategories: string[];
  onCartClick: () => void;
  onAboutClick: () => void;
  onBlogClick: () => void;
  onHomeClick: () => void;
  isAdminMode: boolean;
  onToggleAdminMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({ cartCount, searchQuery, onSearchChange, onProductSuggestionClick, allProducts, onSelectCategory, productCategories, onCartClick, onAboutClick, onBlogClick, onHomeClick, isAdminMode, onToggleAdminMode }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSuggestionsVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    onSearchChange(query);

    if (query.trim().length > 1) {
      const normalizedQuery = query.toLowerCase();
      const filteredSuggestions = allProducts.filter(p =>
        p.name.toLowerCase().includes(normalizedQuery) ||
        p.brand.toLowerCase().includes(normalizedQuery) ||
        p.category.toLowerCase().includes(normalizedQuery)
      ).slice(0, 5); // Limit to 5 suggestions
      setSuggestions(filteredSuggestions);
      setIsSuggestionsVisible(filteredSuggestions.length > 0);
    } else {
      setSuggestions([]);
      setIsSuggestionsVisible(false);
    }
  };
  
  const handleSuggestionClick = (product: Product) => {
    onProductSuggestionClick(product);
    setSuggestions([]);
    setIsSuggestionsVisible(false);
  };

  const scrollToProducts = () => {
    const element = document.getElementById('product-list-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCategoryClick = (category: string) => {
    onSelectCategory(category);
    setIsDropdownOpen(false);
    // The onSelectCategory prop in App.tsx will handle view switching
  };
  
  const handleProductsLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onSelectCategory('Todos');
    // The onSelectCategory prop in App.tsx will handle view switching and scrolling
  };
  
  return (
    <header className="bg-neutral-card/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center gap-4">
        <div className="flex-shrink-0">
          <button onClick={onHomeClick} className="flex items-center space-x-3 text-left p-1 -m-1 rounded-lg hover:bg-slate-100 transition-colors">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-neutral-accent" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-3 4a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2v-2z" clipRule="evenodd" />
            </svg>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <h1 className="text-2xl md:text-3xl font-display font-bold text-gradient-brand">DISTRIBUCIONES NICOLAS</h1>
              <span className="bg-neutral-secondary text-white text-sm font-bold px-3 py-1 rounded-full uppercase shadow-lg animate-pulse-bright">Domicilios</span>
            </div>
          </button>
        </div>
        
        <div ref={searchContainerRef} className="flex-grow max-w-xl mx-4 hidden md:block relative">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neutral-subtle" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => {
                if(suggestions.length > 0) setIsSuggestionsVisible(true);
              }}
              className="w-full pl-10 pr-4 py-2 border border-stone-300 rounded-full bg-stone-100 text-neutral-text focus:outline-none focus:ring-2 focus:ring-neutral-accent focus:bg-white"
            />
          </div>
           {isSuggestionsVisible && (
            <div className="absolute top-full mt-2 w-full bg-neutral-card rounded-md shadow-lg py-2 z-50 border border-slate-200">
              <ul>
                {suggestions.map(product => (
                  <li key={product.id}>
                    <button
                      onClick={() => handleSuggestionClick(product)}
                      className="w-full text-left flex items-center gap-4 px-4 py-2 text-neutral-text hover:bg-stone-100 transition-colors"
                    >
                      <img src={product.images[0]} alt={product.name} className="w-10 h-10 object-cover rounded-md flex-shrink-0" />
                      <div className="overflow-hidden">
                        <p className="font-semibold truncate">{product.name}</p>
                        <p className="text-sm text-neutral-subtle truncate">{product.category}</p>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4 lg:space-x-6 flex-shrink-0">
           <button onClick={onHomeClick} className="hidden lg:flex items-center gap-1 text-neutral-subtle hover:text-neutral-text transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            Inicio
          </button>
          <button onClick={onBlogClick} className="hidden lg:flex items-center gap-1 text-neutral-subtle hover:text-neutral-text transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Blog
          </button>
          <button onClick={onAboutClick} className="hidden lg:flex items-center gap-1 text-neutral-subtle hover:text-neutral-text transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Nosotros
          </button>

          <div className="relative">
            <button onClick={onCartClick} className="relative text-neutral-subtle hover:text-neutral-text transition-colors p-2 -m-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
          <button 
            onClick={onToggleAdminMode} 
            className={`relative p-2 -m-2 rounded-full transition-colors ${isAdminMode ? 'bg-neutral-accent text-white' : 'text-neutral-subtle hover:text-neutral-text'}`}
            aria-label="Modo Administrador"
            title="Modo Administrador"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};
