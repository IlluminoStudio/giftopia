import React, { useEffect, useState } from 'react';
import Image from './Image';
import { ImageType } from './types';

const ImageList: React.FC<{ images: ImageType[] }> = ({ images }) => {
  const [displayingImages, setDisplayingImages] = useState(images);

  // Function to strip the timestamp from the ID
  const stripTimestampFromId = (id: string) => id.split('_')[0];

  // Load favourites from localStorage
  useEffect(() => {
    const favouritesFromStorage = JSON.parse(localStorage.getItem('favourites') || '{}');
    
    const imagesWithFavourites = images.map(image => {
      const baseId = stripTimestampFromId(image.id);
      return {
        ...image,
        favourite: favouritesFromStorage[baseId] || false, // Apply favourite if stored
      };
    });

    setDisplayingImages(imagesWithFavourites);
  }, [images]);

  // Handle favourite toggling
  const handleFavouriteToggle = (id: string) => {
    const updatedImages = displayingImages.map((img) =>
      img.id === id ? { ...img, favourite: !img.favourite } : img
    );
    setDisplayingImages(updatedImages);

    // Update localStorage
    const favourites = updatedImages.reduce((acc, img) => {
      const baseId = stripTimestampFromId(img.id);
      if (img.favourite) {
        acc[baseId] = true;  // Store base ID only
      }
      return acc;
    }, {} as Record<string, boolean>);
    
    localStorage.setItem('favourites', JSON.stringify(favourites));
  };

  return (
    <div className="image-list">
      {displayingImages.length === 0 ? (
        <p className="no-gifs-message">Yikes! The GIFs took a coffee break ☕. Search again to wake them up!</p>
      ) : (
        displayingImages.map((image) => (
          <Image
            key={image.id}
            image={image}
            onFavouriteToggle={handleFavouriteToggle}
          />
        ))
      )}
    </div>
  );
};

export default ImageList;


// const sampleImages: ImageType[] = [
//   {
//     id: "1",
//     title: "Funny cat GIF",
//     fixed_width_url: "https://media1.giphy.com/media/cZ7rmKfFYOvYI/200w.gif",
//   },
//   {
//     id: "2",
//     title: "Dancing dog GIF",
//     fixed_width_url:
//       "https://media2.giphy.com/media/3o6Zt481isNVuQI1l6/200w.gif",
//   },
//   {
//     id: "3",
//     title: "Excited baby GIF",
//     fixed_width_url: "https://media3.giphy.com/media/11sBLVxNs7v6WA/200w.gif",
//   },
//   {
//     id: "4",
//     title: "Happy dance GIF",
//     fixed_width_url:
//       "https://media4.giphy.com/media/26tPplGWjN0xLybiU/200w.gif",
//   },
//   {
//     id: "5",
//     title: "Surprised Pikachu GIF",
//     fixed_width_url: "https://media5.giphy.com/media/2v170e71aanfi/200w.gif",
//   },
//   {
//     id: "6",
//     title: "Laughing Minions GIF",
//     fixed_width_url:
//       "https://media6.giphy.com/media/l0HlBO7eyXzSZkJri/200w.gif",
//   },
//   {
//     id: "7",
//     title: "Thumbs up GIF",
//     fixed_width_url:
//       "https://media7.giphy.com/media/3oEjI6SIIHBdRxXI40/200w.gif",
//   },
//   {
//     id: "8",
//     title: "Clapping GIF",
//     fixed_width_url:
//       "https://media8.giphy.com/media/3o6Zt8LdGz8g8gEnnK/200w.gif",
//   },
//   {
//     id: "9",
//     title: "Waving bear GIF",
//     fixed_width_url:
//       "https://media9.giphy.com/media/3o6ZtpxSZbQRRnwCKQ/200w.gif",
//   },
//   {
//     id: "10",
//     title: "Dancing baby GIF",
//     fixed_width_url:
//       "https://media10.giphy.com/media/26tPplGWjN0xLybiU/200w.gif",
//   },
// ];