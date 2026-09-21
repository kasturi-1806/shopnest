import React from "react";
import { useSelector } from "react-redux";
import ProductGrid from "../components/ProductGrid";
import EmptyState from "../components/EmptyState";
function Wishlist() {
  const items = useSelector((state) => state.wishlist.items);
  return (
    <div className="page-container">
      <div className="page-hero compact">
        <span className="eyebrow">SAVED FOR LATER</span>
        <h1>Your wishlist</h1>
        <p>Keep the products you love close by.</p>
      </div>
      {items.length ? (
        <ProductGrid products={items} />
      ) : (
        <EmptyState
          icon="♡"
          title="Your wishlist is empty."
          message="Start adding products you love!"
          actionText="Discover Products"/>
      )}
    </div>
  );
}
export default Wishlist;
