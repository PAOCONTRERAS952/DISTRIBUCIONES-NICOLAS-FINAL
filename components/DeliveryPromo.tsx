
import React from 'react';

export const DeliveryPromo: React.FC = () => {
  return (
    <section className="bg-neutral-bg py-16 sm:py-20">
      <div className="container mx-auto px-6">
        <div className="bg-neutral-card rounded-lg shadow-lg overflow-hidden md:grid md:grid-cols-2 items-center">
          <div className="md:order-2 h-64 md:h-full">
            <img 
              src="https://images.unsplash.com/photo-1621993203399-73489b74cce4?q=80&w=1932&auto=format&fit=crop" 
              alt="Persona en una moto de domicilios entregando un paquete" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="md:order-1 p-8 md:p-12 lg:p-16">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-text mb-4">
              ¡Tus productos, directo a tu puerta!
            </h2>
            <p className="text-neutral-subtle mb-6">
              Disfruta de la comodidad de recibir tus pedidos de droguería y aseo sin salir de casa. Nuestro servicio de domicilio es rápido, seguro y confiable.
            </p>
            <a
              href="https://wa.me/qr/IRPOT652PECWO1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-neutral-secondary font-bold py-3 px-6 rounded-lg text-white hover:bg-neutral-secondary-hover transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-secondary"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                 <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
              <span>Pedir a Domicilio</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
