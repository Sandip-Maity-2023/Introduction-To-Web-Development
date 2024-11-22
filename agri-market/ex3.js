// Add some dummy items to the cart, wishlist, and available products
document.addEventListener('DOMContentLoaded', function () {
    const cartList = document.getElementById('cart-list');
    const wishlist = document.getElementById('wishlist');
    const availableProducts = document.getElementById('available-products');

    // Dummy cart items
    cartList.innerHTML = `
        <li>Product A <img src="cart-item-icon.png" alt="Product A"></li>
        <li>Product B <img src="cart-item-icon.png" alt="Product B"></li>
    `;

    // Dummy wishlist items
    wishlist.innerHTML = `
        <li>Wishlist Product 1 <img src="wishlist-item-icon.png" alt="Wishlist Product 1"></li>
        <li>Wishlist Product 2 <img src="wishlist-item-icon.png" alt="Wishlist Product 2"></li>
    `;

    // Dummy available products
    availableProducts.innerHTML = `
        <li>Available Product 1 <img src="product-icon.png" alt="Available Product 1"></li>
        <li>Available Product 2 <img src="product-icon.png" alt="Available Product 2"></li>
    `;
});
