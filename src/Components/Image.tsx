import React, { useState } from 'react';
import { ImageType } from './types';
import { FIXED_IMAGE_WIDTH } from '../config';
import missingImage from '../Assets/missing-200.png';

interface ImageProps {
  image: ImageType;
}

const Image: React.FC<ImageProps> = ({ image }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [src, setSrc] = useState(image.fixed_width_url);
  const [hasError, setHasError] = useState(false);

  return (
    <div 
      className="image-wrapper"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ width: FIXED_IMAGE_WIDTH }}
    >
      <img 
        src={hasError ? missingImage : src} 
        className="image" 
        alt={image.alt_text} 
        onError={() => setHasError(true)} 
        style={{ width: FIXED_IMAGE_WIDTH }}
      />
      {isHovered && <div className="alt-text">{image.alt_text}</div>}
    </div>
  );
};

export default Image;
