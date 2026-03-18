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
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 backdrop-blur-lg"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Close view"
        className="fixed top-6 right-6 z-130 p-3 rounded-full bg-black/60 text-white hover:bg-black/80 transition-all border border-white/20 shadow-2xl backdrop-blur-md hover:scale-110 active:scale-95"
      >
        <X className="w-6 h-6" />
      </button>

      {hasMultiple && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-130 flex items-center gap-4 animate-in fade-in zoom-in duration-300">
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="p-3 rounded-full bg-black/60 text-white hover:bg-blue-600 transition-all border border-white/10 shadow-xl backdrop-blur-md active:scale-90"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="px-6 py-2.5 rounded-full bg-black/60 text-white text-sm font-medium border border-white/10 backdrop-blur-md shadow-2xl min-w-[100px] text-center">
            <span className="text-white/90">{currentIndex + 1}</span>
            <span className="mx-2 text-white/30">/</span>
            <span className="text-white/90">{images.length}</span>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="p-3 rounded-full bg-black/60 text-white hover:bg-blue-600 transition-all border border-white/10 shadow-xl backdrop-blur-md active:scale-90"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}

      <div 
        className="relative w-full h-full flex items-center justify-center p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <OptimizedImage
          src={imageSrc}
          alt={`Expanded image ${currentIndex + 1}`}
          width={1600}
          height={900}
          className="object-contain max-h-[70vh] md:max-h-[80vh] w-auto h-auto select-none rounded-sm shadow-2xl transition-all duration-500"
        />
      </div>
    </div>
  );
};

export const ImageCarousel = ({ images }: ImageCarouselProps) => {
  const [index, setIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!images || images.length === 0)
    return (
      <div className="h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center rounded-lg text-gray-400 italic">
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
              alt={`Thumbnail ${i + 1}`}
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
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-black/70 text-black dark:text-white p-2 rounded-full shadow-lg transition-opacity duration-300 hover:bg-white dark:hover:bg-black z-10"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-black/70 text-black dark:text-white p-2 rounded-full shadow-lg transition-opacity duration-300 hover:bg-white dark:hover:bg-black z-10"
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
                  aria-label={`Go to image ${i + 1}`}
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
