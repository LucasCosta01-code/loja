document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartModal = document.getElementById('cart-modal');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const finalizePurchaseButton = document.getElementById('finalize-purchase');
    const closeButton = document.querySelector('.close-button');
    const cartIcon = document.querySelector('.cart-icon');
    const freteCombinarCheckbox = document.getElementById('frete-combinar');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const menu = document.querySelector('nav ul.menu');
    const whatsappNumber = '5511948604360'; // Substitua pelo seu número de WhatsApp

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-id');
            const productName = button.getAttribute('data-name');
            const productPrice = parseFloat(button.getAttribute('data-price'));

            const product = cart.find(item => item.id === productId);
            if (product) {
                product.quantity += 1;
            } else {
                cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
            }

            updateCart();
            showConfirmationMessage(`${productName} adicionado ao carrinho!`);
        });
    });

    closeButton.addEventListener('click', () => {
        cartModal.style.display = 'none';
        document.getElementById('purchase-summary').style.display = 'none'; // Close purchase summary
    });

    finalizePurchaseButton.addEventListener('click', () => {
        const message = createWhatsAppMessage();
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        
        // Atualiza o resumo da compra
        showPurchaseSummary();

        window.open(whatsappUrl, '_blank');
        cart.length = 0;
        updateCart();
        cartModal.style.display = 'none';
    });

    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <p>${item.name} - R$ ${item.price.toFixed(2)} x ${item.quantity}</p>
            `;
            cartItemsContainer.appendChild(cartItem);

            total += item.price * item.quantity;
        });

        cartTotal.textContent = total.toFixed(2);
        cartModal.style.display = cart.length > 0 ? 'block' : 'none';
    }

    function showPurchaseSummary() {
        const purchaseItemsContainer = document.getElementById('purchase-items');
        const purchaseTotal = document.getElementById('purchase-total');

        purchaseItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const purchaseItem = document.createElement('div');
            purchaseItem.classList.add('cart-item');
            purchaseItem.innerHTML = `
                <p>${item.name} - R$ ${item.price.toFixed(2)} x ${item.quantity}</p>
            `;
            purchaseItemsContainer.appendChild(purchaseItem);

            total += item.price * item.quantity;
        });

        purchaseTotal.textContent = total.toFixed(2);
        document.getElementById('purchase-summary').style.display = 'block';
    }

    function createWhatsAppMessage() {
        let message = 'Resumo da Compra:\n';
        cart.forEach(item => {
            message += `${item.name} - R$ ${item.price.toFixed(2)} x ${item.quantity}\n`;
        });
        message += `Total: R$ ${cartTotal.textContent}`;
        return message;
    }

    // Close button for the purchase summary
    document.querySelector('#purchase-summary .close-button').addEventListener('click', () => {
        document.getElementById('purchase-summary').style.display = 'none';
    });

    cartIcon.addEventListener('click', () => {
        updateCart();
    });

    hamburgerMenu.addEventListener('click', () => {
        menu.classList.toggle('show');
    });

    function showConfirmationMessage(message) {
        const confirmation = document.createElement('div');
        confirmation.className = 'confirmation-message';
        confirmation.innerText = message;
        document.body.appendChild(confirmation);
        setTimeout(() => {
            confirmation.remove();
        }, 3000);
    }
});
