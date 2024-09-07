import React, { useState, useEffect } from "react";
import "./App.css";
import ImageList from './Components/ImageList';
import Header from './Components/Header';
import SearchBar from './Components/SearchBar';
import { ErrorBoundary } from './Components/ErrorBoundary';
import { fetchImages } from './utils/fetchImages';
import { doSearch } from './utils/doSearch';

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
    <ErrorBoundary fallback={<p>There was an error loading gifs. Please try again.</p>}>
      <ImageList images={images} />
    </ErrorBoundary>
    <SearchBar onSearch={(searchTerm) => doSearch(setImages, setShowingTrending, searchTerm)} />
  </div>
);
}