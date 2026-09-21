import React from "react";
function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-state" role="alert">
      <div className="error-icon">⚠️</div>
      <h2>Something went wrong.</h2>
      <p>{message || "We couldn't load the products."}</p>
      {onRetry && (
        <button className="primary-btn" type="button" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;