
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-accent text-neutral-bg">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-6 md:space-y-0">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">DISTRIBUCIONES NICOLAS</h3>
            <p className="text-sm text-stone-300">Tu salud y hogar, nuestra prioridad.</p>
          </div>
          
          <div className="flex flex-col items-center md:items-start space-y-2">
            <a href="tel:3197438992" className="flex items-center gap-2 text-stone-300 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span>319 743 8992</span>
            </a>
            <a href="https://wa.me/qr/IRPOT652PECWO1" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-stone-300 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.267.651 4.39 1.88 6.166l-1.29 4.721 4.793-1.262zM12.067 10.808c-.271-.136-.972-.48-.972-.48s-.525-.188-.732.188c-.207.376-.767.936-.935 1.103-.168.169-.336.188-.605.052-.27-.136-1.146-.416-2.181-1.344-.805-.712-1.347-1.588-1.515-1.856-.168-.267-.031-.412.117-.539.141-.129.27-.188.406-.27.135-.082.188-.135.27-.223.082-.088.052-.168-.024-.304s-.732-1.763-.98-2.403c-.247-.621-.494-.539-.687-.539-.187 0-.405-.023-.605-.023-.2 0-.525.08-.787.376-.262.296-.995.972-.995 2.392 0 1.42 1.023 2.775 1.17 2.973.147.198 1.995 3.2 4.833 4.252.68.253 1.217.405 1.63.518.75.198 1.442.168 1.995-.082.593-.28 1.763-1.023 2.013-1.39.25-.366.25-.687.168-.822-.082-.136-.27-.223-.552-.376z"/>
                </svg>
              <span>WhatsApp</span>
            </a>
          </div>

          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">Facebook</a>
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
          </div>
        </div>
        <div className="mt-8 border-t border-stone-600 pt-4 text-center text-sm text-stone-400">
          <p>&copy; {new Date().getFullYear()} DISTRIBUCIONES NICOLAS. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
