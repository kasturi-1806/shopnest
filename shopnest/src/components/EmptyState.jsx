import React from "react";
import { Link } from "react-router-dom";

function EmptyState({ icon = "🛍️", title, message, actionText, actionTo = "/products" }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">{icon}</div>
      <h2>{title}</h2>
      <p>{message}</p>
      {actionText && (
        <Link className="primary-btn" to={actionTo}>
          {actionText}
        </Link>
      )}
    </div>
  );
}

export default EmptyState;