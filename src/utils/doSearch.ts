import { fetchImages } from './fetchImages';

export const doSearch = async (setImages: Function, setShowingTrending: Function,searchTerm?: string) => {
  setShowingTrending(!searchTerm);
  try {
    const receivedImages = await fetchImages(searchTerm);
    setImages(receivedImages);
  } catch (error) {
    console.error('Fetch error:', error);
  }
};
