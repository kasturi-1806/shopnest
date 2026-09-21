import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../services/api";
import { addToCart } from "../store/cartSlice";
import { toggleWishlist } from "../store/wishlistSlice";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import QuantityControl from "../components/QuantityControl";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [added, setAdded] = useState(false);

  const isWishlisted = useSelector((state) =>
    state.wishlist.items.some((item) => item.id === Number(id))
  );

  useEffect(() => {
    let active = true;

    async function loadProduct() {
      setLoading(true);
      setError("");

      try {
        const data = await fetchProductById(id);
        if (active) setProduct(data);
      } catch (err) {
        if (active) setError(err.message || "Product not found.");
      } finally {
        if (active) setLoading(false);
      }
    }

    loadProduct();

    return () => {
      active = false;
    };
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    for (let index = 0; index < quantity; index += 1) {
      dispatch(addToCart(product));
    }

    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  };

  if (loading) return <Loading text="✨ Loading product details..." />;
  if (error || !product) {
    return (
      <div className="page-container">
        <ErrorMessage message={error || "Product not found."} onRetry={() => navigate("/products")} />
      </div>
    );
  }

  return (
    <div className="page-container">
      <Link className="back-link" to="/products">← Back to products</Link>

      <section className="details-layout">
        <div className="details-image-panel">
          <img src={product.image} alt={product.title} />
        </div>

        <div className="details-copy">
          <span className="product-category">{product.category}</span>
          <h1>{product.title}</h1>

          <div className="details-rating">
            <span>⭐ {Number(product.rating?.rate || 0).toFixed(1)} / 5</span>
            <span>({product.rating?.count || 0} reviews)</span>
          </div>

          <div className="details-price">₹{(Number(product.price) * 85).toFixed(2)}</div>

          <p className="details-description">{product.description}</p>

          <div className="details-purchase-row">
            <QuantityControl
              quantity={quantity}
              onDecrease={() => setQuantity((value) => Math.max(1, value - 1))}
              onIncrease={() => setQuantity((value) => value + 1)}
            />
            <button className="primary-btn" type="button" onClick={handleAddToCart}>
              {added ? "✓ Added to cart" : "Add to Cart"}
            </button>
          </div>

          <button
            className={`wishlist-large-btn ${isWishlisted ? "active" : ""}`}
            type="button"
            onClick={() => dispatch(toggleWishlist(product))}
          >
            {isWishlisted ? "♥ Remove from Wishlist" : "♡ Add to Wishlist"}
          </button>

          <div className="details-trust">
            <span>🚚 Fast delivery</span>
            <span>🔒 Secure shopping</span>
            <span>↩ Easy returns</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductDetails;