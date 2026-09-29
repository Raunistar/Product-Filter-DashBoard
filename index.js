// DOM elements
const productContainer = document.querySelector(".product-container");
const resultContainer = document.querySelector(".result-container");
const searchInput = document.getElementById("input");
const searchBth = document.querySelector(".search-btn");
const productCategoryMenu = document.getElementById("category-Menu");
const sortCategoryMenu = document.getElementById("sort-Menu");
const priceRangeFilter = document.getElementById("priceFilter");
const resetFilters = document.getElementById("reset-btn");
const themeToggle = document.querySelector("#theme-toggle");

// Store fetched products
let productsData = [];

// Fetch products from API
async function fetchData() {
  try {
    resultContainer.innerHTML = "Loading products...";

    const response = await fetch("https://dummyjson.com/products?limit=0");

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();

    console.log(data);

    productsData = data.products;

    // Get unique product categories
    const categories = productsData.map((item) => {
      return item.category;
    });

    const uniqueCategories = new Set(categories);
    const uniqueCategoriesArray = [...uniqueCategories];

    // Add categories to dropdown
    uniqueCategoriesArray.forEach((category) => {
      const option = document.createElement("option");

      productCategoryMenu.append(option);

      option.textContent = category;
      option.value = category;
    });

    // Display products
    applyFilters(data.products);
  } catch (error) {
    resultContainer.innerHTML = "Failed to load products. Please try again.";

    console.error(error);
  }
}

fetchData();

// Render product cards
function displayCards(productList) {
  productList.forEach((data) => {
    const card = document.createElement("article");

    card.className = "product-card";

    const name = document.createElement("h2");

    name.className = "product-name";
    name.textContent = data.title;

    const price = document.createElement("p");

    price.className = "price-value";
    price.textContent = `₹${data.price}`;

    const category = document.createElement("p");

    category.className = "category-name";
    category.textContent = data.category;

    const rating = document.createElement("p");

    rating.className = "product-rating";
    rating.textContent = `⭐ ${data.rating}`;

    const pdtImage = document.createElement("img");

    pdtImage.className = "pdt-thumbnail";
    pdtImage.src = data.thumbnail;

    card.append(pdtImage, name, price, rating, category);

    productContainer.append(card);
  });
}

// Search filter
function filterBySearch(productList, searchText) {
  if (searchText === "") {
    return productList;
  }

  return productList.filter((product) =>
    product.title.toLowerCase().includes(searchText),
  );
}

// Category filter
function filterByCategory(productList, selectedCategory) {
  if (selectedCategory === "default") {
    return productList;
  }

  return productList.filter(
    (product) => product.category.toLowerCase() === selectedCategory,
  );
}

// Price range filter
function filterByPrice(productList, priceCategory) {
  if (priceCategory === "all") {
    return productList;
  }

  return productList.filter((product) => {
    if (priceCategory === "0-500") {
      return product.price > 0 && product.price <= 500;
    }

    if (priceCategory === "500-1000") {
      return product.price > 500 && product.price <= 1000;
    }

    if (priceCategory === "1000-2000") {
      return product.price > 1000 && product.price <= 2000;
    }

    if (priceCategory === "2000-5000") {
      return product.price > 2000 && product.price <= 5000;
    }

    if (priceCategory === "5000-10000") {
      return product.price > 5000 && product.price <= 10000;
    }

    if (priceCategory === "10000+") {
      return product.price > 10000;
    }
  });
}

// Sort products
function sortProducts(productList, sortCategory) {
  const sortedProducts = [...productList];

  if (sortCategory === "default") {
    return sortedProducts;
  }

  if (sortCategory === "priceLH") {
    sortedProducts.sort((a, b) => a.price - b.price);
  }

  if (sortCategory === "priceHL") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  if (sortCategory === "ratingHL") {
    sortedProducts.sort((a, b) => b.rating - a.rating);
  }

  if (sortCategory === "nameAsc") {
    sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
  }

  if (sortCategory === "nameDesc") {
    sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
  }

  return sortedProducts;
}

// Get saved filters from LocalStorage
const savedSearch = localStorage.getItem("searchText");
const savedProductCategory = localStorage.getItem("pdtCategoryMenu");
const savedSortCategory = localStorage.getItem("sortCategoryMenu");
const savedPriceRange = localStorage.getItem("priceRangeFilter");

// Restore saved theme
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
  document.body.classList.add("light-theme");
  themeToggle.textContent = "🌙";
}
// Restore search
if (savedSearch) {
  searchInput.value = savedSearch;
}

// Restore category
if (savedProductCategory) {
  productCategoryMenu.value = savedProductCategory;
}

// Restore sort
if (savedSortCategory) {
  sortCategoryMenu.value = savedSortCategory;
}

// Restore price range
if (savedPriceRange) {
  priceRangeFilter.value = savedPriceRange;
}

// Apply all filters
function applyFilters(productsData) {
  const searchText = searchInput.value.trim().toLowerCase();

  const selectedCategory = productCategoryMenu.value.toLowerCase();

  const priceCategory = priceRangeFilter.value.trim().toLowerCase();

  const sortCategory = sortCategoryMenu.value.trim();

  let filteredProducts = productsData;

  // Apply filters one by one
  filteredProducts = filterBySearch(filteredProducts, searchText);

  filteredProducts = filterByCategory(filteredProducts, selectedCategory);

  filteredProducts = filterByPrice(filteredProducts, priceCategory);

  filteredProducts = sortProducts(filteredProducts, sortCategory);

  // Clear previous results
  productContainer.innerHTML = "";
  resultContainer.innerHTML = "";

  // Show message when no products match
  if (filteredProducts.length === 0) {
    resultContainer.innerHTML = "No products found.";
    return;
  }

  // Display filtered products
  displayCards(filteredProducts);
}

// Reset all filters
resetFilters.addEventListener("click", () => {
  localStorage.removeItem("searchText");
  localStorage.removeItem("pdtCategoryMenu");
  localStorage.removeItem("sortCategoryMenu");
  localStorage.removeItem("priceRangeFilter");

  location.reload();
});

// Search button
searchBth.addEventListener("click", () => {
  localStorage.setItem("searchText", searchInput.value);

  localStorage.setItem(
    "pdtCategoryMenu",
    productCategoryMenu.value.trim().toLowerCase(),
  );

  localStorage.setItem("sortCategoryMenu", sortCategoryMenu.value);

  localStorage.setItem(
    "priceRangeFilter",
    priceRangeFilter.value.trim().toLowerCase(),
  );

  applyFilters(productsData);
});

// Theme toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");

  const isLightTheme = document.body.classList.contains("light-theme");

  themeToggle.textContent = isLightTheme ? "🌙" : "☀️";

  // Save selected theme
  localStorage.setItem("theme", isLightTheme ? "light" : "dark");
});
