
import React, { useMemo } from 'react';
import type { CartItem, Product, CustomerDetails } from '../types';
import type { ConfirmedOrder } from '../App';

interface OrderConfirmationProps {
  order: ConfirmedOrder | null;
  onBackToStore: () => void;
}

export const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ order, onBackToStore }) => {
  const cartDetails = useMemo(() => {
    if (!order) return [];
    return order.cartItems.map(item => {
      const product = order.products.find(p => p.id === item.productId);
      return {
        ...item,
        productName: product?.name || 'Producto no encontrado',
        price: product?.price || 0,
        imageUrl: product?.images[0] || '',
      };
    });
  }, [order]);
  
  if (!order) {
    // This should not happen if the logic in App.tsx is correct, but it's good practice to handle it.
    return (
        <div className="container mx-auto px-4 sm:px-6 py-16 text-center">
            <h1 className="text-2xl font-bold">No se encontró información del pedido.</h1>
            <button onClick={onBackToStore} className="mt-8 inline-flex items-center gap-2 bg-neutral-accent text-white font-bold py-3 px-8 rounded-full hover:bg-neutral-accent-hover transition-all">
                Volver a la Tienda
            </button>
        </div>
    );
  }

  const { customerDetails, total } = order;

  return (
    <div className="bg-neutral-bg py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mx-auto bg-neutral-card p-6 sm:p-10 rounded-xl shadow-lg border border-slate-200/50 text-center">
                <div className="w-20 h-20 bg-emerald-100 rounded-full mx-auto flex items-center justify-center mb-6 animate-pop-in-up">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h1 
                  className="text-3xl sm:text-4xl font-bold text-neutral-text animate-pop-in-up"
                  style={{ animationDelay: '150ms' }}
                >
                  ¡Gracias por tu pedido, {customerDetails.name.split(' ')[0]}!
                </h1>
                <p className="mt-3 text-lg text-neutral-subtle max-w-xl mx-auto">
                    Hemos recibido tu pedido. Nos pondremos en contacto contigo pronto para coordinar la entrega.
                </p>

                <div className="my-8 border-t border-slate-200"></div>

                <div className="text-left space-y-8">
                    {/* Order Summary */}
                    <div>
                        <h2 className="text-2xl font-bold text-neutral-text mb-4">Resumen de tu Compra</h2>
                        <div className="space-y-4 max-h-64 overflow-y-auto pr-2 border-b border-t border-slate-200 py-4">
                            {cartDetails.map(item => (
                                <div key={item.productId} className="flex items-center gap-4">
                                    <img src={item.imageUrl} alt={item.productName} className="w-16 h-16 rounded-md object-cover flex-shrink-0"/>
                                    <div className="flex-grow">
                                        <p className="font-semibold text-neutral-text">{item.productName}</p>
                                        <p className="text-sm text-neutral-subtle">Cantidad: {item.quantity}</p>
                                    </div>
                                    <p className="font-semibold text-neutral-accent flex-shrink-0">${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 pt-4 flex justify-between items-center text-xl font-bold">
                            <span className="text-neutral-text">Total:</span>
                            <span className="text-neutral-accent">${total.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Customer Details */}
                    <div>
                        <h2 className="text-2xl font-bold text-neutral-text mb-4">Detalles del Pedido</h2>
                        <div className="bg-slate-50 p-6 rounded-lg space-y-3 text-md">
                             <div className="flex justify-between flex-wrap gap-2">
                                <span className="font-semibold text-neutral-subtle">Nombre:</span>
                                <span className="text-neutral-text text-right">{customerDetails.name}</span>
                            </div>
                             <div className="flex justify-between flex-wrap gap-2">
                                <span className="font-semibold text-neutral-subtle">Celular:</span>
                                <span className="text-neutral-text text-right">{customerDetails.phone}</span>
                            </div>
                             <div className="flex justify-between flex-wrap gap-2">
                                <span className="font-semibold text-neutral-subtle">Dirección:</span>
                                <span className="text-neutral-text text-right">{customerDetails.address}</span>
                            </div>
                             <div className="flex justify-between flex-wrap gap-2">
                                <span className="font-semibold text-neutral-subtle">Método de Pago:</span>
                                <span className="text-neutral-text text-right">{customerDetails.paymentMethod}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <button onClick={onBackToStore} className="mt-10 inline-flex items-center gap-2 bg-neutral-accent text-white font-bold py-3 px-8 rounded-full hover:bg-neutral-accent-hover transition-all transform hover:scale-105 shadow-md hover:shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clipRule="evenodd" />
                    </svg>
                    Volver a la Tienda
                </button>
            </div>
        </div>
    </div>
  );
};
