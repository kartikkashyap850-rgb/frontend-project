/* ==============================================
   RENTEASE – SCRIPT.JS
   Full Interactive Functionality
   ============================================== */

// ── Product Data ──
const allProducts = [
  // FURNITURE
  { id: 1,  name: "King Bed Frame",          category: "furniture",   icon: "🛏️", emoji: "fas fa-bed",          rent: 999,  deposit: 2500, tenures: ["3", "6", "12"], stock: 8  },
  { id: 2,  name: "L-Shape Sofa Set",        category: "furniture",   icon: "🛋️", emoji: "fas fa-couch",        rent: 799,  deposit: 2000, tenures: ["3", "6", "12"], stock: 5  },
  { id: 3,  name: "Dining Table (6 Seater)", category: "furniture",   icon: "🪑", emoji: "fas fa-chair",        rent: 649,  deposit: 1500, tenures: ["3", "6", "12"], stock: 6  },
  { id: 4,  name: "Study Desk + Chair",      category: "furniture",   icon: "🖥️", emoji: "fas fa-desktop",      rent: 349,  deposit: 800,  tenures: ["3", "6", "12"], stock: 12 },
  { id: 5,  name: "Wardrobe (3-door)",       category: "furniture",   icon: "🚪", emoji: "fas fa-door-closed",  rent: 549,  deposit: 1200, tenures: ["6", "12"],      stock: 7  },
  { id: 6,  name: "Single Bed Frame",        category: "furniture",   icon: "🛏️", emoji: "fas fa-bed",          rent: 599,  deposit: 1500, tenures: ["3", "6", "12"], stock: 10 },
  // APPLIANCES
  { id: 7,  name: "Double Door Fridge",      category: "appliances",  icon: "❄️", emoji: "fas fa-snowflake",    rent: 699,  deposit: 1800, tenures: ["3", "6", "12"], stock: 9  },
  { id: 8,  name: "Front-Load Washer",       category: "appliances",  icon: "🫧", emoji: "fas fa-tint",         rent: 599,  deposit: 1500, tenures: ["3", "6", "12"], stock: 4  },
  { id: 9,  name: "Microwave Oven",          category: "appliances",  icon: "📦", emoji: "fas fa-box",          rent: 249,  deposit: 600,  tenures: ["3", "6", "12"], stock: 15 },
  { id: 10, name: "Air Conditioner (1.5T)",  category: "appliances",  icon: "💨", emoji: "fas fa-wind",         rent: 899,  deposit: 2200, tenures: ["6", "12"],      stock: 6  },
  { id: 11, name: "Water Purifier",          category: "appliances",  icon: "💧", emoji: "fas fa-filter",       rent: 199,  deposit: 500,  tenures: ["3", "6", "12"], stock: 20 },
  { id: 12, name: "Gas Stove (2 Burner)",    category: "appliances",  icon: "🔥", emoji: "fas fa-fire",         rent: 149,  deposit: 400,  tenures: ["3", "6", "12"], stock: 18 },
  // ELECTRONICS
  { id: 13, name: 'Smart TV 43"',            category: "electronics", icon: "📺", emoji: "fas fa-tv",           rent: 499,  deposit: 1200, tenures: ["3", "6", "12"], stock: 11 },
  { id: 14, name: "Laptop (i5, 16GB)",       category: "electronics", icon: "💻", emoji: "fas fa-laptop",       rent: 999,  deposit: 2500, tenures: ["3", "6", "12"], stock: 5  },
  { id: 15, name: "WiFi Router",             category: "electronics", icon: "📡", emoji: "fas fa-wifi",         rent: 99,   deposit: 300,  tenures: ["3", "6", "12"], stock: 25 },
  { id: 16, name: 'Smart TV 55"',            category: "electronics", icon: "📺", emoji: "fas fa-tv",           rent: 799,  deposit: 2000, tenures: ["6", "12"],      stock: 7  },
];

// ── State ──
let cart = [];
let currentCategory = "all";
let currentUser = null;
let checkoutStep = 1;

