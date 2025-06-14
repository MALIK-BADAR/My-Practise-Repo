// Get the product list element
const productList = document.getElementById('product-list');

// Get the cart list element
const cartList = document.getElementById('cart-list');

// Get the cart total element
const cartTotal = document.getElementById('cart-total');

// Get the checkout form element
const checkoutForm = document.getElementById('checkout-form');

// Define an array of products
const products = [
    {
        id: 1,
        name: 'Product 1',
        price: 10.99,
        image: 'Product 1.jpg'
    },
    {
        id: 2,
        name: 'Product 2',
        price: 9.99,
        image: 'Product 2.jpg'
    },
    {
        id: 3,
        name: 'Product 3',
        price: 12.99,
        image: 'Product 3.jpg'
    }
];

// Define an array to store the cart items
const cartItems = [];

// Function to render the product list
function renderProductList() {
    productList.innerHTML = '';
    products.forEach(product => {
        const productHTML = `
            <li class="product" data-product-id="${product.id}">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>$${product.price}</p>
                    <button class="add-to-cart-button">Add to Cart</button>
                </div>
            </li>
        `;
        productList.insertAdjacentHTML('beforeend', productHTML);
    });
}

// Function to render the cart list
function renderCartList() {
    cartList.innerHTML = '';
    cartItems.forEach(item => {
        const cartItemHTML = `
            <li class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>Quantity: ${item.quantity}</p>
                    <p>Price: $${item.price}</p>
                </div>
            </li>
        `;
        cartList.insertAdjacentHTML('beforeend', cartItemHTML);
    });
}

// Function to update the cart total
function updateCartTotal() {
    let total = 0;
    cartItems.forEach(item => {
        total += item.price * item.quantity;
    });
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

// Add event listener to the product list
productList.addEventListener('click', event => {
    if (event.target.classList.contains('add-to-cart-button')) {
        const productId = event.target.parentNode.parentNode.dataset.productId;
        const product = products.find(product => product.id === parseInt(productId));
        const cartItem = cartItems.find(item => item.id === product.id);
        if (cartItem) {
            cartItem.quantity++;
        } else {
            cartItems.push({ ...product, quantity: 1 });
        }
        updateCartTotal();
        renderCartList();
    }
});

// Add event listener to the checkout form
checkoutForm.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(checkoutForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const address = formData.get('address');
    console.log(`Name: ${name}, Email: ${email}, Address: ${address}`);
    // Add logic to process the order
});

// Render the product list
renderProductList();