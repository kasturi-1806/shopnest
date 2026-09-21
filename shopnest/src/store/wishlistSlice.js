import { createSlice } from "@reduxjs/toolkit";

const loadWishlist = () => {
  try {
    const value = localStorage.getItem("shopnest-wishlist");
    return value ? JSON.parse(value) : [];
  } catch {
    return [];
  }
};

const initialState = {
  items: Array.isArray(loadWishlist()) ? loadWishlist() : []
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const product = action.payload;
      if (!state.items.some((item) => item.id === product.id)) {
        state.items.push(product);
      }
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    toggleWishlist: (state, action) => {
      const product = action.payload;
      const exists = state.items.some((item) => item.id === product.id);

      if (exists) {
        state.items = state.items.filter((item) => item.id !== product.id);
      } else {
        state.items.push(product);
      }
    }
  }
});

export const { addToWishlist, removeFromWishlist, toggleWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;