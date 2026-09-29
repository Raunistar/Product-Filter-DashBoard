# 🛍️ Product Filter Dashboard

A responsive product dashboard built with **Vanilla JavaScript** that fetches products from a REST API and provides real-world search, filtering, sorting, persistence, and UI state handling.

The project focuses on practical frontend skills such as **DOM manipulation, array methods, event handling, asynchronous JavaScript, API integration, LocalStorage, and dynamic UI rendering**.

---

## 🚀 Live Demo

**Live:** `[Add your Netlify/Vercel URL here](https://product-filter-dashboard.netlify.app/)`

**GitHub:** `[Add your GitHub repository URL here](https://github.com/Raunistar/Product-Filter-DashBoard)`

---

## 📸 Features

- 🔎 Search products by name
- 🏷️ Filter products by category
- 💰 Filter products by price range
- ↕️ Sort by:
  - Price: Low → High
  - Price: High → Low
  - Rating: High → Low
  - Name: A → Z
  - Name: Z → A

- 🔗 Combine multiple filters together
- 🖼️ Dynamic product images from API
- 📦 Dynamically generated category options
- 💾 LocalStorage filter persistence
- 🔄 Reset all filters
- ⏳ Loading state
- ❌ API error handling
- 🚫 Empty search/filter result state
- 📱 Responsive UI
- 🌙 Light/Dark theme toggle

---

## 🛠️ Tech Stack

- **HTML5**
- **CSS3**
- **JavaScript (ES6+)**
- **REST API**
- **Fetch API**
- **LocalStorage**
- **DOM Manipulation**
- **Array Methods**

---

## 🌐 API

This project uses the **DummyJSON Products API** to retrieve the product dataset.

The application fetches the complete available product collection and dynamically renders it on the page.

---

## 🧠 How It Works

The application follows a simple filtering pipeline:

```text
API
 ↓
Products Array
 ↓
Search Filter
 ↓
Category Filter
 ↓
Price Filter
 ↓
Sorting
 ↓
Rendered Product Cards
```

Each filter works on the result of the previous filter, allowing multiple filters to work together.

---

## 📂 Project Structure

```text
Product-Filter-Dashboard/
│
├── index.html
├── style.css
├── index.js
├── products.js
└── README.md
```

> `products.js` was used during the initial static-data version and is no longer required by the API-based implementation.

---

## 🔑 Key JavaScript Concepts Practiced

### DOM Manipulation

The UI is dynamically generated using JavaScript:

- `createElement()`
- `append()`
- `textContent`
- `className`
- `querySelector()`
- `getElementById()`

### Array Methods

Used extensively for data processing:

- `map()`
- `filter()`
- `forEach()`
- `sort()`

### Set

`Set` is used to extract unique categories from the API dataset before generating the category dropdown.

### Async JavaScript

The application uses:

```js
async / await
```

to handle API requests.

### Fetch API

Products are retrieved from the REST API using `fetch()`.

### Error Handling

API failures are handled using:

```js
try {
  // API request
} catch (error) {
  // error state
}
```

The response is also checked with `response.ok`.

### LocalStorage

Filter selections are persisted so that refreshing the page does not immediately lose the user's selected filters.

---

## ⚙️ Filter Architecture

Filtering is handled through separate functions instead of putting everything inside one event handler.

```text
filterBySearch()
       ↓
filterByCategory()
       ↓
filterByPrice()
       ↓
sortProducts()
       ↓
displayCards()
```

This keeps each responsibility isolated and makes the code easier to maintain and debug.

---

## 🖼️ Product Rendering

Product cards are generated dynamically from API data.

Each card contains:

- Product image
- Product name
- Price
- Category
- Rating

No product cards are hardcoded in HTML.

---

## 💾 LocalStorage

The following filter states are persisted:

```text
searchText
pdtCategoryMenu
sortCategoryMenu
priceRangeFilter
```

When the page loads, saved values are restored and the UI can continue from the previous state.

---

## 🔄 Reset Filters

The reset functionality:

1. Removes saved filter values from LocalStorage
2. Reloads the page
3. Restores the default product view

---

## 🧪 Error & UI States

The application handles common real-world states:

### Loading

Displayed while products are being fetched.

### API Error

Displayed when the API request fails.

### Empty Results

Displayed when the selected filters produce no matching products.

---

## 🎯 What I Learned

Building this project helped me practice moving from simple DOM exercises toward a more realistic frontend application.

Key areas practiced:

- Working with external APIs
- Understanding asynchronous JavaScript
- Managing data outside function scope
- Rendering dynamic UI
- Combining multiple filters
- Sorting arrays without mutating the original data
- Extracting unique values with `Set`
- Persisting application state with LocalStorage
- Handling loading, error, and empty states
- Structuring JavaScript into smaller reusable functions
- Debugging real browser/API errors

---

## 💡 Future Improvements

Possible future enhancements:

- Pagination
- Debounced search
- Product detail page
- Add-to-cart functionality
- Advanced price slider
- Better accessibility
- Skeleton loading cards
- API pagination
- URL-based filter state
- Unit testing

---

## 🏃 Running Locally

Clone the repository:

```bash
git clone YOUR_REPOSITORY_URL
```

Open the project in VS Code and run it using a local development server such as **Live Server**.

Because the project uses JavaScript modules, running through a local server is recommended instead of opening `index.html` directly.

---

## 👨‍💻 Author

**Raunak Kumar Jha**

Frontend Developer focused on building practical projects with JavaScript and React.

---

## ⭐ Project Highlights

This project demonstrates practical understanding of:

**DOM → Events → Arrays → Filtering → Sorting → API → Async/Await → Error Handling → LocalStorage → Dynamic UI**

rather than relying on static HTML data.
