import {
  GIPHY_SEARCH_BASE_URL,
  GIPHY_API_KEY,
  GIPHY_TRENDING_BASE_URL,
  RETRIEVE_GIFS_LIMIT,
} from "../config";

export const fetchImages = async (searchTerm?: string) => {
  const baseUrl = searchTerm ? GIPHY_SEARCH_BASE_URL : GIPHY_TRENDING_BASE_URL;
  const queryParam = searchTerm ? `&q=${encodeURIComponent(searchTerm)}` : "";
  const url = `${baseUrl}?api_key=${GIPHY_API_KEY}&limit=${RETRIEVE_GIFS_LIMIT}${queryParam}&offset=0&rating=g&lang=en`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    // console.log(response);
    const data = await response.json();
    if (data.data) {
      const receivedImages = data.data.map((item: any) => {
        return {
          id: `${item.id}_${Date.now()}`, // Add timestamp to ensure uniqueness
          title: item.title,
          fixed_width_url: item.images.fixed_width.url,
          favourite: false, // Set default value to false
        };
      });
      // console.log("Received images:", receivedImages);
      return receivedImages;
    }
    return [];
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
};
