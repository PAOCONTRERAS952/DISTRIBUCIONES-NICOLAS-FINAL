
import React, { useState, useMemo } from 'react';
import type { CartItem, Product, CustomerDetails } from '../types';
import { ConfirmationModal } from './ConfirmationModal';

interface CheckoutProps {
  cartItems: CartItem[];
  products: Product[];
  onPlaceOrder: (customerDetails: CustomerDetails) => void;
  onBack: () => void;
}

// A validation function that can be used without being part of the component state.
const validatePhone = (phone: string): string => {
  // Don't show an error if the user is clearing the field,
  // only if they've typed something invalid. The required check is handled on submit.
  if (!phone) {
      return '';
  }
  // General regex for 7 to 10 digit phone numbers.
  const phoneRegex = /^\d{7,10}$/;
  if (!phoneRegex.test(phone)) {
      return 'Ingresa un número de celular válido (7-10 dígitos).';
  }
  return ''; // No error
};

export const Checkout: React.FC<CheckoutProps> = ({ cartItems, products, onPlaceOrder, onBack }) => {
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    phone: '',
    address: '',
    paymentMethod: 'Efectivo' as 'Efectivo' | 'Transferencia',
  });
  const [phoneError, setPhoneError] = useState('');
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const cartDetails = useMemo(() => {
    return cartItems.map(item => {
      const product = products.find(p => p.id === item.productId);
      return {
        ...item,
        productName: product?.name || 'Producto no encontrado',
        price: product?.price || 0,
        imageUrl: product?.images[0] || '',
      };
    });
  }, [cartItems, products]);

  const total = useMemo(() => {
    return cartDetails.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartDetails]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      // Allow only numeric input for the phone field
      const numericValue = value.replace(/[^0-9]/g, '');
      setCustomerDetails(prev => ({ ...prev, [name]: numericValue }));
      setPhoneError(validatePhone(numericValue));
    } else {
      setCustomerDetails(prev => ({ ...prev, [name]: value }));
    }
  };

  const isFormValid = useMemo(() => {
    return (
      customerDetails.name.trim() !== '' &&
      customerDetails.address.trim() !== '' &&
      customerDetails.phone.trim() !== '' &&
      validatePhone(customerDetails.phone) === ''
    );
  }, [customerDetails]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Explicitly set error for empty phone field on submit attempt
    if (customerDetails.phone.trim() === '') {
      setPhoneError('El número de celular es obligatorio.');
      return;
    }

    if (isFormValid) {
      setIsConfirmationOpen(true);
    }
  };
  
  const handleConfirmOrder = () => {
    onPlaceOrder(customerDetails);
    setIsConfirmationOpen(false);
  };


  return (
    <>
      <div className="container mx-auto px-6 py-12">
        <div className="flex items-center mb-8">
          <button onClick={onBack} className="text-neutral-accent hover:underline flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            Volver al Carrito
          </button>
        </div>
        <h1 className="text-3xl font-bold text-neutral-text mb-8 text-center">Finalizar Compra</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Order Summary */}
          <div className="bg-neutral-card p-6 rounded-lg shadow-md order-2 lg:order-1">
            <h2 className="text-xl font-bold mb-4 border-b pb-4">Resumen de tu Pedido</h2>
            <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
              {cartDetails.map(item => (
                <div key={item.productId} className="flex items-center gap-4">
                  <img src={item.imageUrl} alt={item.productName} className="w-16 h-16 rounded-md object-cover"/>
                  <div className="flex-grow">
                    <p className="font-semibold">{item.productName}</p>
                    <p className="text-sm text-neutral-subtle">Cantidad: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t flex justify-between items-center">
              <p className="text-lg font-bold">Total:</p>
              <p className="text-xl font-bold text-neutral-accent">${total.toFixed(2)}</p>
            </div>
          </div>

          {/* Customer Form */}
          <div className="bg-neutral-card p-6 rounded-lg shadow-md order-1 lg:order-2">
            <h2 className="text-xl font-bold mb-4">Datos de Contacto y Envío</h2>
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-text mb-1">Nombre Completo</label>
                <input type="text" id="name" name="name" value={customerDetails.name} onChange={handleInputChange} required className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-accent" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-neutral-text mb-1">Número de Celular</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  value={customerDetails.phone} 
                  onChange={handleInputChange} 
                  required 
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
                    phoneError 
                    ? 'border-red-500 ring-red-500 focus:ring-red-500' 
                    : 'border-stone-300 focus:ring-neutral-accent'
                  }`}
                  aria-invalid={!!phoneError}
                  aria-describedby="phone-error"
                />
                {phoneError && <p id="phone-error" className="text-red-600 text-sm mt-1">{phoneError}</p>}
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-neutral-text mb-1">Dirección de Entrega</label>
                <input type="text" id="address" name="address" value={customerDetails.address} onChange={handleInputChange} required className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-accent" />
              </div>
              <div>
                <label htmlFor="paymentMethod" className="block text-sm font-medium text-neutral-text mb-1">Método de Pago</label>
                <select id="paymentMethod" name="paymentMethod" value={customerDetails.paymentMethod} onChange={handleInputChange} className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-accent bg-white">
                  <option>Efectivo</option>
                  <option>Transferencia</option>
                </select>
              </div>
              <button type="submit" disabled={!isFormValid} className="w-full bg-neutral-accent text-white font-bold py-3 px-6 rounded-lg hover:bg-neutral-accent-hover disabled:bg-stone-400 disabled:cursor-not-allowed transition-colors">
                Confirmar Pedido
              </button>
            </form>
          </div>
        </div>
      </div>
      <ConfirmationModal 
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        onConfirm={handleConfirmOrder}
        customerDetails={customerDetails}
        cartItems={cartDetails}
        total={total}
      />
    </>
  );
};
