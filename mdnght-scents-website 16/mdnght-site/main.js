// Existing Facebook Page ID and Messenger destination.
const FACEBOOK_PAGE_USERNAME = '61587501380475';
const MESSENGER_URL = `https://m.me/${FACEBOOK_PAGE_USERNAME}`;

// CONFIGURABLE DELIVERY ESTIMATES — these are estimates, not live courier quotes.
// Update when the store has confirmed suitable estimates.
// Pickup is always free and is fixed at ₱0.
const DELIVERY_ESTIMATES = Object.freeze({
  jt: 150,
  lalamove: 250,
  pickup: 0,
});

const PICKUP_ADDRESS =
  'B7 L11 Kamagong St., ACT Sherwood Homes, Anabu 2B, Imus, Cavite.';
const CART_STORAGE_KEY = 'mdnght-scents-cart-v1';

const catalog = [
  {
    id: 'nacre',
    name: 'Nacre',
    mood: 'QUIET ELEGANCE',
    description: 'Soft, intimate clean musk and delicate woods. Effortless and understated.',
    notes: 'Soft musk · Powdery warmth · Gentle woods',
    image: '/images/nacre.webp',
    size: '50ml',
    price: 675,
  },
  {
    id: 'azure',
    name: 'Azure',
    mood: 'THE FEELING OF ESCAPE',
    description: 'Refreshing citrus and cool freshness, like a sunlit coastal morning.',
    notes: 'Citrus · Cool freshness · Soft woods',
    image: '/images/azure.webp',
    size: '50ml',
    price: 675,
  },
  {
    id: 'cairo',
    name: 'Cairo',
    mood: 'QUIET CONFIDENCE',
    description: 'Fresh aromatics meet warm woods. Refined, modern, clean and magnetic.',
    notes: 'Fresh aromatics · Warm woods · Musk',
    image: '/images/cairo.webp',
    size: '50ml',
    price: 675,
  },
  {
    id: 'aurum',
    name: 'Aurum',
    mood: 'UNAPOLOGETIC ALLURE',
    description: 'Addictive juicy sweetness and warm amber. Bold, playful and unforgettable.',
    notes: 'Juicy fruit · Warm amber · Vanilla',
    image: '/images/aurum.webp',
    size: '50ml',
    price: 675,
  },
  {
    id: 'khesed',
    name: 'Khesed',
    mood: 'THE ART OF PRESENCE',
    description: 'Bright citrus and aromatic warmth. Sophisticated and captivating.',
    notes: 'Bright citrus · Aromatics · Warm woods',
    image: '/images/khesed.webp',
    size: '50ml',
    price: 675,
  },
  {
    id: 'dahlia',
    name: 'Dahlia',
    mood: 'ROMANCE IN BLOOM',
    description: 'Luscious fruits and velvety florals. Feminine, romantic and expressive.',
    notes: 'Lush fruits · Velvety florals · Soft musk',
    image: '/images/dahlia.webp',
    size: '50ml',
    price: 675,
  },
  {
    id: 'celeste',
    name: 'Celeste',
    mood: 'A SOFTER KIND OF STRENGTH',
    description: 'Delicate florals and clean luminous musk. Radiant and graceful.',
    notes: 'Delicate florals · Clean musk · Soft woods',
    image: '/images/celeste.webp',
    size: '50ml',
    price: 675,
  },
];

const peso = (amount) => `₱${Number(amount).toLocaleString('en-PH')}`;

const messengerUrl = () => MESSENGER_URL;

function makeElement(tagName, className = '', text) {
  const element = document.createElement(tagName);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function setMessengerLinks() {
  document.querySelectorAll('[data-messenger]').forEach((link) => {
    link.href = messengerUrl();
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  });
}

function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '{}');
    const validCart = {};

    for (const [id, quantity] of Object.entries(saved)) {
      const knownProduct = catalog.some((product) => product.id === id);
      if (knownProduct && Number.isSafeInteger(quantity) && quantity > 0) {
        validCart[id] = quantity;
      }
    }

    return validCart;
  } catch (error) {
    console.warn('Could not read the saved MDNGHT cart.', error);
    return {};
  }
}

let cart = loadCart();

function saveCart() {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.warn('Could not save the cart in this browser.', error);
  }
}

function cartEntries() {
  return Object.entries(cart)
    .map(([id, quantity]) => ({
      product: catalog.find((product) => product.id === id),
      quantity,
    }))
    .filter((entry) => entry.product);
}

function cartSubtotal() {
  return cartEntries().reduce(
    (subtotal, entry) => subtotal + entry.product.price * entry.quantity,
    0,
  );
}

function selectedFulfillment() {
  return document.querySelector('input[name="fulfillment"]:checked')?.value || 'jt';
}

function selectedPayment() {
  return document.querySelector('input[name="payment"]:checked')?.value ||
    'GCash / Bank Transfer';
}

function deliveryFee() {
  const method = selectedFulfillment();

  // Pickup is always free, regardless of any future estimate configuration.
  if (method === 'pickup') return 0;

  return DELIVERY_ESTIMATES[method] ?? 0;
}

function fulfillmentLabel(method = selectedFulfillment()) {
  return {
    jt: 'J&T Express',
    lalamove: 'Lalamove Same-Day Delivery',
    pickup: 'Store Pickup',
  }[method] || 'Unknown';
}

function renderCollection() {
  const products = document.querySelector('#products');
  if (!products) return;

  const fragment = document.createDocumentFragment();

  catalog.forEach((product) => {
    const card = makeElement('article', 'product-card');

    const photoLink = makeElement('a', 'product-photo');
    photoLink.href = messengerUrl();
    photoLink.target = '_blank';
    photoLink.rel = 'noopener noreferrer';
    photoLink.setAttribute(
      'aria-label',
      `Ask about ${product.name} on Facebook Messenger`,
    );

    const image = document.createElement('img');
    image.src = product.image;
    image.alt = `${product.name} fragrance bottle`;
    image.loading = 'lazy';
    image.decoding = 'async';
    image.addEventListener('error', () => {
      console.error(`MDNGHT product image failed to load: ${product.image}`);
    }, { once: true });
    photoLink.append(image);

    const info = makeElement('div', 'product-info');
    info.append(
      makeElement('p', 'product-mood', product.mood),
      makeElement('h3', '', product.name),
      makeElement('p', 'product-description', product.description),
      makeElement('p', 'product-notes', product.notes),
    );

    const meta = makeElement('div', 'product-meta');
    meta.append(
      makeElement('span', '', `${product.size} · ${peso(product.price)}`),
    );

    const messengerLink = makeElement('a', 'button button-small', 'Order Now ↗');
    messengerLink.href = messengerUrl();
    messengerLink.target = '_blank';
    messengerLink.rel = 'noopener noreferrer';
    messengerLink.dataset.messenger = '';
    meta.append(messengerLink);

    const addButton = makeElement('button', 'button add-to-cart', 'Add to Cart +');
    addButton.type = 'button';
    addButton.dataset.addToCart = product.id;

    info.append(meta, addButton);
    card.append(photoLink, info);
    fragment.append(card);
  });

  products.replaceChildren(fragment);

  const renderedCards = products.querySelectorAll('.product-card').length;
  if (renderedCards !== catalog.length) {
    console.error(
      `MDNGHT collection rendered ${renderedCards} cards; expected ${catalog.length}.`,
    );
  }
}

function renderCart() {
  const countElement = document.querySelector('#cart-count');
  const cartNav = document.querySelector('.cart-nav');
  const itemsContainer = document.querySelector('#cart-items');
  const subtotalElement = document.querySelector('#cart-subtotal');

  const entries = cartEntries();
  const itemCount = entries.reduce((sum, entry) => sum + entry.quantity, 0);

  if (countElement) countElement.textContent = String(itemCount);
  if (cartNav) {
    cartNav.setAttribute('aria-label', `Shopping bag, ${itemCount} items`);
  }

  if (itemsContainer) {
    const fragment = document.createDocumentFragment();

    if (entries.length === 0) {
      fragment.append(
        makeElement(
          'p',
          'empty-cart',
          'Your bag is currently empty. Explore the collection to find your fragrance.',
        ),
      );
    } else {
      entries.forEach(({ product, quantity }) => {
        const row = makeElement('article', 'cart-item');

        const image = document.createElement('img');
        image.src = product.image;
        image.alt = '';
        image.loading = 'lazy';
        image.decoding = 'async';

        const details = makeElement('div', 'cart-item-details');
        details.append(
          makeElement('h3', '', product.name),
          makeElement('p', '', `${product.size} · ${peso(product.price)} each`),
        );

        const controls = makeElement('div', 'quantity-control');
        controls.setAttribute('aria-label', `${product.name} quantity`);

        const decrease = makeElement('button', '', '−');
        decrease.type = 'button';
        decrease.dataset.quantityChange = '-1';
        decrease.dataset.productId = product.id;
        decrease.setAttribute('aria-label', `Decrease ${product.name} quantity`);

        const quantityLabel = makeElement('span', '', String(quantity));

        const increase = makeElement('button', '', '+');
        increase.type = 'button';
        increase.dataset.quantityChange = '1';
        increase.dataset.productId = product.id;
        increase.setAttribute('aria-label', `Increase ${product.name} quantity`);

        const remove = makeElement('button', 'remove-item', 'Remove');
        remove.type = 'button';
        remove.dataset.removeItem = product.id;

        controls.append(decrease, quantityLabel, increase, remove);
        details.append(controls);

        row.append(
          image,
          details,
          makeElement('strong', 'cart-line-total', peso(product.price * quantity)),
        );
        fragment.append(row);
      });
    }

    itemsContainer.replaceChildren(fragment);
  }

  if (subtotalElement) subtotalElement.textContent = peso(cartSubtotal());
  renderReview();
}

function addressForReview() {
  const method = selectedFulfillment();

  if (method === 'pickup') {
    return `Store Pickup — ${PICKUP_ADDRESS}`;
  }

  const address = document.querySelector('#delivery-address')?.value.trim() || '';
  const city = document.querySelector('#delivery-city')?.value.trim() || '';
  const parts = [address, city].filter(Boolean);

  return parts.length ? parts.join(', ') : 'Add your delivery address.';
}

function renderReview() {
  const name = document.querySelector('#customer-name')?.value.trim() || '';
  const phone = document.querySelector('#customer-phone')?.value.trim() || '';
  const notes = document.querySelector('#order-notes')?.value.trim() || '';

  const customerReview = document.querySelector('#review-customer');
  const itemsReview = document.querySelector('#review-items');

  if (customerReview) {
    customerReview.textContent = name || phone
      ? `${name || 'Name not entered'} · ${phone || 'Phone not entered'}`
      : 'Enter your name and phone number to review your order.';
  }

  if (itemsReview) {
    const fragment = document.createDocumentFragment();
    const entries = cartEntries();

    if (entries.length === 0) {
      fragment.append(makeElement('p', 'empty-review', 'Your bag is empty.'));
    } else {
      entries.forEach(({ product, quantity }) => {
        const row = makeElement('div', 'review-item');
        const details = makeElement('span');

        details.append(
          document.createTextNode(`${product.name} × ${quantity}`),
          makeElement('small', '', `${peso(product.price)} each`),
        );

        row.append(
          details,
          makeElement('strong', '', peso(product.price * quantity)),
        );
        fragment.append(row);
      });
    }

    itemsReview.replaceChildren(fragment);
  }

  const subtotal = cartSubtotal();
  const fee = deliveryFee();

  const reviewValues = {
    '#review-subtotal': peso(subtotal),
    '#review-shipping': peso(fee),
    '#review-total': peso(subtotal + fee),
    '#review-fulfillment': fulfillmentLabel(),
    '#review-address': addressForReview(),
    '#review-payment': selectedPayment(),
    '#review-notes': notes || 'None',
  };

  Object.entries(reviewValues).forEach(([selector, value]) => {
    const element = document.querySelector(selector);
    if (element) element.textContent = value;
  });
}

