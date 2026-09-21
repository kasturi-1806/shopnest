import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { toggleWishlist } from "../store/wishlistSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();

  const [showNotification, setShowNotification] = useState(false);

  const wishlistItems = useSelector(
    (state) => state.wishlist.items
  );

  const isWishlisted = wishlistItems.some(
    (item) => item.id === product.id
  );

  const handleAddToCart = () => {
    dispatch(addToCart(product));

    setShowNotification(true);

    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
  };

  const handleWishlist = () => {
    dispatch(toggleWishlist(product));
  };

  return (
    <>
      <article className="product-card">

        {/* IMAGE SECTION */}
        <div className="product-image-box">

          <img
            src={product.image}
            alt={product.title}
            className="product-image"
            loading="lazy"
          />

          <button
            type="button"
            className={`wishlist-button ${
              isWishlisted ? "active" : ""
            }`}
            onClick={handleWishlist}
            aria-label="Toggle wishlist"
          >
            {isWishlisted ? "♥" : "♡"}
          </button>

        </div>

        {/* PRODUCT INFORMATION */}
        <div className="product-content">

          <div className="product-category">
            {product.category}
          </div>

          <h3 className="product-title">
            {product.title}
          </h3>

          <div className="product-rating">
            <span className="rating-star">⭐</span>

            <span>
              {product.rating?.rate?.toFixed(1) || "0.0"}
            </span>

            <span className="rating-count">
              ({product.rating?.count || 0})
            </span>
          </div>

          <div className="product-bottom">

            <span className="product-price">
              ₹{(Number(product.price) * 85).toFixed(2)}
            </span>

            <Link
              to={`/products/${product.id}`}
              className="details-link"
            >
              Details
            </Link>

          </div>

          <button
            type="button"
            className="add-cart-button"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>

        </div>

      </article>

      {/* CART NOTIFICATION */}
      {showNotification && (
        <div className="cart-notification">
          <span className="cart-notification-icon">✓</span>

          <div>
            <strong>Added to cart</strong>
            <p>{product.title}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductCard;