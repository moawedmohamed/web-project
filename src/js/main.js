// import "../css/style.css"
async function fetchAndDisplayProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);
    const products = await response.json();

    const container = document.getElementById("products-container");
    container.innerHTML = "";

    products.slice(0, 4).forEach((product, index) => {
      const card = document.createElement("div");
      card.className = "product-card";

      // Badge settings
      let badgeText = "";
      let badgeClass = "";
      let isSoldOut = false;

      if (index === 0) {
        badgeText = "New";
        badgeClass = "badge-blue";
      } else if (index === 1) {
        badgeText = "Sale";
        badgeClass = "badge-red";
      } else if (index === 2) {
        badgeText = "Sold Out";
        badgeClass = "badge-gray";
        isSoldOut = true;
      }

      // Create the product card structure
      card.innerHTML = `
        <div class="icon-overlay">
          <i class="fa-regular fa-thumbs-up icon heart"></i>
          <i class="fa-regular fa-eye icon eye"></i>
        </div>
        ${
          badgeText ? `<div class="badge ${badgeClass}">${badgeText}</div>` : ""
        }
        <img src="${product.image}" alt="${product.title}" loading="lazy">
        <h3>${product.title.split(" ").slice(0, 4).join(" ")}</h3>
        <p class="price">$${product.price.toFixed(2)}</p>
        <div class="rating">${generateStarsSVG(product.rating.rate)} (${
        product.rating.count
      })</div>
        <button class="add-to-cart" ${isSoldOut ? "disabled" : ""}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6" style="width: 18px; height: 18px;">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>
          ${isSoldOut ? "Sold Out" : "Add to Cart"}
        </button>
      `;
      console.log(product);

      container.appendChild(card);

      // Heart Icon Toggle
      const heartIcon = card.querySelector(".heart");
      heartIcon.addEventListener("click", () => {
        heartIcon.classList.toggle("fa-regular"); // outline
        heartIcon.classList.toggle("fa-solid"); // filled
        heartIcon.classList.toggle("liked"); // apply red color
      });

      // Add to Cart functionality
      const addToCartBtn = card.querySelector(".add-to-cart");
      addToCartBtn.addEventListener("click", () => {
        if (isSoldOut) return;

        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Check if item already in cart
        const existingProduct = cart.find((item) => item.id === product.id);

        if (!existingProduct) {
          cart.push({ ...product, quantity: 1 });
          localStorage.setItem("cart", JSON.stringify(cart));

          addToCartBtn.textContent = "Added";
          addToCartBtn.disabled = true;
          addToCartBtn.classList.add("added");
        }
      });
    });
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("products-container").innerHTML = `
        <p class="error">Failed to load products. Refresh the page.</p>
      `;
  }
}

window.addEventListener("DOMContentLoaded", fetchAndDisplayProducts);

function generateStarsSVG(rate) {
  const fullStars = Math.floor(rate);
  const hasHalfStar = rate % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  let starsHTML = "";

  // Full stars (★)
  for (let i = 0; i < fullStars; i++) {
    starsHTML += `<svg class="star-icon full-star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z"/></svg>`;
  }

  // Half star (½)
  if (hasHalfStar) {
    starsHTML += `<svg class="star-icon half-star" viewBox="0 0 24 24" fill="currentColor"><defs><linearGradient id="half"><stop offset="50%" stop-color="currentColor"/><stop offset="50%" stop-color="transparent"/></linearGradient></defs><path fill="url(#half)" d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z"/></svg>`;
  }

  // Empty stars (☆)
  for (let i = 0; i < emptyStars; i++) {
    starsHTML += `<svg class="star-icon empty-star" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-width="2" d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z"/></svg>`;
  }

  return starsHTML;
}
