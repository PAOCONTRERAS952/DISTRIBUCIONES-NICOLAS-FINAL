

import React from 'react';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  isFavorite: boolean;
  onToggleFavorite: (productId: number) => void;
  onViewProductDetail: (product: Product) => void;
  isAdminMode: boolean;
  onEditProduct: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, isFavorite, onToggleFavorite, onViewProductDetail, isAdminMode, onEditProduct }) => {
  return (
    <div className="bg-neutral-card rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group relative flex flex-col h-full">
      <div 
        className="cursor-pointer" 
        onClick={() => onViewProductDetail(product)}
        aria-label={`Ver detalles de ${product.name}`}
      >
        {isAdminMode && (
           <button
            onClick={(e) => {
              e.stopPropagation();
              onEditProduct(product);
            }}
            aria-label={`Editar ${product.name}`}
            className="absolute top-3 left-3 z-20 bg-neutral-accent text-white rounded-full p-2 transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-accent"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
              <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
            </svg>
          </button>
        )}
        {product.isOnSale && (
          <div className={`absolute top-3 ${isAdminMode ? 'left-14' : 'left-3'} bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10 uppercase tracking-wide transition-all`}>
            Oferta
          </div>
        )}
        <img src={product.images[0]} alt={product.name} className="w-full h-56 object-cover" />
      </div>

       <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite(product.id);
        }}
        aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        className="absolute top-3 right-3 z-10 bg-white/70 backdrop-blur-sm rounded-full p-2 transition-transform transform hover:scale-125 focus:outline-none focus:ring-2 focus:ring-red-400"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill={isFavorite ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>
      
      <div className="p-5 flex flex-col flex-grow">
        <div 
            className="cursor-pointer"
            onClick={() => onViewProductDetail(product)}
            aria-label={`Ver detalles de ${product.name}`}
        >
          <p className="text-sm text-neutral-subtle mb-1">{product.category}</p>
          <h3 className="text-lg font-bold text-neutral-text truncate" title={product.name}>{product.name}</h3>
          <p className="text-sm text-neutral-subtle my-2 h-10 overflow-hidden">{product.description}</p>
        </div>
        <div className="mt-auto flex justify-between items-center pt-4">
          {product.isOnSale && product.originalPrice ? (
            <div className="flex items-baseline gap-2">
              <p className="text-xl font-semibold text-red-600">${product.price.toFixed(2)}</p>
              <del className="text-sm text-neutral-subtle">${product.originalPrice.toFixed(2)}</del>
            </div>
          ) : (
            <p className="text-xl font-semibold text-neutral-accent">${product.price.toFixed(2)}</p>
          )}
          <button 
            onClick={() => onAddToCart(product)}
            className="bg-neutral-accent text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors duration-300 hover:bg-neutral-accent-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-accent"
            aria-label={`Agregar ${product.name} al carrito`}
          >
            Agregar al Carrito
          </button>
        </div>
      </div>
    </div>
  );
};
