

import React from 'react';
import { ProductCard } from './ProductCard';
import type { Product } from '../types';
import { ProductCardSkeleton } from './ProductCardSkeleton';

interface ProductListProps {
  products: Product[];
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onAddToCart: (product: Product) => void;
  favoriteIds: Set<number>;
  onToggleFavorite: (productId: number) => void;
  isLoading: boolean;
  onViewProductDetail: (product: Product) => void;
  isAdminMode: boolean;
  onEditProduct: (product: Product) => void;
}

export const ProductList: React.FC<ProductListProps> = ({ products, categories, selectedCategory, onSelectCategory, onAddToCart, favoriteIds, onToggleFavorite, isLoading, onViewProductDetail, isAdminMode, onEditProduct }) => {
  return (
    <div className="container mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <div className="flex justify-center items-center gap-4 mb-4">
          <h2 className="text-3xl font-bold text-neutral-text">Todos Nuestros Productos</h2>
        </div>
        <div className="flex justify-center flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${
                selectedCategory === category
                  ? 'bg-neutral-accent text-white'
                  : 'bg-neutral-card text-neutral-subtle hover:bg-stone-200 hover:text-neutral-text'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={onAddToCart}
              isFavorite={favoriteIds.has(product.id)}
              onToggleFavorite={onToggleFavorite}
              onViewProductDetail={onViewProductDetail}
              isAdminMode={isAdminMode}
              onEditProduct={onEditProduct}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-lg text-neutral-subtle">
            {selectedCategory === 'Favoritos' 
              ? 'Aún no has agregado productos a tus favoritos.' 
              : 'No se encontraron productos que coincidan con tu búsqueda.'}
          </p>
        </div>
      )}
    </div>
  );
};
