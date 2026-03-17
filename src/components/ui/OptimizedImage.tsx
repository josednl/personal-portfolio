import { ImgHTMLAttributes } from 'react';

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  width: number;
  height: number;
  placeholder?: string;
}

export const OptimizedImage = ({
  width,
  height,
  placeholder,
  className = '',
  ...props
}: OptimizedImageProps) => {
  const bgStyle = placeholder ? { backgroundColor: placeholder } : {};

  return (
    <img
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      className={`block ${className}`}
      style={{ ...bgStyle, ...(props.style || {}) }}
      {...props}
    />
  );
};
