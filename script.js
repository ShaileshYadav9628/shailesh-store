const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 999,
        icon: "🎧"
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 1499,
        icon: "⌚"
    },
    {
        id: 3,
        name: "Running Shoes",
        price: 1999,
        icon: "👟"
    },
    {
        id: 4,
        name: "Backpack",
        price: 799,
        icon: "🎒"
    },
    {
        id: 5,
        name: "Sunglasses",
        price: 499,
        icon: "🕶️"
    },
    {
        id: 6,
        name: "Smartphone",
        price: 9999,
        icon: "📱"
    }
];

let cart = [];

const productList = document.getElementById("product-list");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutMessage = document.getElementById("checkout-message");

function displayProducts() {
    productList.innerHTML = products.map(product => `
        <article class="product-card">
            <div class="product-image">${product.icon}</div>
            <h3>${product.name}</h3>
            <p>Quality product for everyday use.</p>
            <p class="product-price">₹${product.price.toLocaleString("en-IN")}</p>
            <button
                class="primary-btn"
                onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        </article>
    `).join("");
}

function addToCart(productId) {
    const product = products.find(item => item.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    checkoutMessage.textContent = "";
    displayCart();
}

function changeQuantity(productId, amount) {
    const item = cart.find(product => product.id === productId);

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {
        cart = cart.filter(product => product.id !== productId);
    }

    displayCart();
}

function displayCart() {
    if (cart.length === 0) {
        cartItems.textContent = "Your cart is empty.";
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-row">
                <div>
                    <strong>${item.name}</strong>
                    <p>₹${item.price.toLocaleString("en-IN")} each</p>
                </div>

                <div>
                    <button
                        aria-label="Decrease ${item.name} quantity"
                        onclick="changeQuantity(${item.id}, -1)">−</button>

                    <span>${item.quantity}</span>

                    <button
                        aria-label="Increase ${item.name} quantity"
                        onclick="changeQuantity(${item.id}, 1)">+</button>
                </div>

                <strong>
                    ₹${(item.price * item.quantity).toLocaleString("en-IN")}
                </strong>
            </div>
        `).join("");
    }

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    cartTotal.textContent = "₹" + total.toLocaleString("en-IN");
}

document.getElementById("clear-cart").addEventListener("click", () => {
    cart = [];
    checkoutMessage.textContent = "";
    displayCart();
});

document.getElementById("checkout").addEventListener("click", () => {
    if (cart.length === 0) {
        checkoutMessage.textContent =
            "Please add a product to your cart first.";
        return;
    }

    checkoutMessage.textContent =
        "Demo checkout: Online ordering will be added in the next stage.";
});

displayProducts();
displayCart();