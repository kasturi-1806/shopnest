
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import SortDropdown from "../components/SortDropdown";
import ProductGrid from "../components/ProductGrid";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import EmptyState from "../components/EmptyState";

import { fetchProducts } from "../store/productSlice";

function Products() {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.products);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");

  // Load products
  useEffect(() => {
    if (!products || products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products]);

  // Get categories
  const categories = useMemo(() => {
    if (!Array.isArray(products)) return [];

    return [
      ...new Set(
        products
          .map((product) => product.category)
          .filter(Boolean)
      ),
    ];
  }, [products]);

  // Search + Category + Sort
  const filteredProducts = useMemo(() => {
    if (!Array.isArray(products)) return [];

    let result = [...products];

    /* =========================
       SEARCH
    ========================= */

    const search = searchTerm.trim().toLowerCase();

    if (search) {
      result = result.filter((product) => {
        const title = String(product.title || "").toLowerCase();
        const category = String(product.category || "").toLowerCase();
        const description = String(product.description || "").toLowerCase();

        // Normal search
        if (
          title.includes(search) ||
          category.includes(search) ||
          description.includes(search)
        ) {
          return true;
        }

        // Fake Store API uses "jewelery"
        if (
          search === "jewelry" &&
          (
            category.includes("jewelery") ||
            title.includes("jewelery") ||
            description.includes("jewelery")
          )
        ) {
          return true;
        }

        // Allow "jewelery" to match "jewelry"
        if (
          search === "jewelery" &&
          (
            category.includes("jewelry") ||
            title.includes("jewelry") ||
            description.includes("jewelry")
          )
        ) {
          return true;
        }

        // Women's clothing
        if (
          ["women", "womens", "women's"].includes(search) &&
          category.includes("women's clothing")
        ) {
          return true;
        }

        // Men's clothing
        if (
          ["men", "mens", "men's"].includes(search) &&
          category.includes("men's clothing")
        ) {
          return true;
        }

        return false;
      });
    }

    /* =========================
       CATEGORY
    ========================= */

    if (selectedCategory !== "all") {
      result = result.filter((product) => {
        return (
          String(product.category || "").toLowerCase() ===
          String(selectedCategory || "").toLowerCase()
        );
      });
    }

    /* =========================
       SORT
    ========================= */

    if (sortOption === "price-low") {
      result.sort(
        (a, b) => Number(a.price || 0) - Number(b.price || 0)
      );
    }

    if (sortOption === "price-high") {
      result.sort(
        (a, b) => Number(b.price || 0) - Number(a.price || 0)
      );
    }

    if (sortOption === "rating-high") {
      result.sort(
        (a, b) =>
          Number(b.rating?.rate || 0) -
          Number(a.rating?.rate || 0)
      );
    }

    return result;
  }, [
    products,
    searchTerm,
    selectedCategory,
    sortOption,
  ]);

  /* =========================
     HANDLERS
  ========================= */

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSearchTerm("");
  };

  const handleSortChange = (value) => {
    setSortOption(value);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSortOption("default");
  };

  /* =========================
     LOADING
  ========================= */

  if (loading) {
    return <Loading />;
  }

  /* =========================
     ERROR
  ========================= */

  if (error) {
    return (
      <ErrorMessage
        message="We couldn't load the products."
        onRetry={() => dispatch(fetchProducts())}
      />
    );
  }

  return (
    <main className="products-page">

      {/* HEADER */}

      <section className="products-header">
        <div className="products-header-content">

          <span className="section-label">
            OUR COLLECTION
          </span>

          <h1>
            Explore Products
          </h1>

          <p>
            Find something you'll love from our curated collection.
          </p>

        </div>
      </section>

      {/* CONTROLS */}

      <section className="products-controls">

        {/* SEARCH */}

        <SearchBar
          value={searchTerm}
          onSearch={handleSearch}
        />

        {/* CATEGORY */}

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* SORT */}

        <SortDropdown
          value={sortOption}
          onChange={handleSortChange}
        />

      </section>

      {/* RESULTS */}

      <section className="products-results">

        <div className="results-info">
          <strong>
            {filteredProducts.length}
          </strong>{" "}
          {filteredProducts.length === 1
            ? "product"
            : "products"}{" "}
          found
        </div>

        {filteredProducts.length > 0 ? (

          <ProductGrid
            products={filteredProducts}
          />

        ) : (

          <EmptyState
            icon="🔍"
            title="No products found"
            message="Try another search or choose a different category."
            actionText="Show All Products"
            onAction={clearFilters}
          />

        )}

      </section>

    </main>
  );
}

export default Products;