// ── Sample Rental Data ──
const activeRentals = [
  { icon: "fas fa-snowflake", name: "Double Door Fridge",  meta: "6 Months plan · Expires Aug 2025",  status: "active"    },
  { icon: "fas fa-tv",        name: 'Smart TV 43"',         meta: "12 Months plan · Expires Feb 2026", status: "active"    },
  { icon: "fas fa-couch",     name: "L-Shape Sofa Set",    meta: "3 Months plan · Expires May 2025",  status: "active"    },
];
const rentalHistory = [
  { icon: "fas fa-bed",    name: "King Bed Frame",    meta: "Completed · Sep 2024 – Mar 2025", status: "completed" },
  { icon: "fas fa-laptop", name: "Laptop (i5, 16GB)", meta: "Completed · Jun 2024 – Sep 2024", status: "completed" },
];
const maintenanceRequests = [
  { icon: "fas fa-wrench", name: "Fridge – Noise Issue",   meta: "Submitted 2 days ago",              status: "pending" },
  { icon: "fas fa-tools",  name: "Washer – Not Draining",  meta: "Technician scheduled for tomorrow", status: "active"  },
];

// ── Admin Orders ──
const sampleOrders = [
  { id: "ORD-8821", customer: "Rahul Kumar",  product: 'Smart TV 43"',   plan: "6 Months",  status: "active"    },
  { id: "ORD-8820", customer: "Priya Sharma", product: "Fridge 350L",    plan: "12 Months", status: "active"    },
  { id: "ORD-8819", customer: "Amit Mishra",  product: "Sofa Set",       plan: "3 Months",  status: "pending"   },
  { id: "ORD-8818", customer: "Sneha Gupta",  product: "Washing Machine",plan: "6 Months",  status: "completed" },
  { id: "ORD-8817", customer: "Vikas Singh",  product: "AC 1.5 Ton",     plan: "12 Months", status: "active"    },
];

/* ==============================================
   INITIALIZATION
   ============================================== */
document.addEventListener("DOMContentLoaded", () => {
  renderProducts(allProducts);
  renderAdminTable();
  renderAdminOrders();
  renderDashboard();
  initNavScroll();
  initScrollAnimations();
  setMinDeliveryDate();
  updateCartBadge();
  document.getElementById("footerYear").textContent = new Date().getFullYear();
});

/* ==============================================
   NAVBAR
   ============================================== */
function initNavScroll() {
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 60);
  });
}

function toggleMobileMenu() {
  document.getElementById("navLinks").classList.toggle("open");
}

function closeMobileMenu() {
  document.getElementById("navLinks").classList.remove("open");
}

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ==============================================
   AUTH
   ============================================== */
function switchTab(tab) {
  document.querySelectorAll(".auth-tab").forEach(t => t.classList.remove("active"));
  document.querySelectorAll(".auth-form").forEach(f => f.classList.add("hidden"));
  document.getElementById(`${tab}Form`).classList.remove("hidden");
  const tabs = document.querySelectorAll(".auth-tab");
  tabs[tab === "login" ? 0 : 1].classList.add("active");
}

function loginUser() {
  currentUser = "Kartik Sharma";
  document.getElementById("dashboardUsername").textContent = currentUser;
  document.getElementById("authBtn").textContent = "Logout";
  document.getElementById("authBtn").onclick = logoutUser;
  closeModal("authModal");
  showToast("✅ Welcome back, " + currentUser + "!");
}

function signupUser() {
  currentUser = "New User";
  document.getElementById("dashboardUsername").textContent = currentUser;
  document.getElementById("authBtn").textContent = "Logout";
  document.getElementById("authBtn").onclick = logoutUser;
  closeModal("authModal");
  showToast("🎉 Account created successfully!");
}

function logoutUser() {
  currentUser = null;
  document.getElementById("dashboardUsername").textContent = "Guest User";
  document.getElementById("authBtn").textContent = "Login";
  // FIX: use named function reference instead of arrow function so it works correctly
  document.getElementById("authBtn").onclick = function () { openModal("authModal"); };
  showToast("👋 Logged out successfully");
}

