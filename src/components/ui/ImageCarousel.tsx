import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageCarouselProps {
  images: string[];
}

export const ImageCarousel = ({ images }: ImageCarouselProps) => {
  const [index, setIndex] = useState(0);

  if (!images || images.length === 0)
    return (
      <div className="h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center rounded-lg text-gray-400 dark:text-gray-500">
        No image
      </div>
    );

  const hasMultiple = images.length > 1;

  const next = () => setIndex((i) => (i + 1) % images.length);
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);

  return (
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
            alt={`Image ${i + 1} of ${images.length} the project`}
            className="w-full h-full object-cover shrink-0"
            loading={i === 0 ? "eager" : "lazy"} 
          />
        ))}
      </div>

      {hasMultiple && (
        <>
          <button
            onClick={prev}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 dark:bg-white/20 text-white dark:text-gray-900 p-2 rounded-full hover:bg-black/75 dark:hover:bg-white/30 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={next}
            aria-label="Next image"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 dark:bg-white/20 text-white dark:text-gray-900 p-2 rounded-full hover:bg-black/75 dark:hover:bg-white/30 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
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
  );
};
