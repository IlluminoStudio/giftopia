import React, { useState, useEffect } from "react";
import "./App.css";
import ImageList from './Components/ImageList';
import Header from './Components/Header'; // Import Header
import SearchBar from './Components/SearchBar'; // Import SearchBar
import { fetchImages } from './utils/fetchImages'; // Import fetchImages
import { doSearch } from './utils/doSearch'; // Import handleSearch

export default function App() {
const [images, setImages] = useState([]);
//  eslint-disable-next-line @typescript-eslint/no-unused-vars
const [showingTrending, setShowingTrending] = useState(true);

useEffect(() => {
  fetchImages().then(setImages).catch(console.error);
}, []);

return (
  <div className="App">
    <Header />    
    <ImageList images={images} />
    <SearchBar onSearch={(searchTerm) => doSearch(setImages, setShowingTrending, searchTerm)} /> {/* Use handleSearch from doSearch */}
  </div>
);
}