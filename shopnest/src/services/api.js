const BASE_URL = "https://fakestoreapi.com";
async function request(endpoint) {
  const response = await fetch(`${BASE_URL}${endpoint}`);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}.`);
  }
  const data = await response.json();
  if (data === null || data === undefined) {
    throw new Error("The API returned an empty response.");
  }
  return data;
}
export async function fetchProducts() {
  const data = await request("/products");
  if (!Array.isArray(data)) {
    throw new Error("Invalid product data received from the API.");
  }
  return data;
}
export async function fetchProductById(id) {
  if (!id) throw new Error("A product ID is required.");
  const data = await request(`/products/${encodeURIComponent(id)}`);
  if (!data || typeof data !== "object" || !data.id) {
    throw new Error("Product not found.");
  }
  return data;
}
export async function fetchCategories() {
  const data = await request("/products/categories");
  if (!Array.isArray(data)) {
    throw new Error("Invalid category data received from the API.");
  }
  return data;
}
