
import React from 'react';
import type { CustomerDetails } from '../types';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  customerDetails: CustomerDetails;
  cartItems: { 
    productId: number; 
    quantity: number; 
    productName: string; 
    price: number; 
    imageUrl: string 
  }[];
  total: number;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm, customerDetails, cartItems, total }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[100]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirmation-modal-title"
    >
      <div
        className="bg-neutral-card rounded-lg shadow-2xl w-full max-w-lg m-4 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-stone-200 flex justify-between items-center">
          <h2 id="confirmation-modal-title" className="text-xl font-bold text-neutral-text">Confirmar tu Pedido</h2>
          <button onClick={onClose} className="text-neutral-subtle hover:text-neutral-text text-2xl font-bold leading-none">&times;</button>
        </div>
        
        <div className="p-6 overflow-y-auto space-y-6">
            {/* Customer Details */}
            <div>
                <h3 className="text-lg font-semibold text-neutral-text mb-3">Detalles de Entrega</h3>
                <div className="bg-slate-50 p-4 rounded-lg space-y-2 text-md border border-slate-200">
                    <div className="flex justify-between">
                        <span className="font-medium text-neutral-subtle">Nombre:</span>
                        <span className="text-neutral-text font-semibold text-right">{customerDetails.name}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium text-neutral-subtle">Celular:</span>
                        <span className="text-neutral-text font-semibold text-right">{customerDetails.phone}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium text-neutral-subtle">Dirección:</span>
                        <span className="text-neutral-text font-semibold text-right">{customerDetails.address}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium text-neutral-subtle">Pago:</span>
                        <span className="text-neutral-text font-semibold text-right">{customerDetails.paymentMethod}</span>
                    </div>
                </div>
            </div>

            {/* Order Summary */}
             <div>
                <h3 className="text-lg font-semibold text-neutral-text mb-3">Resumen de Productos</h3>
                <div className="space-y-3 max-h-48 overflow-y-auto pr-2 border-t border-b border-slate-200 py-3">
                    {cartItems.map(item => (
                    <div key={item.productId} className="flex items-center gap-4">
                        <img src={item.imageUrl} alt={item.productName} className="w-12 h-12 rounded-md object-cover flex-shrink-0"/>
                        <div className="flex-grow">
                        <p className="font-semibold text-sm text-neutral-text">{item.productName}</p>
                        <p className="text-xs text-neutral-subtle">Cantidad: {item.quantity}</p>
                        </div>
                        <p className="font-semibold text-sm text-neutral-accent flex-shrink-0">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    ))}
                </div>
                 <div className="mt-4 pt-4 flex justify-between items-center text-xl font-bold">
                    <span className="text-neutral-text">Total a Pagar:</span>
                    <span className="text-neutral-accent">${total.toFixed(2)}</span>
                </div>
            </div>
        </div>

        <div className="p-4 border-t border-stone-200 bg-stone-50 rounded-b-lg flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="bg-transparent text-neutral-subtle font-bold py-3 px-6 rounded-lg hover:bg-stone-200 transition-colors"
          >
            Editar Detalles
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="w-full sm:w-auto bg-neutral-accent text-white font-bold py-3 px-6 rounded-lg hover:bg-neutral-accent-hover transition-colors flex-grow sm:flex-grow-0"
          >
            Realizar Pedido
          </button>
        </div>
      </div>
    </div>
  );
};
