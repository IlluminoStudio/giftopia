import React, { useState } from 'react';
import { ImageType } from './types';
import missingImage from '../Assets/missing-200.png';

interface ImageProps {
  image: ImageType;
  onFavouriteToggle: (id: string) => void;
}

const Image: React.FC<ImageProps> = ({ image, onFavouriteToggle }) => {
  const [isHovered, setIsHovered] = useState(false);
  //  eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [src, setSrc] = useState(image.fixed_width_url);
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className="image-wrapper"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={hasError ? missingImage : src}
        className="image"
        alt={image.title}
        onError={() => setHasError(true)}
      />
      <button
        onClick={() => onFavouriteToggle(image.id)}
        className={`favourite-button ${image.favourite ? 'favourited' : ''}`}
      >
        {image.favourite ? '★' : '☆'}
      </button>

      {isHovered && <div className="alt-text">{image.title}</div>}
    </div>
  );
};

export default Image;
