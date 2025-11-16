import React, { useState, useEffect, useRef } from 'react';
import type { Product } from '../types';

interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onSave: (product: Product) => void;
}

export const EditProductModal: React.FC<EditProductModalProps> = ({ isOpen, onClose, product, onSave }) => {
  const [editedProduct, setEditedProduct] = useState<Product | null>(product);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setEditedProduct(product);
  }, [product]);

  if (!isOpen || !editedProduct) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const isNumeric = ['price', 'originalPrice'].includes(name);
    setEditedProduct(prev => prev ? { ...prev, [name]: isNumeric ? parseFloat(value) || 0 : value } : null);
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setEditedProduct(prev => prev ? { ...prev, [name]: checked } : null);
  };

  const handleImageRemove = (imgUrl: string) => {
    setEditedProduct(prev => prev ? { ...prev, images: prev.images.filter(img => img !== imgUrl) } : null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedProduct(prev => prev ? { ...prev, images: [...prev.images, reader.result as string] } : null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (editedProduct) {
      onSave(editedProduct);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[100]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-modal-title"
    >
      <div 
        className="bg-neutral-card rounded-lg shadow-2xl w-full max-w-2xl m-4 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-stone-200 flex justify-between items-center">
          <h2 id="edit-modal-title" className="text-xl font-bold text-neutral-text">Editar Producto</h2>
          <button onClick={onClose} className="text-neutral-subtle hover:text-neutral-text text-2xl font-bold">&times;</button>
        </div>
        
        <div className="p-6 overflow-y-auto space-y-4">
          {/* Text Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-neutral-text mb-1">Nombre</label>
              <input type="text" name="name" id="name" value={editedProduct.name} onChange={handleInputChange} className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-accent" />
            </div>
            <div>
              <label htmlFor="brand" className="block text-sm font-medium text-neutral-text mb-1">Marca</label>
              <input type="text" name="brand" id="brand" value={editedProduct.brand} onChange={handleInputChange} className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-accent" />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-neutral-text mb-1">Categoría</label>
              <input type="text" name="category" id="category" value={editedProduct.category} onChange={handleInputChange} className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-accent" />
            </div>
             <div className="flex items-center gap-4">
                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-neutral-text mb-1">Precio</label>
                    <input type="number" name="price" id="price" value={editedProduct.price} onChange={handleInputChange} className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-accent" />
                </div>
                 <div>
                    <label htmlFor="originalPrice" className="block text-sm font-medium text-neutral-text mb-1">Precio Original</label>
                    <input type="number" name="originalPrice" id="originalPrice" value={editedProduct.originalPrice || ''} onChange={handleInputChange} className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-accent" />
                </div>
             </div>
             <div className="flex items-end">
                <div className="flex items-center h-full">
                    <input type="checkbox" name="isOnSale" id="isOnSale" checked={editedProduct.isOnSale || false} onChange={handleCheckboxChange} className="h-5 w-5 rounded border-gray-300 text-neutral-accent focus:ring-neutral-accent" />
                    <label htmlFor="isOnSale" className="ml-2 block text-sm text-neutral-text">En oferta</label>
                </div>
            </div>
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-neutral-text mb-1">Descripción Corta</label>
            <textarea name="description" id="description" value={editedProduct.description} onChange={handleInputChange} rows={2} className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-accent"></textarea>
          </div>
          <div>
            <label htmlFor="detailedDescription" className="block text-sm font-medium text-neutral-text mb-1">Descripción Detallada</label>
            <textarea name="detailedDescription" id="detailedDescription" value={editedProduct.detailedDescription} onChange={handleInputChange} rows={4} className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-accent"></textarea>
          </div>
          {/* Image Management */}
          <div>
            <h3 className="text-sm font-medium text-neutral-text mb-2">Imágenes</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {editedProduct.images.map((img, index) => (
                <div key={index} className="relative group aspect-square">
                  <img src={img} alt={`Producto ${index + 1}`} className="w-full h-full object-cover rounded-md" />
                  <button onClick={() => handleImageRemove(img)} className="absolute top-1 right-1 bg-red-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity">&times;</button>
                </div>
              ))}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="aspect-square border-2 border-dashed border-stone-300 rounded-md flex items-center justify-center text-stone-400 hover:bg-stone-50 hover:border-neutral-accent hover:text-neutral-accent transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-stone-200 bg-stone-50 rounded-b-lg flex flex-col sm:flex-row-reverse gap-3">
          <button
            onClick={handleSave}
            className="w-full sm:w-auto bg-neutral-accent text-white font-bold py-2 px-6 rounded-lg hover:bg-neutral-accent-hover transition-colors"
          >
            Guardar Cambios
          </button>
          <button
            onClick={onClose}
            className="w-full sm:w-auto bg-transparent text-neutral-subtle font-bold py-2 px-6 rounded-lg hover:bg-stone-200 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};
