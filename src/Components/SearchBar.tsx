import React, { useState } from "react";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [displayText, setDisplayText] = useState("");

  const handleSearch = async () => {
    if (searchTerm.trim()) {
      setDisplayText(`Displaying GIFs for: '${searchTerm}'`);
      onSearch(searchTerm);
      setSearchTerm("");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-bar">
      <input
        id="search-input"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
        onKeyDown={handleKeyDown}
        placeholder="Search for fun..."
      />
      <IconButton onClick={handleSearch} aria-label="search">
        <SearchIcon style={{ color: "var(--primary-700)" }} />
      </IconButton>
      <span className="display-search-term">{displayText}</span>
    </div>
  );
};

export default SearchBar;
