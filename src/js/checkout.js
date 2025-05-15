// checkout.js - النسخة المحسنة

// DOM Elements
const orderItemsContainer = document.querySelector(".order-items");
const itemCount = document.querySelector(".item-count");
const subtotalElement = document.querySelector(".order-subtotal span:last-child");
const shippingElement = document.querySelector(".order-shipping span:last-child");
const taxElement = document.querySelector(".order-tax span:last-child");
const totalElement = document.querySelector(".order-total span:last-child");
const btnPrice = document.querySelector(".btn-price");
const completePurchaseBtn = document.getElementById("complete-purchase"); // زر إتمام الدفع

const paymentOptions = document.querySelectorAll('input[name="payment-method"]');
const paymentOptionContainers = document.querySelectorAll(".payment-option");
const creditCardDetails = document.getElementById("credit-card-details");
const paypalDetails = document.getElementById("paypal-details");
const applePayDetails = document.getElementById("apple-pay-details");

// ثابتات الأسعار
const SHIPPING_COST = 9.99;
const TAX_RATE = 0.1; // 10% ضريبة

// Load products from localStorage (cart)
function loadProducts() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  let subtotal = 0;
  orderItemsContainer.innerHTML = ""; // Clear previous items

  if (cart.length === 0) {
    orderItemsContainer.innerHTML = `
      <div class="alert alert-warning">
        Your cart is empty. Please add items to your cart to proceed with checkout.
      </div>
    `;
    updateSummary(0, 0);
    return;
  }

  cart.forEach((product, index) => {
    // إضافة تفاصيل وهمية للون والحجم بناءً على الفهرس (يمكن تحسينها لاحقًا)
    const color = index === 0 ? "Black" : index === 1 ? "White" : "Blue";
    const size = index === 0 ? "M" : index === 1 ? "L" : "XL";
    const quantity = product.quantity || 1;

    const itemHTML = `
      <div class="order-item">
        <div class="order-item-image">
          <img src="${product.image}" alt="${product.title}" class="img-fluid">
        </div>
        <div class="order-item-details">
          <h4>${product.title}</h4>
          <p class="order-item-variant">Color: ${color} | Size: ${size}</p>
          <div class="order-item-price">
            <span class="quantity">${quantity} ×</span>
            <span class="price">$${product.price.toFixed(2)}</span>
          </div>
        </div>
      </div>
    `;
    orderItemsContainer.insertAdjacentHTML("beforeend", itemHTML);

    subtotal += product.price * quantity;
  });

  updateSummary(subtotal, cart.length);
}

// Update the summary (Subtotal, Shipping, Tax, Total)
function updateSummary(subtotal, count) {
  const tax = subtotal * TAX_RATE;
  const total = subtotal + SHIPPING_COST + tax;

  itemCount.textContent = `${count} Item${count > 1 ? "s" : ""}`;
  subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
  shippingElement.textContent = `$${SHIPPING_COST.toFixed(2)}`;
  taxElement.textContent = `$${tax.toFixed(2)}`;
  totalElement.textContent = `$${total.toFixed(2)}`;

  if (btnPrice) {
    btnPrice.textContent = `$${total.toFixed(2)}`;
  }
}

// Handle switching payment method views
function handlePaymentMethodChange() {
  paymentOptions.forEach((option) => {
    option.addEventListener("change", (e) => {
      // تحديث الواجهة لكل خيار دفع
      paymentOptionContainers.forEach((container) => {
        if (container.querySelector("input").id === e.target.id) {
          container.classList.add("active");
        } else {
          container.classList.remove("active");
        }
      });

      // إظهار/إخفاء تفاصيل الدفع المناسبة
      creditCardDetails.classList.add("d-none");
      paypalDetails.classList.add("d-none");
      applePayDetails.classList.add("d-none");

      if (e.target.id === "credit-card") {
        creditCardDetails.classList.remove("d-none");
      } else if (e.target.id === "paypal") {
        paypalDetails.classList.remove("d-none");
      } else if (e.target.id === "apple-pay") {
        applePayDetails.classList.remove("d-none");
      }
    });
  });
}

// إتمام عملية الدفع
function completePurchase() {
  const selectedPayment = document.querySelector('input[name="payment-method"]:checked');
  
  if (!selectedPayment) {
    alert("Please select a payment method to proceed.");
    return;
  }

  let paymentDetailsValid = true;
  if (selectedPayment.id === "credit-card") {
    const cardNumber = document.getElementById("card-number").value;
    const expiryDate = document.getElementById("expiry-date").value;
    const cvv = document.getElementById("cvv").value;
    if (!cardNumber || !expiryDate || !cvv) {
      alert("Please fill in all credit card details.");
      paymentDetailsValid = false;
    }
  } else if (selectedPayment.id === "paypal") {
    const paypalEmail = document.getElementById("paypal-email").value;
    if (!paypalEmail) {
      alert("Please enter your PayPal email.");
      paymentDetailsValid = false;
    }
  }

  if (paymentDetailsValid) {
    alert("Purchase completed successfully! Thank you for your order.");
    // مسح السلة بعد إتمام الدفع
    localStorage.removeItem("cart");
    loadProducts(); // إعادة تحميل الصفحة لعرض السلة الفارغة
  }
}

// تهيئة الصفحة عند التحميل
document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
  handlePaymentMethodChange();

  // تهيئة حالة الدفع الافتراضية
  const defaultPayment = document.querySelector('input[name="payment-method"]:checked');
  if (defaultPayment) {
    defaultPayment.dispatchEvent(new Event("change"));
  }

  // إضافة حدث لزر إتمام الدفع
  if (completePurchaseBtn) {
    completePurchaseBtn.addEventListener("click", completePurchase);
  }
});