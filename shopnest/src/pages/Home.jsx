import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductGrid from "../components/ProductGrid";
import Loading from "../components/Loading";

const categoryIcons = {
  electronics: "📱",
  jewelery: "💎",
  "men's clothing": "👕",
  "women's clothing": "👗"
};

function Home() {
  const { products, categories, loading } = useSelector((state) => state.products);
  const featured = products.slice(0, 4);

  return (
    <div>
      <section className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow">WELCOME TO SHOPNEST</span>
          <h1>Shop smarter.<br />Find products you'll love. ✨</h1>
          <p>
            Discover everyday essentials, statement pieces and tech favorites
            in one beautifully simple shopping experience.
          </p>
          <div className="hero-actions">
            <Link className="primary-btn" to="/products">Shop Now</Link>
            <Link className="secondary-btn" to="/products">Explore Categories</Link>
          </div>
        </div>

        <div className="hero-visual">
          {products.slice(0, 3).map((product, index) => (
            <Link
              to={`/products/${product.id}`}
              key={product.id}
              className={`hero-product hero-product-${index + 1}`}
            >
              <img src={product.image} alt="" />
            </Link>
          ))}
          <div className="hero-orb" />
        </div>
      </section>

      <section className="section-container">
        <div className="section-heading">
          <div>
            <span className="eyebrow">SHOP BY CATEGORY</span>
            <h2>Find your next favorite</h2>
          </div>
          <Link to="/products">View all →</Link>
        </div>

        <div className="category-grid">
          {categories.map((category) => (
            <Link
              to={`/products?category=${encodeURIComponent(category)}`}
              className="category-card"
              key={category}
            >
              <span className="category-icon">{categoryIcons[category] || "🛍️"}</span>
              <span>{category}</span>
              <small>Explore collection →</small>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-container soft-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">CURATED FOR YOU</span>
            <h2>Featured products</h2>
          </div>
          <Link to="/products">See everything →</Link>
        </div>

        {loading && !products.length ? (
          <Loading />
        ) : (
          <ProductGrid products={featured} />
        )}
      </section>

      <section className="section-container">
        <div className="section-heading centered-heading">
          <div>
            <span className="eyebrow">THE SHOPNEST DIFFERENCE</span>
            <h2>Shopping made easier</h2>
          </div>
        </div>

        <div className="benefit-grid">
          <div className="benefit-card"><span>🚚</span><h3>Fast Delivery</h3><p>Get your favorites moving toward you quickly.</p></div>
          <div className="benefit-card"><span>🔒</span><h3>Secure Shopping</h3><p>A clean and trustworthy checkout experience.</p></div>
          <div className="benefit-card"><span>💳</span><h3>Easy Payment</h3><p>Simple, flexible and convenient shopping.</p></div>
          <div className="benefit-card"><span>⭐</span><h3>Quality Products</h3><p>Discover highly rated picks worth your attention.</p></div>
        </div>
      </section>

      <section className="cta-section">
        <div>
          <span className="eyebrow">READY WHEN YOU ARE</span>
          <h2>Ready to find something you love?</h2>
          <p>Browse the collection and make your next great find.</p>
        </div>
        <Link className="primary-btn light-btn" to="/products">Explore Products</Link>
      </section>
    </div>
  );
}

export default Home;