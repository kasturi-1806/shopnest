import React from "react";
import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    try {
      return localStorage.getItem("shopnest-theme") === "dark";
    } catch {
      return false;
    }
  });

  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlistItems.length;

  const toggleTheme = () => {
    setDarkMode((current) => {
      const next = !current;
      document.documentElement.classList.toggle("dark", next);
      try {
        localStorage.setItem("shopnest-theme", next ? "dark" : "light");
      } catch {
        // Theme persistence is optional.
      }
      return next;
    });
  };

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" to="/" onClick={() => setMobileMenu(false)}>
          <span className="brand-mark">🛍️</span>
          <span>ShopNest</span>
        </Link>

        <button
          className="mobile-menu-btn"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={mobileMenu}
          onClick={() => setMobileMenu((open) => !open)}
        >
          ☰
        </button>

        <nav className={`main-nav ${mobileMenu ? "open" : ""}`}>
          <NavLink to="/" end onClick={() => setMobileMenu(false)}>Home</NavLink>
          <NavLink to="/products" onClick={() => setMobileMenu(false)}>Products</NavLink>
          <NavLink to="/wishlist" onClick={() => setMobileMenu(false)}>
            Wishlist <span className="nav-badge">{wishlistCount}</span>
          </NavLink>
          <NavLink to="/cart" onClick={() => setMobileMenu(false)}>
            Cart <span className="nav-badge">{cartCount}</span>
          </NavLink>
        </nav>

        <div className="header-actions">
          <Link className="header-search-link" to="/products" aria-label="Search products">
            🔍 <span>Search</span>
          </Link>
          <button className="theme-btn" type="button" onClick={toggleTheme} aria-label="Toggle dark mode">
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;