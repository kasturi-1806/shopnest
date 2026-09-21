import React from "react";
function Loading({ text = "✨ Finding products for you..." }) {
  return (
    <div className="loading-state" role="status" aria-live="polite">
      <div className="spinner" />
      <p>{text}</p>
    </div>
  );
}

export default Loading;