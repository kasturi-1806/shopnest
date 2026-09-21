import React from "react";

function SearchBar({ value, onSearch }) {
  return (
    <form
      className="search-bar"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="search-input-wrapper">
        <span className="search-icon">🔍</span>

        <input
          type="text"
          placeholder="Search products..."
          value={value}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <button type="submit" className="search-button">
        Search
      </button>
    </form>
  );
}

export default SearchBar;