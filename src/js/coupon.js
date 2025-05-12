// Define valid coupons
// import "../css/coupon.css"
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

const validCoupons = {
  SAVE10: {
    discount: 0.1,
    type: "percentage",
    minPurchase: 50,
    expires: "2025-12-31",
    description: "10% off (min $50 purchase)",
  },
  SAVE20: {
    discount: 0.2,
    type: "percentage",
    minPurchase: 100,
    expires: "2025-12-31",
    description: "20% off (min $100 purchase)",
  },
  FREESHIP: {
    discount: 4.99,
    type: "shipping",
    expires: "2025-12-31",
    description: "Free standard shipping",
  },
  FIFTEEN: {
    discount: 15,
    type: "fixed",
    minPurchase: 75,
    expires: "2023-12-31",
    description: "$15 off (min $75 purchase)",
  },
};

document.getElementById("apply-coupon").addEventListener("click", applyCoupon);

function applyCoupon() {
  const couponCode = document
    .getElementById("coupon-code")
    .value.trim()
    .toUpperCase();
  const coupon = validCoupons[couponCode];
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (!coupon) {
    showCouponMessage("Invalid coupon code", "error");
    return;
  }

  if (cart.length === 0) {
    showCouponMessage("Your cart is empty", "error");
    return;
  }

  if (coupon.expires && new Date() > new Date(coupon.expires)) {
    showCouponMessage("This coupon has expired", "error");
    return;
  }

  if (coupon.minPurchase && subtotal < coupon.minPurchase) {
    const needed = (coupon.minPurchase - subtotal).toFixed(2);
    showCouponMessage(
      `Minimum purchase of $${coupon.minPurchase} required (add $${needed} more)`,
      "error"
    );
    return;
  }

  applyDiscount(coupon);
  showCouponMessage(`Coupon applied: ${coupon.description}`, "success");
  document.getElementById("coupon-code").value = "";
}

function applyDiscount(coupon) {
  localStorage.setItem("appliedCoupon", JSON.stringify(coupon));
  updateSummary();
}

function createDiscountElement() {
  const summaryCard = document.querySelector(".secondPart .card");
  const discountDiv = document.createElement("div");
  discountDiv.className = "d-flex justify-content-between mb-2";
  discountDiv.innerHTML = `
      <span>Discount</span>
      <span id="discount" style="color: green; display: none;"></span>
    `;
  summaryCard
    .querySelector(".d-flex.justify-content-between.mb-2:nth-child(3)")
    .before(discountDiv);
  return document.getElementById("discount");
}
