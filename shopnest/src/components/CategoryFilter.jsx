import React from "react";

function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}) {
  const categoryLabels = {
    all: "All",
    electronics: "Electronics",
    jewelery: "Jewelry",
    "men's clothing": "Men's Clothing",
    "women's clothing": "Women's Clothing",
  };

  return (
    <div className="category-filter">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className={`category-button ${
            selectedCategory === category ? "active" : ""
          }`}
          onClick={() => onCategoryChange(category)}
        >
          {categoryLabels[category] || category}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;