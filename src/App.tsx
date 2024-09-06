import React from "react";
import "./App.css";
import ImageList from './Components/ImageList';
import Header from './Components/Header'; // Import Header

export default function App() {
  return (
    <div className="App">
      <Header />
      <ImageList />
    </div>
  );
}
