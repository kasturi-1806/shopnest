import React from "react";

function SortDropdown({ value, onChange }) {
  return (
    <select
      className="sort-dropdown"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="default">Default</option>
      <option value="price-low">Price: Low to High</option>
      <option value="price-high">Price: High to Low</option>
      <option value="rating-high">Rating: High to Low</option>
    </select>
  );
}

export default SortDropdown;