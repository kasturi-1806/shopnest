import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart
} from "../store/cartSlice";
import QuantityControl from "./QuantityControl";

function CartItem({ item }) {
  const dispatch = useDispatch();
  const subtotal = Number(item.price) * item.quantity;

  return (
    <article className="cart-item">
      <Link to={`/products/${item.id}`} className="cart-image-link">
        <img src={item.image} alt={item.title} />
      </Link>

      <div className="cart-item-info">
        <Link className="cart-item-title" to={`/products/${item.id}`}>
          {item.title}
        </Link>
        <p>₹{(Number(item.price) * 85).toFixed(2)}  each</p>
        <button
          className="text-btn danger"
          type="button"
          onClick={() => dispatch(removeFromCart(item.id))}
        >
          Remove
        </button>
      </div>

      <QuantityControl
        quantity={item.quantity}
        onDecrease={() => dispatch(decreaseQuantity(item.id))}
        onIncrease={() => dispatch(increaseQuantity(item.id))}
      />

      <strong className="cart-subtotal"> ₹{(subtotal * 85).toFixed(2)}</strong>
    </article>
  );
}

export default CartItem;