
let cart = [];

document.addEventListener('DOMContentLoaded', () => {
    const cartLink = document.getElementById('cart-link');
    const cartCount = document.getElementById('cart-count');
    const cartProducts = document.querySelector('.cart-products');
    const checkoutButton = document.getElementById('checkout');

    cartLink.addEventListener('click', () => {
        document.getElementById('cart').scrollIntoView();
    });

    checkoutButton.addEventListener('click', () => {
        alert('Checkout successful!');
        cart = [];
        cartCount.innerText = 0;
        cartProducts.innerHTML = '';
    });

    document.querySelectorAll('.product button').forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.id.split('-')[2];
            const product = {
                id: productId,
                name: `Product ${productId}`,
                price: 100
            };

            cart.push(product);
            cartCount.innerText = cart.length;
            const productHTML = `
                <div class='product'>
                    <h2>${product.name}</h2>
                    <p>$${product.price}</p>
                </div>
            `;
            cartProducts.insertAdjacentHTML('beforeend', productHTML);
        });
    });
});
