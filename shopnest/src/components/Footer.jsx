import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <Link className="footer-brand" to="/">🛍️ ShopNest</Link>
          <p>Your modern shopping destination for products you'll love.</p>
        </div>

        <div>
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/cart">Cart</Link>
        </div>

        <div>
          <h3>Customer Service</h3>
          <a href="#contact">Contact</a>
          <a href="#faq">FAQ</a>
          <a href="#shipping">Shipping</a>
          <a href="#returns">Returns</a>
        </div>
      </div>

      <div className="footer-bottom">
        © 2026 ShopNest. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;