import React from "react";
import ProductCard from "./ProductCard";
import EmptyState from "./EmptyState";

function ProductGrid({ products }) {
  if (!products.length) {
    return (
      <EmptyState
        icon="🔎"
        title="No products found"
        message="Try another search or choose a different category."
      />
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;