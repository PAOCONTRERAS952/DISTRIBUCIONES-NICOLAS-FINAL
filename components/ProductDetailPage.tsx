
import React, { useState } from 'react';
import type { Product } from '../types';
import { StarRating } from './StarRating';

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product, onBack, onAddToCart }) => {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);
  
  const averageRating = product.reviews.length > 0
    ? product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length
    : 0;
    
  const handleAddToCartClick = () => {
    onAddToCart(product, quantity);
  };

  return (
    <div className="bg-neutral-bg py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <button onClick={onBack} className="text-neutral-accent hover:underline flex items-center gap-2 mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Volver a Productos
          </button>
          
          <div className="bg-neutral-card p-6 sm:p-10 rounded-xl shadow-lg border border-slate-200/50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
              {/* Image Gallery */}
              <div>
                <div className="aspect-square bg-slate-100 rounded-lg overflow-hidden mb-4">
                  <img src={selectedImage} alt={product.name} className="w-full h-full object-cover transition-opacity duration-300" />
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {product.images.map((img, index) => (
                    <button 
                      key={index} 
                      onClick={() => setSelectedImage(img)}
                      className={`aspect-square rounded-md overflow-hidden border-2 transition-colors ${selectedImage === img ? 'border-neutral-accent' : 'border-transparent hover:border-slate-300'}`}
                    >
                      <img src={img} alt={`${product.name} - vista ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div className="flex flex-col">
                <div>
                  <p className="text-sm font-semibold text-neutral-secondary mb-2">{product.category}</p>
                  <h1 className="text-3xl sm:text-4xl font-bold text-neutral-text leading-tight">{product.name}</h1>
                  <div className="mt-4 flex items-center gap-2">
                     <StarRating rating={averageRating} />
                     <span className="text-neutral-subtle text-sm">({product.reviews.length} reseñas)</span>
                  </div>
                  {product.isOnSale && product.originalPrice ? (
                    <div className="flex items-baseline gap-3 mt-4">
                      <p className="text-3xl font-bold text-red-600">${product.price.toFixed(2)}</p>
                      <del className="text-xl text-neutral-subtle">${product.originalPrice.toFixed(2)}</del>
                    </div>
                  ) : (
                    <p className="text-3xl font-bold text-neutral-accent mt-4">${product.price.toFixed(2)}</p>
                  )}
                  <p className="text-neutral-subtle my-6 text-base leading-relaxed">{product.description}</p>
                </div>
                
                <div className="mt-auto">
                    <div className="flex items-center gap-4 mb-6">
                        <label htmlFor="quantity" className="font-semibold text-neutral-text">Cantidad:</label>
                        <div className="flex items-center">
                            <button type="button" aria-label="Disminuir cantidad" onClick={() => setQuantity(q => Math.max(1, q - 1))} className="h-11 w-11 border border-r-0 border-stone-300 rounded-l-lg hover:bg-stone-100 transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-accent font-bold text-xl">
                                -
                            </button>
                            <input type="number" id="quantity" value={quantity} readOnly className="w-16 h-11 text-center border-t border-b border-stone-300 focus:outline-none text-lg" aria-live="polite" />
                            <button type="button" aria-label="Aumentar cantidad" onClick={() => setQuantity(q => q + 1)} className="h-11 w-11 border border-l-0 border-stone-300 rounded-r-lg hover:bg-stone-100 transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-accent font-bold text-xl">
                                +
                            </button>
                        </div>
                    </div>
                    <button 
                        onClick={handleAddToCartClick}
                        className="w-full flex items-center justify-center gap-2 bg-neutral-accent text-white font-bold py-4 px-6 rounded-xl hover:bg-neutral-accent-hover transition-all transform hover:scale-105 shadow-md hover:shadow-lg"
                    >
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                           <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                         </svg>
                         Agregar al Carrito
                    </button>
                </div>
              </div>
            </div>

            {/* Detailed Description & Reviews */}
            <div className="mt-12 pt-8 border-t border-slate-200">
                <h2 className="text-2xl font-bold text-neutral-text mb-4">Descripción Detallada</h2>
                <p className="text-neutral-subtle whitespace-pre-wrap leading-relaxed">{product.detailedDescription}</p>
            </div>
            
            <div className="mt-12 pt-8 border-t border-slate-200">
                <h2 className="text-2xl font-bold text-neutral-text mb-4">Reseñas de Clientes</h2>
                {product.reviews.length > 0 ? (
                    <div className="space-y-6">
                        {product.reviews.map((review, index) => (
                            <div key={index} className="border-b border-slate-200 pb-4">
                                <div className="flex items-center mb-2">
                                    <StarRating rating={review.rating} />
                                </div>
                                <p className="text-neutral-text mb-2">"{review.comment}"</p>
                                <p className="text-sm text-neutral-subtle">
                                    <strong>{review.author}</strong> - {review.date}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-neutral-subtle">Este producto aún no tiene reseñas. ¡Sé el primero en opinar!</p>
                )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-component for rendering stars
const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
    <div className="flex items-center" aria-label={`Calificación: ${rating.toFixed(1)} de 5 estrellas`}>
        {[1, 2, 3, 4, 5].map((star) => {
            const isFull = rating >= star;
            const isHalf = rating >= star - 0.5 && rating < star;
            return (
                <svg
                    key={star}
                    className={`w-5 h-5 ${isFull || isHalf ? 'text-amber-400' : 'text-slate-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            );
        })}
    </div>
);
