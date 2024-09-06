import React from 'react';
import Image from './Image';
import { ImageType } from './types';

const sampleImages: ImageType[] = [
  {
    id: '1',
    alt_text: 'Funny cat GIF',
    fixed_width_url: 'https://media1.giphy.com/media/cZ7rmKfFYOvYI/200w.gif',
  },
  {
    id: '2',
    alt_text: 'Dancing dog GIF',
    fixed_width_url: 'https://media2.giphy.com/media/3o6Zt481isNVuQI1l6/200w.gif',
  },
  {
    id: '3',
    alt_text: 'Excited baby GIF',
    fixed_width_url: 'https://media3.giphy.com/media/11sBLVxNs7v6WA/200w.gif',
  },
  {
    id: '4',
    alt_text: 'Happy dance GIF',
    fixed_width_url: 'https://media4.giphy.com/media/26tPplGWjN0xLybiU/200w.gif',
  },
  {
    id: '5',
    alt_text: 'Surprised Pikachu GIF',
    fixed_width_url: 'https://media5.giphy.com/media/2v170e71aanfi/200w.gif',
  },
  {
    id: '6',
    alt_text: 'Laughing Minions GIF',
    fixed_width_url: 'https://media6.giphy.com/media/l0HlBO7eyXzSZkJri/200w.gif',
  },
  {
    id: '7',
    alt_text: 'Thumbs up GIF',
    fixed_width_url: 'https://media7.giphy.com/media/3oEjI6SIIHBdRxXI40/200w.gif',
  },
  {
    id: '8',
    alt_text: 'Clapping GIF',
    fixed_width_url: 'https://media8.giphy.com/media/3o6Zt8LdGz8g8gEnnK/200w.gif',
  },
  {
    id: '9',
    alt_text: 'Waving bear GIF',
    fixed_width_url: 'https://media9.giphy.com/media/3o6ZtpxSZbQRRnwCKQ/200w.gif',
  },
  {
    id: '10',
    alt_text: 'Dancing baby GIF',
    fixed_width_url: 'https://media10.giphy.com/media/26tPplGWjN0xLybiU/200w.gif',
  }
];

const ImageList: React.FC = () => {
  return (
    <div className="image-list" >
      {sampleImages.map(image => (
        <Image key={image.id} image={image} />
      ))}
    </div>
  );
};

export default ImageList;
