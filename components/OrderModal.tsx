
import React, { useState, useEffect, useMemo } from 'react';
import type { Product } from '../types';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  allProducts: Product[];
  onProductSwitch: (product: Product) => void;
  onSubmit: (orderDetails: OrderDetails) => void;
}

export interface OrderDetails {
  productName: string;
  quantity: number;
}

export const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose, product, allProducts, onProductSwitch, onSubmit }) => {
  const [quantity, setQuantity] = useState(1);
  
  const isFormValid = quantity > 0;

  const suggestedProducts = useMemo(() => {
    if (!product || !allProducts) return [];
    return allProducts.filter(p => 
        p.category === product.category && p.id !== product.id
    ).slice(0, 3);
  }, [product, allProducts]);

  useEffect(() => {
    // Reset quantity to 1 whenever the modal opens or the product inside it changes
    if (isOpen) {
      setQuantity(1);
    }
  }, [isOpen, product]);

  if (!isOpen || !product) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    
    onSubmit({
      productName: product.name,
      quantity,
    });
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[100]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-modal-title"
    >
      <div 
        className="bg-neutral-card rounded-lg shadow-2xl w-full max-w-md m-4 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-stone-200 flex justify-between items-center">
          <h2 id="order-modal-title" className="text-xl font-bold text-neutral-text">Agregar Producto</h2>
          <button onClick={onClose} className="text-neutral-subtle hover:text-neutral-text text-2xl font-bold">&times;</button>
        </div>
        
        <div className="p-6 overflow-y-auto">
          <form onSubmit={handleSubmit}>
            <div className="flex items-start gap-4 mb-6">
                <img src={product.images[0]} alt={product.name} className="w-20 h-20 rounded-lg object-cover border"/>
                <div>
                    <p className="text-neutral-subtle text-sm">{product.brand}</p>
                    <p className="text-lg font-semibold text-neutral-accent">{product.name}</p>
                    <p className="text-xl font-bold text-neutral-text mt-1">${product.price.toFixed(2)}</p>
                </div>
            </div>
            
            <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-neutral-text mb-2 text-center">Cantidad</label>
                <div className="flex items-center justify-center">
                    <button type="button" aria-label="Disminuir cantidad" onClick={() => setQuantity(q => Math.max(1, q - 1))} className="h-12 w-12 border border-r-0 border-stone-300 rounded-l-lg hover:bg-stone-100 transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-accent font-bold text-xl">
                        -
                    </button>
                    <input 
                        type="number" 
                        id="quantity" 
                        value={quantity}
                        onChange={(e) => {
                            const val = parseInt(e.target.value);
                            if (!isNaN(val) && val > 0) {
                                setQuantity(val);
                            }
                        }}
                        onBlur={(e) => {
                            if (e.target.value === '' || parseInt(e.target.value, 10) < 1) {
                                setQuantity(1);
                            }
                        }}
                        min="1"
                        required
                        className="w-20 h-12 text-center border-t border-b border-stone-300 focus:outline-none focus:ring-2 focus:ring-neutral-accent text-lg" 
                        aria-live="polite"
                    />
                    <button type="button" aria-label="Aumentar cantidad" onClick={() => setQuantity(q => q + 1)} className="h-12 w-12 border border-l-0 border-stone-300 rounded-r-lg hover:bg-stone-100 transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-accent font-bold text-xl">
                        +
                    </button>
                </div>
              </div>

              {suggestedProducts.length > 0 && (
                <div className="mt-8 pt-6 border-t border-dashed">
                  <h3 className="text-md font-semibold text-center text-neutral-text mb-4">Alternativas que podrían interesarte</h3>
                  <div className="space-y-3">
                    {suggestedProducts.map(suggestion => (
                      <div key={suggestion.id} className="flex items-center gap-3 bg-slate-50 p-2 rounded-lg border">
                        <img src={suggestion.images[0]} alt={suggestion.name} className="w-14 h-14 rounded-md object-cover flex-shrink-0" />
                        <div className="flex-grow">
                          <p className="text-sm font-bold text-neutral-text leading-tight">{suggestion.name}</p>
                          <p className="text-xs text-neutral-subtle">{suggestion.brand}</p>
                          <p className="text-sm font-semibold text-neutral-accent mt-1">${suggestion.price.toFixed(2)}</p>
                        </div>
                        <button 
                          type="button" 
                          onClick={() => onProductSwitch(suggestion)}
                          className="text-sm bg-neutral-secondary text-white font-semibold py-2 px-3 rounded-lg hover:bg-neutral-secondary-hover transition-colors flex-shrink-0"
                        >
                          Elegir
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </form>
        </div>

        <div className="p-6 border-t border-stone-200 bg-stone-50 rounded-b-lg flex flex-col sm:flex-row-reverse gap-3 mt-auto">
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={!isFormValid}
            className="w-full sm:w-auto bg-neutral-accent text-white font-bold py-3 px-6 rounded-lg hover:bg-neutral-accent-hover disabled:bg-stone-400 disabled:cursor-not-allowed transition-colors flex-grow"
          >
            Agregar al Carrito
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto bg-transparent text-neutral-subtle font-bold py-3 px-6 rounded-lg hover:bg-stone-200 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};