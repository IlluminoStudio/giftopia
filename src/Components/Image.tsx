import React, { useState } from 'react';
import { ImageType } from './types';
import { FIXED_IMAGE_WIDTH } from '../config';
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
      style={{ width: FIXED_IMAGE_WIDTH, position: 'relative' }} // Enable relative positioning
    >
      <img
        src={hasError ? missingImage : src}
        className="image"
        alt={image.title}
        onError={() => setHasError(true)}
        style={{ width: FIXED_IMAGE_WIDTH }}
      />
      {/* Favourite button floating on top of the image */}
      <button
        onClick={() => onFavouriteToggle(image.id)}
        className={`favourite-button ${image.favourite ? 'favourited' : ''}`}
      >
        {image.favourite ? '★' : '☆'} {/* Star icon */}
      </button>

      {isHovered && <div className="alt-text">{image.title}</div>}
    </div>
  );
};

export default Image;