/* ==============================================
   MODAL MANAGEMENT
   FIX: Single unified openModal — no duplicate definition.
        renderCartModal() is called only when opening the cart modal.
   ============================================== */
function openModal(id) {
  if (id === "cartModal") renderCartModal();
  document.getElementById(id).classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeModal(id) {
  document.getElementById(id).classList.add("hidden");
  document.body.style.overflow = "";
}

function closeAllModals() {
  document.querySelectorAll(".modal-overlay").forEach(m => m.classList.add("hidden"));
  document.body.style.overflow = "";
}

// Close modal on overlay click
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal-overlay")) closeAllModals();
});

/* ==============================================
   PRODUCTS
   ============================================== */
function renderProducts(products) {
  const grid = document.getElementById("productsGrid");
  if (products.length === 0) {
    grid.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:60px 20px;color:var(--text-muted)">
        <i class="fas fa-search" style="font-size:40px;opacity:0.3;display:block;margin-bottom:12px"></i>
        <p style="font-size:16px">No products found. Try a different search.</p>
      </div>`;
    return;
  }
  grid.innerHTML = products.map((p, i) => `
    <div class="product-card" style="animation-delay:${i * 0.06}s">
      <div class="product-img-wrap">
        <span style="font-size:60px">${p.icon}</span>
        <span class="product-cat-tag">${capitalize(p.category)}</span>
      </div>
      <div class="product-info">
        <div class="product-name">${p.name}</div>
        <div class="product-meta">
          <span class="product-deposit">Deposit: ₹${p.deposit.toLocaleString()}</span>
          <span class="product-tenure">Min 3 mo</span>
        </div>
        <div class="product-price-row">
          <div>
            <span class="product-price">₹${p.rent.toLocaleString()}</span>
            <span class="product-price-sub">/month</span>
          </div>
          <span style="font-size:12px;color:${p.stock < 5 ? 'var(--red)' : 'var(--green)'}">
            ${p.stock < 5 ? `⚠️ ${p.stock} left` : `✓ In Stock`}
          </span>
        </div>
        <select class="plan-select" id="plan-${p.id}">
          ${p.tenures.map(t =>
            `<option value="${t}">${t} Months${t === "6" ? " (Save 10%)" : t === "12" ? " (Save 20%)" : ""}</option>`
          ).join("")}
        </select>
        <div class="product-actions">
          <button class="btn-outline" onclick="addToCart(${p.id})">
            <i class="fas fa-cart-plus"></i> Add
          </button>
          <button class="btn-primary" onclick="rentNow(${p.id})">
            Rent Now
          </button>
        </div>
      </div>
    </div>
  `).join("");
}

function filterCategory(cat) {
  currentCategory = cat;
  document.querySelectorAll(".category-card").forEach(c => c.classList.remove("active"));
  const idx = ["all", "furniture", "appliances", "electronics"].indexOf(cat);
  if (idx >= 0) document.querySelectorAll(".category-card")[idx]?.classList.add("active");
  applyFilters();
  document.getElementById("products").scrollIntoView({ behavior: "smooth", block: "start" });
}

function searchProducts() {
  applyFilters();
}

function sortProducts() {
  applyFilters();
}

function applyFilters() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const sort  = document.getElementById("sortSelect").value;
  let filtered = allProducts.filter(p => {
    const matchCat   = currentCategory === "all" || p.category === currentCategory;
    const matchQuery = p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query);
    return matchCat && matchQuery;
  });
  // Apply sorting based on selected option
  if (sort === "price-low")  filtered.sort((a, b) => a.rent - b.rent);
  else if (sort === "price-high") filtered.sort((a, b) => b.rent - a.rent);
  else if (sort === "name")  filtered.sort((a, b) => a.name.localeCompare(b.name));
  // "default" maintains the original order (no additional sorting needed)
  renderProducts(filtered);
}

/* ==============================================
   CART
   ============================================== */
function addToCart(productId) {
  const product  = allProducts.find(p => p.id === productId);
  const planEl   = document.getElementById(`plan-${productId}`);
  const plan     = planEl ? planEl.value : (product.tenures[0] || "3");
  const existing = cart.find(c => c.id === productId && c.plan === plan);
  if (existing) {
    showToast("⚠️ Already in cart with this plan!");
    return;
  }
  cart.push({ ...product, plan, quantity: 1 });
  updateCartBadge();
  showToast(`🛒 "${product.name}" added to cart!`);
}

function rentNow(productId) {
  addToCart(productId);
  openModal("cartModal");
}

function removeFromCart(index) {
  const removed = cart[index].name;
  cart.splice(index, 1);
  updateCartBadge();
  renderCartModal();
  showToast(`🗑️ "${removed}" removed`);
}

function updateCartBadge() {
  document.getElementById("cartBadge").textContent = cart.length;
}

function renderCartModal() {
  const container = document.getElementById("cartItems");
  const summary   = document.getElementById("cartSummary");

  if (cart.length === 0) {
    container.innerHTML = `
      <div style="text-align:center;padding:40px;color:var(--text-muted)">
        <i class="fas fa-shopping-cart" style="font-size:36px;opacity:0.3;display:block;margin-bottom:12px"></i>
        <p>Your cart is empty.</p>
      </div>`;
    summary.innerHTML = "";
    return;
  }

  container.innerHTML = cart.map((item, i) => `
    <div class="cart-item">
      <div class="cart-item-icon"><i class="${item.emoji}"></i></div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-plan">${item.plan} Months · Deposit ₹${item.deposit.toLocaleString()}</div>
      </div>
      <span class="cart-item-price">₹${item.rent.toLocaleString()}/mo</span>
      <button class="remove-btn" onclick="removeFromCart(${i})"><i class="fas fa-times"></i></button>
    </div>
  `).join("");

  // FIX: Calculate discount per-item based on each item's own plan, not just cart[0]'s plan
  let monthlyTotal = 0;
  let discountTotal = 0;
  let depositTotal = 0;

  cart.forEach(item => {
    const discountRate = item.plan === "12" ? 0.2 : item.plan === "6" ? 0.1 : 0;
    const discountAmt  = Math.round(item.rent * discountRate);
    monthlyTotal  += item.rent;
    discountTotal += discountAmt;
    depositTotal  += item.deposit;
  });

  const finalRent = monthlyTotal - discountTotal;

  summary.innerHTML = `
    <div class="cart-row"><span>Monthly Rent</span><span>₹${monthlyTotal.toLocaleString()}</span></div>
    ${discountTotal > 0
      ? `<div class="cart-row"><span>Plan Discount</span><span style="color:var(--green)">-₹${discountTotal.toLocaleString()}</span></div>`
      : ""}
    <div class="cart-row"><span>Security Deposit</span><span>₹${depositTotal.toLocaleString()}</span></div>
    <div class="cart-row"><span>Delivery</span><span style="color:var(--green)">FREE</span></div>
    <div class="cart-row total"><span>Monthly Payment</span><span>₹${finalRent.toLocaleString()}</span></div>
  `;
}

function proceedCheckout() {
  if (cart.length === 0) { showToast("⚠️ Your cart is empty!"); return; }
  closeModal("cartModal");
  checkoutStep = 1;
  showCheckoutStep(1);
  openModal("checkoutModal");
}

/* ==============================================
   CHECKOUT
   ============================================== */
function showCheckoutStep(step) {
  checkoutStep = step;
  document.querySelectorAll(".checkout-step").forEach(s => s.classList.remove("active"));
  document.querySelectorAll(".checkout-steps .step").forEach(s => s.classList.remove("active"));
  document.getElementById(`checkout-step-${step}`).classList.add("active");
  document.getElementById(`step${step}-indicator`).classList.add("active");
  if (step === 3) renderFinalSummary();
}

function nextStep(step) {
  showCheckoutStep(step);
}

function renderFinalSummary() {
  // FIX: consistent per-item discount calculation (same fix as renderCartModal)
  let monthlyTotal  = 0;
  let discountTotal = 0;
  let depositTotal  = 0;

  cart.forEach(item => {
    const discountRate = item.plan === "12" ? 0.2 : item.plan === "6" ? 0.1 : 0;
    discountTotal += Math.round(item.rent * discountRate);
    monthlyTotal  += item.rent;
    depositTotal  += item.deposit;
  });

  const finalRent = monthlyTotal - discountTotal;
  const date = document.getElementById("deliveryDate")?.value || "Not selected";

  document.getElementById("finalOrderSummary").innerHTML = cart.map(item => `
    <div style="display:flex;justify-content:space-between;padding:8px 0;font-size:14px;border-bottom:1px solid var(--border)">
      <span>${item.name} (${item.plan} months)</span>
      <span>₹${item.rent.toLocaleString()}/mo</span>
    </div>
  `).join("") + `
    <div style="display:flex;justify-content:space-between;padding:8px 0;font-size:14px;color:var(--text-muted)">
      <span>Security Deposit</span><span>₹${depositTotal.toLocaleString()}</span>
    </div>
    <div style="display:flex;justify-content:space-between;padding:8px 0;font-size:14px;color:var(--text-muted)">
      <span>Delivery Date</span><span>${date}</span>
    </div>
  `;

  document.getElementById("orderTotal").innerHTML =
    `Total Monthly Rent: <span style="color:var(--amber)">₹${finalRent.toLocaleString()}/mo</span>`;
}

function placeOrder() {
  const orderId = "ORD-" + Math.floor(10000 + Math.random() * 90000);
  document.getElementById("generatedOrderId").textContent = orderId;

  sampleOrders.unshift({
    id: orderId,
    customer: currentUser || "Guest User",
    product:  cart[0]?.name || "Mixed Items",
    plan:     (cart[0]?.plan || "3") + " Months",
    status:   "pending"
  });
  renderAdminOrders();

  cart = [];
  updateCartBadge();
  closeModal("checkoutModal");
  openModal("successModal");
  showToast("🎉 Order placed successfully!");
}

function setMinDeliveryDate() {
  const dateInput = document.getElementById("deliveryDate");
  if (dateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.min   = tomorrow.toISOString().split("T")[0];
    dateInput.value = tomorrow.toISOString().split("T")[0];
  }
}

/* ==============================================
   DASHBOARD
   ============================================== */
function renderDashboard() {
  renderRentalList("activeRentalsContainer", activeRentals);
  renderRentalList("historyContainer", rentalHistory);
  renderRentalList("maintenanceContainer", maintenanceRequests);
}

function renderRentalList(containerId, items) {
  const el = document.getElementById(containerId);
  if (!el) return;
  if (items.length === 0) {
    el.innerHTML = `<p style="color:var(--text-muted);font-size:14px">No items to show.</p>`;
    return;
  }
  el.innerHTML = items.map(item => `
    <div class="rental-item">
      <div class="rental-item-icon"><i class="${item.icon}"></i></div>
      <div class="rental-item-info">
        <div class="rental-item-name">${item.name}</div>
        <div class="rental-item-meta">${item.meta}</div>
      </div>
      <span class="rental-status status-${item.status}">${capitalize(item.status)}</span>
    </div>
  `).join("");
}

function showDashTab(tab, tabItem) {
  document.querySelectorAll(".dash-tab").forEach(t => t.classList.remove("active"));
  document.querySelectorAll(".dash-menu li").forEach(l => l.classList.remove("active"));
  document.getElementById(tab)?.classList.add("active");
  if (tabItem) tabItem.classList.add("active");
}

/* ==============================================
   ADMIN
   ============================================== */
function renderAdminTable() {
  const tbody = document.getElementById("adminProductTable");
  tbody.innerHTML = allProducts.map(p => `
    <tr>
      <td><strong>${p.name}</strong></td>
      <td><span style="text-transform:capitalize">${p.category}</span></td>
      <td><strong>₹${p.rent.toLocaleString()}</strong>/mo</td>
      <td>₹${p.deposit.toLocaleString()}</td>
      <td><span class="stock-badge ${p.stock < 5 ? 'stock-low' : 'stock-good'}">${p.stock}</span></td>
      <td><span class="rental-status ${p.stock > 0 ? 'status-active' : 'status-pending'}">${p.stock > 0 ? 'Available' : 'Out of Stock'}</span></td>
      <td>
        <button class="tbl-action" onclick="showToast('✏️ Edit coming soon!')"><i class="fas fa-edit"></i></button>
        <button class="tbl-action" onclick="deleteProduct(${p.id})" style="color:var(--red)"><i class="fas fa-trash"></i></button>
      </td>
    </tr>
  `).join("");
}

function renderAdminOrders() {
  const tbody = document.getElementById("adminOrderTable");
  tbody.innerHTML = sampleOrders.map(o => `
    <tr>
      <td><code style="font-size:12px;color:var(--amber)">${o.id}</code></td>
      <td>${o.customer}</td>
      <td>${o.product}</td>
      <td>${o.plan}</td>
      <td><span class="rental-status status-${o.status}">${capitalize(o.status)}</span></td>
    </tr>
  `).join("");
}

function openAddProduct() {
  openModal("addProductModal");
}

function addNewProduct(event) {
  if (event) event.preventDefault();
  
  const name     = document.getElementById("newProductName").value.trim();
  const category = document.getElementById("newProductCategory").value;
  const rent     = parseInt(document.getElementById("newProductRent").value);
  const deposit  = parseInt(document.getElementById("newProductDeposit").value);
  const stock    = parseInt(document.getElementById("newProductStock").value);

  if (!name || !category || isNaN(rent) || isNaN(deposit) || isNaN(stock) || rent < 1 || deposit < 0 || stock < 1) {
    showToast("⚠️ Please fill all fields with valid values!");
    return;
  }

  const newProduct = {
    id: allProducts.length + 1,
    name, category,
    icon:    category === "furniture" ? "🛋️" : category === "appliances" ? "⚡" : "💻",
    emoji:   "fas fa-box",
    rent, deposit, stock,
    tenures: ["3", "6", "12"]
  };
  allProducts.push(newProduct);
  renderAdminTable();
  applyFilters();
  
  // Reset form and close modal
  const form = event.target;
  if (form && form.reset) form.reset();
  closeModal("addProductModal");
  showToast(`✅ "${name}" added to inventory!`);
}

function deleteProduct(id) {
  const idx = allProducts.findIndex(p => p.id === id);
  if (idx === -1) return;
  const name = allProducts[idx].name;
  allProducts.splice(idx, 1);
  // FIX: also remove from cart if the deleted product is in there
  cart = cart.filter(c => c.id !== id);
  updateCartBadge();
  renderAdminTable();
  applyFilters();
  showToast(`🗑️ "${name}" removed from inventory`);
}

/* ==============================================
   MAINTENANCE
   ============================================== */
function submitMaintenance() {
  closeModal("maintenanceModal");
  showToast("🔧 Maintenance request submitted! Technician will contact you within 24h.");
}

/* ==============================================
   TOAST
   ============================================== */
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.remove("hidden");
  toast.classList.add("show");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.classList.add("hidden"), 400);
  }, 3000);
}

/* ==============================================
   SCROLL ANIMATIONS
   ============================================== */
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animateTargets = document.querySelectorAll(
    ".category-card, .step-card, .plan-card, .kpi-card, .testimonial-card, .rental-item"
  );
  animateTargets.forEach((el, i) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    el.style.transition = `opacity 0.5s ${i * 0.05}s ease, transform 0.5s ${i * 0.05}s ease`;
    observer.observe(el);
  });
}

/* ==============================================
   HELPERS
   ============================================== */
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}