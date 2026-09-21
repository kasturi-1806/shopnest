import React from "react";
import { Link } from "react-router-dom";
function NotFound() {
  return (
    <div className="page-container">
      <div className="not-found">
        <span className="not-found-number">404</span>
        <h1>Looks like this page wandered off.</h1>
        <p>The page you're looking for doesn't exist.</p>
        <Link className="primary-btn" to="/">Back to ShopNest</Link>
      </div>
    </div>
  );
}
export default NotFound;