function updateFulfillmentFields() {
  const method = selectedFulfillment();
  const deliveryFields = document.querySelector('#delivery-fields');
  const pickupAddress = document.querySelector('#pickup-address');
  const addressInput = document.querySelector('#delivery-address');
  const cityInput = document.querySelector('#delivery-city');
  const cityRequiredMark = document.querySelector('#city-required-mark');
  const feeDisclosure = document.querySelector('#fee-disclosure');

  const deliveryRequired = method !== 'pickup';

  if (deliveryFields) deliveryFields.hidden = !deliveryRequired;
  if (pickupAddress) pickupAddress.hidden = deliveryRequired;
  if (addressInput) addressInput.required = deliveryRequired;
  if (cityInput) cityInput.required = deliveryRequired;
  if (cityRequiredMark) cityRequiredMark.hidden = !deliveryRequired;

  if (feeDisclosure) {
    if (method === 'jt') {
      feeDisclosure.textContent =
        `Estimated delivery fee: ${peso(DELIVERY_ESTIMATES.jt)} nationwide. ` +
        'This is a configurable estimate, not a live J&T quote. The final shipping fee will be confirmed before dispatch.';
    } else if (method === 'lalamove') {
      feeDisclosure.textContent =
        `Estimated delivery fee: ${peso(DELIVERY_ESTIMATES.lalamove)}. ` +
        'This is a configurable estimate, not a live Lalamove quote. The final fee depends on delivery location and the current Lalamove quotation.';
    } else {
      feeDisclosure.textContent = 'Store pickup delivery fee: ₱0.';
    }
  }

  renderReview();
}

function buildOrderMessage(formData) {
  const method = selectedFulfillment();
  const subtotal = cartSubtotal();
  const fee = deliveryFee();

  const lines = [
    'MDNGHT SCENTS — ORDER REQUEST',
    '',
    `Customer name: ${formData.get('customerName').trim()}`,
    `Mobile phone: ${formData.get('customerPhone').trim()}`,
    `Fulfillment: ${fulfillmentLabel(method)}`,
    `Delivery / pickup address: ${addressForReview()}`,
    '',
    'PRODUCTS:',
  ];

  cartEntries().forEach(({ product, quantity }) => {
    lines.push(
      `• ${product.name} (${product.size}) × ${quantity} — ${peso(product.price)} each; line total ${peso(product.price * quantity)}`,
    );
  });

  lines.push(
    '',
    `Subtotal: ${peso(subtotal)}`,
    `Estimated delivery fee: ${peso(fee)}`,
    `Total estimated amount: ${peso(subtotal + fee)}`,
    `Payment method: ${formData.get('payment')}`,
    `Order notes: ${formData.get('orderNotes').trim() || 'None'}`,
    '',
    'I understand that delivery fees, delivery availability, and payment instructions require confirmation.',
  );

  return lines.join('\n');
}

function showManualCopy(message, statusMessage) {
  const status = document.querySelector('#order-status');
  const manualCopy = document.querySelector('#manual-copy');
  const messageField = document.querySelector('#order-message-copy');

  if (status) status.textContent = statusMessage;
  if (manualCopy) manualCopy.hidden = false;
  if (messageField) messageField.value = message;
}

