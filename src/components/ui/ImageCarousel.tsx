import { useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Portal } from "@/components/ui/Portal";

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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl max-h-[90vh] w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close image preview"
          className="absolute top-4 right-4 z-10 p-3 bg-white/30 text-white rounded-full hover:bg-white/50 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="h-full w-full flex items-center justify-center">
          <img
            src={imageSrc}
            alt={`Large image ${currentIndex + 1} of ${images.length}`}
            className="object-contain max-h-[90vh] max-w-full rounded-lg shadow-2xl"
          />
        </div>

        {hasMultiple && (
          <>
            <button
              onClick={onPrev}
              aria-label="Previous image"
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/30 text-white rounded-full hover:bg-white/50 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={onNext}
              aria-label="Next image"
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/30 text-white rounded-full hover:bg-white/50 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export const ImageCarousel = ({ images }: ImageCarouselProps) => {
  const [index, setIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!images || images.length === 0)
    return (
      <div className="h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center rounded-lg text-gray-400 dark:text-gray-500">
        No image
      </div>
    );

  const hasMultiple = images.length > 1;

  const next = useCallback(() => setIndex((i) => (i + 1) % images.length), [images.length]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + images.length) % images.length), [images.length]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div
        className="relative w-full h-full overflow-hidden rounded-lg"
        role="group"
        aria-label="Project image gallery"
      >
        <div
          className="flex h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Image ${i + 1} of ${images.length} in the project. Click to enlarge.`}
              className="w-full h-full object-cover shrink-0 cursor-pointer"
              loading={i === 0 ? "eager" : "lazy"} 
              onClick={openModal}
            />
          ))}
        </div>

        {hasMultiple && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 dark:bg-white/20 text-white dark:text-gray-900 p-2 rounded-full hover:bg-black/75 dark:hover:bg-white/30 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 z-10"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Next image"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 dark:bg-white/20 text-white dark:text-gray-900 p-2 rounded-full hover:bg-black/75 dark:hover:bg-white/30 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 z-10"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 z-10">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setIndex(i); }}
                  aria-label={`Go to image ${i + 1}`}
                  className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                    i === index
                      ? "bg-white dark:bg-gray-200 scale-125 ring-2 ring-blue-500"
                      : "bg-white/60 dark:bg-gray-400/60 hover:bg-white dark:hover:bg-gray-200"
                  }`}
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
          onClose={closeModal}
          onNext={next}
          onPrev={prev}
        />
      </Portal>
    </>
  );
};
