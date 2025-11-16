
import React from 'react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[100]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="about-modal-title"
    >
      <div
        className="bg-neutral-card rounded-lg shadow-2xl w-full max-w-2xl m-4 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-stone-200 flex justify-between items-center">
          <h2 id="about-modal-title" className="text-xl font-bold text-neutral-text">Sobre Nosotros</h2>
          <button onClick={onClose} className="text-neutral-subtle hover:text-neutral-text text-2xl font-bold leading-none">&times;</button>
        </div>
        
        <div className="p-6 overflow-y-auto">
            <div className="space-y-4 text-neutral-subtle">
                <p>
                    <strong>DISTRIBUCIONES NICOLAS</strong> nació con la misión de ser más que una simple tienda; aspiramos a ser tu aliado de confianza en el cuidado de la salud y el bienestar de tu hogar. Somos una empresa familiar comprometida con ofrecer productos de la más alta calidad a precios justos, garantizando siempre un servicio cercano y personalizado.
                </p>
                <p>
                    Nuestra selección de productos de droguería y aseo general está cuidadosamente elegida para cubrir todas tus necesidades. Desde medicamentos esenciales hasta las últimas novedades en cuidado personal y limpieza del hogar, trabajamos con las mejores marcas para asegurar tu satisfacción.
                </p>
                <p>
                    Creemos firmemente en la importancia de la atención al detalle y en la construcción de relaciones duraderas con nuestros clientes. Por eso, nuestro equipo está siempre dispuesto a asesorarte y a garantizar que tu experiencia de compra sea fácil, rápida y segura. ¡Gracias por confiar en nosotros!
                </p>
            </div>
        </div>

        <div className="p-4 border-t border-stone-200 bg-stone-50 rounded-b-lg flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="bg-neutral-accent text-white font-bold py-2 px-6 rounded-lg hover:bg-neutral-accent-hover transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