async function copyOrderMessage() {
  const messageField = document.querySelector('#order-message-copy');
  const status = document.querySelector('#order-status');
  if (!messageField) return;

  try {
    await navigator.clipboard.writeText(messageField.value);
    if (status) {
      status.textContent =
        'Order message copied. Paste it into Messenger and press Send. Your order is not submitted until you send the message.';
    }
  } catch (error) {
    messageField.focus();
    messageField.select();
    if (status) {
      status.textContent =
        'Automatic copying is unavailable. The full message is selected above; copy it, paste it into Messenger, and press Send. Your order is not submitted until you send the message.';
    }
  }
}

function bindCheckout() {
  const form = document.querySelector('#checkout-form');
  if (!form) return;

  form.addEventListener('input', renderReview);

  form.addEventListener('change', (event) => {
    if (event.target.name === 'fulfillment') {
      updateFulfillmentFields();
    } else {
      renderReview();
    }
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const status = document.querySelector('#order-status');

    if (cartEntries().length === 0) {
      if (status) {
        status.textContent = 'Add at least one fragrance to your bag before checkout.';
      }
      document.querySelector('#cart-section')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (!form.reportValidity()) return;

    const formData = new FormData(form);
    const orderMessage = buildOrderMessage(formData);
    const encodedMessage = encodeURIComponent(orderMessage);

    // Open synchronously from the submit event to reduce Safari popup blocking.
    // Messenger may ignore the text query, so the complete message is also shown
    // in the manual-copy field. Opening Messenger does not submit the order.
    const messengerTab = window.open(
      `${messengerUrl()}?text=${encodedMessage}`,
      '_blank',
    );

    if (!messengerTab) {
      showManualCopy(
        orderMessage,
        'Safari blocked the Messenger window. The complete order message is shown below; copy it, open Messenger, paste it, and press Send. Your order is not submitted yet.',
      );
      return;
    }

    messengerTab.opener = null;

    showManualCopy(
      orderMessage,
      'Messenger opened. Review the conversation and order message. If Messenger did not prefill the message, copy it from below, paste it into Messenger, and press Send. Your order is not submitted until you send it.',
    );

    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(orderMessage).then(() => {
        if (status) {
          status.textContent =
            'Messenger opened and the order message was copied. Review the message there, paste it if needed, and press Send. Your order is not submitted until you send it.';
        }
      }).catch(() => {
        // The visible read-only field remains available as the manual-copy fallback.
      });
    }
  });

  const copyButton = document.querySelector('#copy-order-message');
  if (copyButton) {
    copyButton.addEventListener('click', copyOrderMessage);
  }
}

function bindCartActions() {
  document.addEventListener('click', (event) => {
    const addButton = event.target.closest('[data-add-to-cart]');

    if (addButton) {
      const id = addButton.dataset.addToCart;
      if (!catalog.some((product) => product.id === id)) return;

      cart[id] = (cart[id] || 0) + 1;
      saveCart();
      renderCart();

      addButton.textContent = 'Added to Bag ✓';
      window.setTimeout(() => {
        if (addButton.isConnected) addButton.textContent = 'Add to Cart +';
      }, 1200);
      return;
    }

    const quantityButton = event.target.closest('[data-quantity-change]');

    if (quantityButton) {
      const id = quantityButton.dataset.productId;
      const change = Number(quantityButton.dataset.quantityChange);
      const nextQuantity = (cart[id] || 0) + change;

      if (nextQuantity > 0) {
        cart[id] = nextQuantity;
      } else {
        delete cart[id];
      }

      saveCart();
      renderCart();
      return;
    }

    const removeButton = event.target.closest('[data-remove-item]');

    if (removeButton) {
      delete cart[removeButton.dataset.removeItem];
      saveCart();
      renderCart();
    }
  });
}

function bindMobileNavigation() {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if (!menuToggle || !nav) return;

  const closeMenu = () => {
    nav.classList.remove('menu-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
  };

  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('menu-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
}

setMessengerLinks();
renderCollection();
bindCartActions();
bindCheckout();
bindMobileNavigation();
renderCart();
updateFulfillmentFields();

const year = document.querySelector('#year');
if (year) year.textContent = String(new Date().getFullYear());
