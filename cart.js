// Get references to cart container and total price elements
const cartItemsContainer = document.getElementById('cart-items');
const totalPriceContainer = document.getElementById('total-price');

// Function to load and display cart items
function loadCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cartItemsContainer.innerHTML = '';
  let totalPrice = 0;

  cart.forEach((item, index) => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');

    cartItem.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <div class="cart-item-details">
        <h5>${item.name}</h5>
        <p>Price: ${item.price}</p>
      </div>
      <div class="quantity-controls">
        <button class="btn-minus" data-index="${index}">-</button>
        <input type="number" value="${item.quantity || 1}" min="1" data-index="${index}">
        <button class="btn-plus" data-index="${index}">+</button>
        <button class="btn-remove" data-index="${index}">X</button>
      </div>
    `;
    cartItemsContainer.appendChild(cartItem);

    const price = parseInt(item.price.replace(/[^0-9]/g, ''), 10);
    totalPrice += price * (item.quantity || 1);
  });

  totalPriceContainer.innerText = `Total: Rs ${totalPrice}`;
}

// Function to update total price
function updateTotalPrice() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalPrice = cart.reduce((sum, item) => {
    const price = parseInt(item.price.replace(/[^0-9]/g, ''), 10);
    return sum + price * (item.quantity || 1);
  }, 0);

  totalPriceContainer.innerText = `Total: Rs ${totalPrice}`;
}

// Function to update cart in localStorage
function updateCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCart();
}

// Handle click events (for removing and updating quantities)
cartItemsContainer.addEventListener('click', (event) => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const index = event.target.getAttribute('data-index');

  if (event.target.classList.contains('btn-remove')) {
    cart.splice(index, 1); // Remove item
    updateCart(cart);
  } else if (event.target.classList.contains('btn-minus') || event.target.classList.contains('btn-plus')) {
    const input = event.target.parentElement.querySelector('input');
    let quantity = parseInt(input.value);

    quantity += event.target.classList.contains('btn-plus') ? 1 : -1;
    quantity = Math.max(quantity, 1); // Ensure minimum quantity is 1

    input.value = quantity;
    cart[index].quantity = quantity;
    updateCart(cart);
  }
});

// Handle input changes (manual quantity adjustment)
cartItemsContainer.addEventListener('input', (event) => {
  if (event.target.tagName === 'INPUT' && event.target.type === 'number') {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const index = event.target.getAttribute('data-index');
    let quantity = parseInt(event.target.value);

    quantity = Math.max(quantity, 1); // Ensure minimum quantity is 1
    event.target.value = quantity;

    cart[index].quantity = quantity;
    updateCart(cart);
  }
});

// Initialize the cart on page load
loadCart();