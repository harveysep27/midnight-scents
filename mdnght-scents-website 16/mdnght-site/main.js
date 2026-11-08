// Keep the existing Facebook Messenger ordering destination.
const FACEBOOK_PAGE_USERNAME = '61587501380475';

// Catalog images are served from the Vite public/images directory.
const catalog = [
  {
    name: 'Nacre',
    mood: 'QUIET ELEGANCE',
    description: 'Soft, intimate clean musk and delicate woods. Effortless and understated.',
    notes: 'Soft musk · Powdery warmth · Gentle woods',
    image: '/images/nacre.webp',
    size: '50ml',
    price: 675,
  },
  {
    name: 'Azure',
    mood: 'THE FEELING OF ESCAPE',
    description: 'Refreshing citrus and cool freshness, like a sunlit coastal morning.',
    notes: 'Citrus · Cool freshness · Soft woods',
    image: '/images/azure.webp',
    size: '50ml',
    price: 675,
  },
  {
    name: 'Cairo',
    mood: 'QUIET CONFIDENCE',
    description: 'Fresh aromatics meet warm woods. Refined, modern, clean and magnetic.',
    notes: 'Fresh aromatics · Warm woods · Musk',
    image: '/images/cairo.webp',
    size: '50ml',
    price: 675,
  },
  {
    name: 'Aurum',
    mood: 'UNAPOLOGETIC ALLURE',
    description: 'Addictive juicy sweetness and warm amber. Bold, playful and unforgettable.',
    notes: 'Juicy fruit · Warm amber · Vanilla',
    image: '/images/aurum.webp',
    size: '50ml',
    price: 675,
  },
  {
    name: 'Celeste',
    mood: 'A SOFTER KIND OF STRENGTH',
    description: 'Delicate florals and clean luminous musk. Radiant and graceful.',
    notes: 'Delicate florals · Clean musk · Soft woods',
    image: '/images/celeste.webp',
    size: '50ml',
    price: 675,
  },
  {
    name: 'Dahlia',
    mood: 'ROMANCE IN BLOOM',
    description: 'Luscious fruits and velvety florals. Feminine, romantic and expressive.',
    notes: 'Lush fruits · Velvety florals · Soft musk',
    image: '/images/dahlia.webp',
    size: '50ml',
    price: 675,
  },
  {
    name: 'Khesed',
    mood: 'THE ART OF PRESENCE',
    description: 'Bright citrus and aromatic warmth. Sophisticated and captivating.',
    notes: 'Bright citrus · Aromatics · Warm woods',
    image: '/images/khesed.webp',
    size: '50ml',
    price: 675,
  },
];

const messengerUrl = () => FACEBOOK_PAGE_USERNAME
  ? `https://m.me/${FACEBOOK_PAGE_USERNAME}`
  : 'https://www.facebook.com/';

const setMessengerLinks = () => {
  document.querySelectorAll('[data-messenger]').forEach((link) => {
    link.href = messengerUrl();
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  });
};

const renderCollection = () => {
  const products = document.querySelector('#products');

  if (!products) {
    console.error(
      'MDNGHT collection could not render: expected homepage container #products was not found.',
    );
    return;
  }

  products.innerHTML = catalog.map((product) => `
    <article class="product-card">
      <a
        class="product-photo"
        href="${messengerUrl()}"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Ask about ${product.name} on Facebook Messenger"
      >
        <img
          src="${product.image}"
          alt="${product.name} fragrance bottle"
          loading="lazy"
          decoding="async"
        >
      </a>
      <div class="product-info">
        <p class="product-mood">${product.mood}</p>
        <h3>${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <p class="product-notes">${product.notes}</p>
        <div class="product-meta">
          <span>${product.size} · ₱${product.price.toLocaleString('en-PH')}</span>
          <a
            class="button button-small"
            data-messenger
            href="${messengerUrl()}"
            target="_blank"
            rel="noopener noreferrer"
          >
            Order Now <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </article>
  `).join('');

  products.querySelectorAll('img').forEach((image) => {
    image.addEventListener('error', () => {
      console.error(`MDNGHT product image failed to load: ${image.getAttribute('src')}`);
    }, { once: true });
  });

  setMessengerLinks();

  const renderedCards = products.querySelectorAll('.product-card').length;
  if (renderedCards !== catalog.length) {
    console.error(
      `MDNGHT collection rendered ${renderedCards} cards; expected ${catalog.length}.`,
    );
  }
};

setMessengerLinks();
renderCollection();

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

if (menuToggle && nav) {
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
