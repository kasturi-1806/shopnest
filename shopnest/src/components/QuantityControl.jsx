import React from "react";
function QuantityControl({ quantity, onDecrease, onIncrease }) {
  return (
    <div className="quantity-control">
      <button type="button" onClick={onDecrease} disabled={quantity <= 1} aria-label="Decrease quantity">
        −
      </button>
      <span>{quantity}</span>
      <button type="button" onClick={onIncrease} aria-label="Increase quantity">
        +
      </button>
    </div>
  );
}

export default QuantityControl;