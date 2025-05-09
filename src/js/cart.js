// cart.js

window.addEventListener("DOMContentLoaded", () => {
  displayCartItems();
  document.getElementById("shipping").addEventListener("change", updateSummary);
  document.getElementById("clear-cart").addEventListener("click", clearCart);
});
const cartSection = document.querySelector(".firstPart");
cartSection.style.height = "auto"; // Reset
const newHeight = cartSection.scrollHeight + "px";
cartSection.style.height = newHeight;
function displayCartItems() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("cart-container");
  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    updateSummary();
    return;
  }

  cart.forEach((item, index) => {
    const itemTotal = (item.price * item.quantity).toFixed(2);

    const itemDiv = document.createElement("div");
    itemDiv.className =
      "d-flex align-items-center justify-content-between py-4 mb-3 product-holder";
    // في دالة displayCartItems، نعدل HTML ليكون أكثر تنظيماً
    itemDiv.innerHTML = `
                <div class="d-flex align-items-center product-info" style="width: 40%">
                    <img style="width:70px;height:90px" src="${
                      item.image
                    }" alt="${item.title}" class="me-3" />
                    <div>
                        <h6 class="mb-1">${item.title
                          .split(" ")
                          .slice(0, 3)
                          .join(" ")}</h6>
                        <p class="mb-1 text-muted">$${item.price.toFixed(2)}</p>
                    </div>
                </div>
                <div class="quantity-controls" style="width: 30%">
                    <div class="d-flex justify-content-center align-items-center gap-2 shadow-sm rounded-pill add-quantity">
                        <button class="btn btn-sm fw-bold decrease" data-index="${index}">-</button>
                        <span class="px-2 fw-semibold">${item.quantity}</span>
                        <button class="btn btn-sm fw-bold increase" data-index="${index}">+</button>
                    </div>
                </div>
                <div class="d-flex align-items-center justify-content-end product-actions" style="width: 30%">
                    <div class="fw-bold me-3">$${itemTotal}</div>
                    <button class="btn btn-sm remove-item remove-gray" data-index="${index}">
                        <i class="fa fa-trash"></i> Remove
                    </button>
                </div>
`;

    container.appendChild(itemDiv);
  });

  addQuantityListeners();
  addRemoveListeners();
  updateSummary();
}

function addQuantityListeners() {
  document.querySelectorAll(".increase").forEach((btn) => {
    btn.addEventListener("click", () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const index = btn.dataset.index;
      cart[index].quantity++;
      localStorage.setItem("cart", JSON.stringify(cart));
      displayCartItems();
    });
  });

  document.querySelectorAll(".decrease").forEach((btn) => {
    btn.addEventListener("click", () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const index = btn.dataset.index;
      if (cart[index].quantity > 1) {
        cart[index].quantity--;
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCartItems();
      }
    });
  });
}

function addRemoveListeners() {
  document.querySelectorAll(".remove-item").forEach((btn) => {
    btn.addEventListener("click", () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const index = btn.dataset.index;
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      displayCartItems();
    });
  });
}

function updateSummary() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1; // 10% tax
  const shipping = parseFloat(document.getElementById("shipping").value);
  const total = subtotal + tax + shipping;

  document.getElementById("subtotal").textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById("tax").textContent = `$${tax.toFixed(2)}`;
  document.getElementById("total").textContent = `$${total.toFixed(2)}`;
}

function clearCart() {
  localStorage.removeItem("cart");
  localStorage.removeItem("appliedCoupon"); // Clear coupon too
  displayCartItems();
  showCouponMessage("Cart has been cleared", "success");
}

// Shared function for showing messages
function showCouponMessage(message, type) {
  let messageElement = document.getElementById("coupon-message");

  if (!messageElement) {
    messageElement = document.createElement("div");
    messageElement.id = "coupon-message";
    document.querySelector(".coupon-container").after(messageElement);
  }

  messageElement.textContent = message;
  messageElement.className = `coupon-message ${type}`;

  setTimeout(() => {
    messageElement.textContent = "";
    messageElement.className = "coupon-message";
  }, 3000);
}

const style = document.createElement("style");
style.textContent = `

.product-holder {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #d7d7d7;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 10px;
}

.product-info, .quantity-controls, .product-actions {
    display: flex;
    align-items: center;
}

.quantity-controls {
    justify-content: center;
}

.product-actions {
    justify-content: flex-end;
}
.remove-gray {
  color: gray;
  transition: color 0.3s ease;
}

.remove-gray:hover {
  color: #dc3545;
}

.product-holder:hover {
  border: 1px solid #a5a5e2;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
.product-holder{
    border:1px solid #d7d7d7;
    border-radius:10px;
    padding: 20px ;
    margin-button:10px;

}
.add-quantity{
    background-color: white;
    border-radius:50%;
    border: 1px solid #7777;
    padding-right:5px;
    padding-top:3px;
    padding-bottom:3px;
}

`;
document.head.appendChild(style);
