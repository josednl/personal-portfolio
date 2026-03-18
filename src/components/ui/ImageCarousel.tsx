import { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Portal } from '@/components/ui/Portal';
import { OptimizedImage } from '@/components/ui/OptimizedImage';

interface ImageCarouselProps {
  images: string[];
}

interface ImageModalProps {
  isOpen: boolean;
  imageSrc: string;
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const ImageModal = ({
  isOpen,
  imageSrc,
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}: ImageModalProps) => {
  if (!isOpen) return null;

  const hasMultiple = images.length > 1;

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative overflow-hidden rounded-lg shadow-2xl flex items-center justify-center bg-black/20 border border-white/5">
          
          <button
            onClick={onClose}
            aria-label="Cerrar vista"
            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/70 text-white hover:bg-black/90 transition-all border border-white/20 shadow-xl hover:scale-110 active:scale-95"
          >
            <X className="w-6 h-6" />
          </button>

          <OptimizedImage
            src={imageSrc}
            alt={`Imagen expandida ${currentIndex + 1}`}
            width={1600}
            height={900}
            className="object-contain max-h-[85vh] w-auto block select-none"
          />

          {hasMultiple && (
            <>
              <button
                onClick={onPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-black/70 text-white hover:bg-black/90 transition-all border border-white/20 shadow-xl hover:scale-110 active:scale-95"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>

              <button
                onClick={onNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-black/70 text-white hover:bg-black/90 transition-all border border-white/20 shadow-xl hover:scale-110 active:scale-95"
              >
                <ChevronRight className="w-8 h-8" />
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 px-4 py-1.5 rounded-full bg-black/70 text-white text-sm font-bold border border-white/20 backdrop-blur-md shadow-lg">
                {currentIndex + 1} / {images.length}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export const ImageCarousel = ({ images }: ImageCarouselProps) => {
  const [index, setIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!images || images.length === 0)
    return (
      <div className="h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center rounded-lg text-gray-400">
        No images available
      </div>
    );

  const hasMultiple = images.length > 1;

  const next = useCallback(() => setIndex((i) => (i + 1) % images.length), [images.length]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + images.length) % images.length), [images.length]);

  return (
    <>
      <div className="relative group w-full h-full overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-900 shadow-sm border border-black/5 dark:border-white/5">
        <div
          className="flex h-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {images.map((src, i) => (
            <OptimizedImage
              key={i}
              src={src}
              alt={`Miniatura ${i + 1}`}
              width={800}
              height={450}
              className="w-full h-full object-cover shrink-0 cursor-zoom-in"
              onClick={() => setIsModalOpen(true)}
            />
          ))}
        </div>

        {hasMultiple && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-black/70 text-black dark:text-white p-2 rounded-full shadow-lg transition-opacity duration-300 hover:bg-white dark:hover:bg-black"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-black/70 text-black dark:text-white p-2 rounded-full shadow-lg transition-opacity duration-300 hover:bg-white dark:hover:bg-black"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 z-10">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setIndex(i); }}
                  className={`h-2 rounded-full transition-all shadow-md border border-black/10 ${
                    i === index
                      ? 'w-6 bg-blue-500'
                      : 'w-2 bg-white/80 dark:bg-gray-400/70 hover:bg-white'
                  }`}
                  aria-label={`Ir a imagen ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <Portal wrapperId="image-modal-portal">
        <ImageModal
          isOpen={isModalOpen}
          imageSrc={images[index]}
          images={images}
          currentIndex={index}
          onClose={() => setIsModalOpen(false)}
          onNext={next}
          onPrev={prev}
        />
      </Portal>
    </>
  );
};
