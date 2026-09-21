import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProducts as apiFetchProducts, fetchCategories as apiFetchCategories } from "../services/api";

const savedProducts = (() => {
  try {
    const value = sessionStorage.getItem("shopnest-products");
    return value ? JSON.parse(value) : [];
  } catch {
    return [];
  }
})();

const initialState = {
  products: Array.isArray(savedProducts) ? savedProducts : [],
  categories: [],
  loading: false,
  error: null,
  selectedCategory: "all",
  searchTerm: "",
  sortOption: "default"
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      return await apiFetchProducts();
    } catch (error) {
      return rejectWithValue(error.message || "Unable to load products.");
    }
  }
);

export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      return await apiFetchCategories();
    } catch (error) {
      return rejectWithValue(error.message || "Unable to load categories.");
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSortOption: (state, action) => {
      state.sortOption = action.payload;
    },
    clearFilters: (state) => {
      state.selectedCategory = "all";
      state.searchTerm = "";
      state.sortOption = "default";
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = Array.isArray(action.payload) ? action.payload : [];
        state.error = null;
        try {
          sessionStorage.setItem("shopnest-products", JSON.stringify(state.products));
        } catch {
          // Storage is optional.
        }
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unable to load products.";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = Array.isArray(action.payload) ? action.payload : [];
      });
  }
});

export const { setCategory, setSearchTerm, setSortOption, clearFilters } = productSlice.actions;

export default productSlice.reducer;