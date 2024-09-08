import {
  GIPHY_SEARCH_BASE_URL,
  GIPHY_API_KEY,
  GIPHY_TRENDING_BASE_URL,
  RETRIEVE_GIFS_LIMIT,
} from "../config";

interface ImageType {
  id: string;
  title: string;
  fixed_width_url: string;
  favourite: boolean;
}

export const fetchImages = async (searchTerm?: string): Promise<ImageType[]> => {
  const baseUrl = searchTerm ? GIPHY_SEARCH_BASE_URL : GIPHY_TRENDING_BASE_URL;
  const queryParam = searchTerm ? `&q=${encodeURIComponent(searchTerm)}` : "";
  const url = `${baseUrl}?api_key=${GIPHY_API_KEY}&limit=${RETRIEVE_GIFS_LIMIT}${queryParam}&offset=0&rating=g&lang=en`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    if (data.data) {
      const receivedImages: ImageType[] = data.data.map((item: any) => {
        return {
          id: `${item.id}_${Date.now()}`, // Giphy may return duplicate GIFs, so lets add some uniqueness to the id
          title: item.title && item.title.length > 0 ? item.title : "An awesome GIF from Gyphi",
          fixed_width_url: item.images.fixed_width.url,
          favourite: false,
        };
      });
      return receivedImages;
    }
    return [];
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
};
