import React, { useState, useEffect, useRef } from 'react';

export interface Slide {
  id: number;
  imageUrl: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaAction: () => void;
}

interface HeroProps {
  slides: Slide[];
}

export const Hero: React.FC<HeroProps> = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<number | null>(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = window.setTimeout(
      () =>
        setCurrentIndex((prevIndex) =>
          prevIndex === slides.length - 1 ? 0 : prevIndex + 1
        ),
      5000 // Change slide every 5 seconds
    );

    return () => {
      resetTimeout();
    };
  }, [currentIndex, slides.length]);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };
  
  const currentSlide = slides[currentIndex];

  return (
    <section 
      className="relative h-[60vh] min-h-[400px] w-full overflow-hidden text-white"
      aria-roledescription="carousel"
      aria-label="Promociones destacadas"
    >
      <div className="w-full h-full relative">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
            style={{ backgroundImage: `url('${slide.imageUrl}')` }}
            aria-hidden={index !== currentIndex}
          ></div>
        ))}
      </div>

      <div className="absolute inset-0 bg-black/50" aria-hidden="true"></div>

      <div className="relative z-10 container mx-auto px-6 h-full flex flex-col items-center justify-center text-center">
         <div className="w-full max-w-4xl transition-all duration-700 ease-in-out" key={currentSlide.id}>
             <h2
                id="hero-heading"
                className="text-4xl md:text-6xl font-bold mb-4 animate-pop-in-up"
                style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
            >
                {currentSlide.title}
            </h2>
            <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 animate-pop-in-up" style={{ animationDelay: '200ms', textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>
                {currentSlide.subtitle}
            </p>
            <button
                onClick={currentSlide.ctaAction}
                className="bg-neutral-accent text-white font-bold py-3 px-8 rounded-lg hover:bg-neutral-accent-hover transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black/50 focus:ring-neutral-accent animate-pop-in-up"
                style={{ animationDelay: '400ms' }}
            >
                {currentSlide.ctaText}
            </button>
         </div>
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={goToPrevious}
        className="absolute top-1/2 left-4 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full p-2 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="Diapositiva anterior"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
      </button>
      <button 
        onClick={goToNext}
        className="absolute top-1/2 right-4 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full p-2 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="Siguiente diapositiva"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, slideIndex) => (
          <button
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === slideIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'}`}
            aria-label={`Ir a la diapositiva ${slideIndex + 1}`}
            aria-current={currentIndex === slideIndex}
          ></button>
        ))}
      </div>
    </section>
  );
};