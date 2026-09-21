import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearCart } from "../store/cartSlice";
import CartItem from "../components/CartItem";
import EmptyState from "../components/EmptyState";

function Cart() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleClear = () => {
    const confirmed = window.confirm("Clear all items from your cart?");
    if (confirmed) dispatch(clearCart());
  };

  if (!items.length) {
    return (
      <div className="page-container">
        <div className="page-hero compact">
          <span className="eyebrow">YOUR BAG</span>
          <h1>Shopping cart</h1>
        </div>
        <EmptyState
          icon="🛒"
          title="Your cart is empty."
          message="Find something you love and add it to your cart."
          actionText="Continue Shopping"
        />
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-hero compact">
        <span className="eyebrow">YOUR BAG</span>
        <h1>Shopping cart</h1>
        <p>{totalItems} item{totalItems !== 1 ? "s" : ""} ready for checkout.</p>
      </div>

      <div className="cart-layout">
        <section className="cart-list">
          <div className="cart-list-heading">
            <span>Product</span>
            <span>Quantity</span>
            <span>Price</span>
          </div>

          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}

          <button className="text-btn danger clear-cart-btn" type="button" onClick={handleClear}>
            Clear Cart
          </button>
        </section>

        <aside className="summary-card">
          <h2>Order summary</h2>
          <div className="summary-line">
            <span>Total Items</span>
            <strong>{totalItems}</strong>
          </div>
          <div className="summary-line">
            <span>Subtotal</span>
            <strong>₹{(totalPrice * 85).toFixed(2)}</strong>
          </div>
          <div className="summary-line muted">
            <span>Shipping</span>
            <span>Calculated at checkout</span>
          </div>
          <hr />
          <div className="summary-total">
            <span>Total</span>
            <strong>₹{(totalPrice * 85).toFixed(2)}</strong>
          </div>
          <button
            className="primary-btn full-btn"
            type="button"
            onClick={() => window.alert("Checkout is a visual placeholder in this academic frontend project.")}
          >
            Proceed to Checkout
          </button>
          <Link className="secondary-btn full-btn centered-btn" to="/products">
            Continue Shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}

export default Cart;