import { useState, useCallback, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Portal } from '@/components/ui/Portal';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { useBodyScrollLock } from '@/lib/hooks/useBodyScrollLock';
import { useFocusTrap } from '@/lib/hooks/useFocusTrap';
import { useTranslation } from '@/lib/hooks/useTranslation';

interface ImageCarouselProps {
  images: string[];
}

interface ImageModalProps {
  imageSrc: string;
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const ImageModal = ({
  imageSrc,
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}: ImageModalProps) => {
  const { t } = useTranslation();
  const modalRef = useRef<HTMLDivElement>(null);
  const hasMultiple = images.length > 1;

  useFocusTrap(true, modalRef, { onClose });
  useBodyScrollLock(true);

  useEffect(() => {
    if (!hasMultiple) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        onPrev();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        onNext();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [hasMultiple, onNext, onPrev]);

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-label={t('imageViewer')}
      className="fixed inset-0 z-100 flex items-center justify-center overscroll-contain bg-black/50 backdrop-blur-lg"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label={t('closeView')}
        className="fixed right-6 top-6 z-130 rounded-full border border-white/20 bg-black/60 p-3 text-white shadow-2xl backdrop-blur-md transition-[background-color,transform] hover:scale-110 hover:bg-black/80 active:scale-95"
      >
        <X className="h-6 w-6" aria-hidden="true" />
      </button>

      {hasMultiple && (
        <div className="animate-in fade-in zoom-in fixed bottom-10 left-1/2 z-130 flex -translate-x-1/2 items-center gap-4 duration-300">
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onPrev();
            }}
            aria-label={t('previousImage')}
            className="rounded-full border border-white/10 bg-black/60 p-3 text-white shadow-xl backdrop-blur-md transition-[background-color,transform] hover:bg-primary active:scale-90"
          >
            <ChevronLeft className="h-6 w-6" aria-hidden="true" />
          </button>

          <div
            aria-live="polite"
            className="min-w-[100px] rounded-full border border-white/10 bg-black/60 px-6 py-2.5 text-center text-sm font-medium text-white shadow-2xl backdrop-blur-md"
          >
            <span className="text-white/90">{currentIndex + 1}</span>
            <span className="mx-2 text-white/30">/</span>
            <span className="text-white/90">{images.length}</span>
          </div>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onNext();
            }}
            aria-label={t('nextImage')}
            className="rounded-full border border-white/10 bg-black/60 p-3 text-white shadow-xl backdrop-blur-md transition-[background-color,transform] hover:bg-primary active:scale-90"
          >
            <ChevronRight className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      )}

      <div
        className="relative flex h-full w-full items-center justify-center p-4"
        onClick={(event) => event.stopPropagation()}
      >
        <OptimizedImage
          src={imageSrc}
          alt={`${t('expandedImage')} ${currentIndex + 1}`}
          width={1600}
          height={900}
          className="h-auto max-h-[70vh] w-auto select-none rounded-control object-contain shadow-2xl transition-[opacity,transform] duration-500 md:max-h-[80vh]"
        />
      </div>
    </div>
  );
};

export const ImageCarousel = ({ images }: ImageCarouselProps) => {
  const [index, setIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();

  const imageCount = images?.length ?? 0;
  const hasImages = imageCount > 0;
  const hasMultiple = imageCount > 1;

  const next = useCallback(
    () => setIndex((i) => (i + 1) % imageCount),
    [imageCount],
  );
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + imageCount) % imageCount),
    [imageCount],
  );

  if (!hasImages)
    return (
      <div className="flex h-full items-center justify-center rounded-card bg-border text-text-light italic dark:bg-surface-dark dark:text-text-light-dark">
        {t('noImagesAvailable')}
      </div>
    );

  return (
    <>
      <div className="group relative h-full w-full overflow-hidden rounded-card border border-black/5 bg-border shadow-soft dark:border-white/5 dark:bg-background-dark">
        <div
          className="flex h-full transition-transform duration-500 ease-out motion-reduce:transition-none"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {images.map((src, i) => (
            <button
              key={i}
              type="button"
              tabIndex={i === index ? 0 : -1}
              onClick={() => {
                setIndex(i);
                setIsModalOpen(true);
              }}
              aria-label={`${t('openImage')} ${i + 1}`}
              className="h-full w-full shrink-0 cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <OptimizedImage
                src={src}
                alt={`${t('imageThumbnail')} ${i + 1}`}
                width={800}
                height={450}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>

        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                prev();
              }}
              aria-label={t('previousImage')}
              className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2 text-black shadow-lg transition-opacity duration-300 hover:bg-white dark:bg-black/70 dark:text-white dark:hover:bg-black"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                next();
              }}
              aria-label={t('nextImage')}
              className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2 text-black shadow-lg transition-opacity duration-300 hover:bg-white dark:bg-black/70 dark:text-white dark:hover:bg-black"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>

            <div className="absolute bottom-3 left-0 right-0 z-10 flex justify-center gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    setIndex(i);
                  }}
                  aria-label={`${t('goToImage')} ${i + 1}`}
                  aria-current={i === index ? 'true' : undefined}
                  className={`h-2 rounded-full border border-black/10 shadow-md transition-[width,background-color] ${
                    i === index
                      ? 'w-6 bg-primary'
                      : 'w-2 bg-white/80 hover:bg-white dark:bg-gray-400/70'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {isModalOpen && (
        <Portal wrapperId="image-modal-portal">
          <ImageModal
            imageSrc={images[index]}
            images={images}
            currentIndex={index}
            onClose={() => setIsModalOpen(false)}
            onNext={next}
            onPrev={prev}
          />
        </Portal>
      )}
    </>
  );
};
