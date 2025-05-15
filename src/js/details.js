async function fetchProductDetails() {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");

  if (!productId) {
    document.getElementById("product-details").innerHTML =
      "<p>Product not found.</p>";
    return;
  }

  try {
    const response = await fetch(
      `https://fakestoreapi.com/products/${productId}`
    );
    if (!response.ok) throw new Error("Failed to fetch product");

    const product = await response.json();

    // Generate the star rating dynamically
    const stars = generateStarsSVG(product.rating.rate);

    document.getElementById("product-details").innerHTML = `
      <div class="product-detail-card">
        <img src="${product.image}" alt="${
      product.title
    }" class="product-detail-img"/>
        <h2>${product.title}</h2>
        <p><strong>Price:</strong> $${product.price.toFixed(2)}</p>
        <p><strong>Rating:</strong> ${stars} (${
      product.rating.count
    } reviews)</p>
        <p><strong>Description:</strong> ${product.description}</p>
        <p><strong>Category:</strong> ${product.category}</p>
      </div>
    `;
  } catch (error) {
    console.error(error);
    document.getElementById("product-details").innerHTML =
      "<p>Error loading product.</p>";
  }
}

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

window.addEventListener("DOMContentLoaded", fetchProductDetails);
