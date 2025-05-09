let allProducts = [];

async function fetchAndDisplayProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);

    allProducts = await response.json();

    const categories = getUniqueCategories(allProducts);
    createFilterSwiper(categories);

    // Display all products by default
    displayProducts(allProducts);
  } catch (error) {
    console.error("Error:", error);
    document.getElementById(
      "product-list"
    ).innerHTML = `<p class="product-error">Failed to load products. Refresh the page.</p>`;
  }
}


function getUniqueCategories(products) {
  const categorySet = new Set(products.map((p) => p.category));
  return ["all", ...categorySet];
}

function createFilterSwiper(categories) {
  const container = document.getElementById("filter-buttons");
  container.innerHTML = `
    <div class="filter-swiper">
      <div class="swiper-wrapper"></div>
    </div>
  `;

  const wrapper = container.querySelector(".swiper-wrapper");

  categories.forEach((category, index) => {
    const slide = document.createElement("div");
    slide.className = "swiper-slide";
    slide.innerHTML = `
      <button class="filter-btn${index === 0 ? " active" : ""}">
        ${category[0].toUpperCase() + category.slice(1)}
      </button>
    `;

    const button = slide.querySelector("button");
    button.onclick = () => {
      const allButtons = container.querySelectorAll(".filter-btn");
      allButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      filterByCategory(category);
    };

    wrapper.appendChild(slide);
  });

  setTimeout(() => {
    new Swiper(".filter-swiper", {
      slidesPerView: "auto",
      spaceBetween: 15,
      centeredSlides: true,
      loop: false,
    });
  }, 100);
}

function displayProducts(products) {
  const container = document.getElementById("product-list");
  container.classList.add("fade-out");

  setTimeout(() => {
    container.innerHTML = "";

    if (products.length === 0) {
      container.innerHTML = `<p class="product-error">No products found in this category.</p>`;
    } else {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];

      products.forEach((product) => {
        const isInCart = cart.some((item) => item.id === product.id);
        const card = document.createElement("div");
        card.className = "card-product";
        card.innerHTML = `
          <img class="product-img" src="${product.image}" alt="${
          product.title
        }">
          <h3 class="product-title">${product.title
            .split(" ")
            .slice(0, 4)
            .join(" ")}</h3>
          <div class="product-info">
            <p class="product-price">$${product.price.toFixed(2)}</p>
            <div class="product-rating">
              ${generateStarsSVG(product.rating.rate)} (${product.rating.count})
            </div>
            <button class="btn-cart" ${
              product.rating.count === 0 ? "disabled" : ""
            } 
                    data-id="${product.id}" ${isInCart ? "disabled" : ""}>
              <span class="btn-cart-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon-bag">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"/>
                </svg>
              </span>
              ${
                product.rating.count === 0
                  ? "Unavailable"
                  : isInCart
                  ? "Added to Cart"
                  : "Add to Cart"
              }
            </button>
          </div>
        `;

        container.appendChild(card);

        const cartBtn = card.querySelector(".btn-cart");
        if (product.rating.count > 0) {
          cartBtn.addEventListener("click", () => {
            if (!isInCart) {
              addToCart(product);
            }
          });
        }
      });
    }

    container.classList.remove("fade-out");
  }, 300);
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const cartCountElement = document.getElementById("cart-count");
  if (cartCountElement) {
    cartCountElement.textContent = totalItems;
    cartCountElement.style.display = totalItems > 0 ? "block" : "none";
  }
}

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateButtonState(product.id, true);
  updateCartCount();
}

function addRemoveListeners() {
  document.querySelectorAll(".remove-item").forEach((btn) => {
    btn.addEventListener("click", () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const index = btn.dataset.index;
      const removedProduct = cart[index];

      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));

      // Reset the "Add to Cart" button for this product
      updateButtonState(removedProduct.id, false);

      displayCartItems();
    });
  });
}

function updateButtonState(productId, added) {
  const buttons = document.querySelectorAll(
    `.btn-cart[data-id="${productId}"]`
  );
  buttons.forEach((button) => {
    button.textContent = added ? "Added to Cart" : "Add to Cart";
    button.disabled = added;
    if (!added) {
      button.removeAttribute("disabled");
    }
  });
}

function filterByCategory(category) {
  const filtered =
    category === "all"
      ? allProducts
      : allProducts.filter((p) => p.category === category);
  displayProducts(filtered);
}

function generateStarsSVG(rate) {
  const fullStars = Math.floor(rate);
  const hasHalfStar = rate % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  let starsHTML = "";
  for (let i = 0; i < fullStars; i++) {
    starsHTML += `<svg class="star-icon full-star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z"/></svg>`;
  }

  if (hasHalfStar) {
    starsHTML += `<svg class="star-icon half-star" viewBox="0 0 24 24" fill="currentColor"><defs><linearGradient id="half"><stop offset="50%" stop-color="currentColor"/><stop offset="50%" stop-color="transparent"/></linearGradient></defs><path fill="url(#half)" d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z"/></svg>`;
  }

  for (let i = 0; i < emptyStars; i++) {
    starsHTML += `<svg class="star-icon empty-star" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-width="2" d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z"/></svg>`;
  }

  return starsHTML;
}

// Initialize the page
window.addEventListener("DOMContentLoaded", () => {
  fetchAndDisplayProducts();
  updateCartCount();
});
