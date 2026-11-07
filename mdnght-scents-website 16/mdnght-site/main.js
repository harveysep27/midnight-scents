// Keep the existing Facebook Messenger ordering destination.
const FACEBOOK_PAGE_USERNAME = '61587501380475';

// Keep catalog descriptions and fragrance notes from the existing site. Prices and
// sizes are intentionally unset until confirmed product details are provided.
const catalog = [
  { name: 'Nacre', mood: 'QUIET ELEGANCE', description: 'Soft, intimate clean musk and delicate woods. Effortless and understated.', notes: 'Soft musk · Powdery warmth · Gentle woods', image: '/images/nacre.png' },
  { name: 'Azure', mood: 'THE FEELING OF ESCAPE', description: 'Refreshing citrus and cool freshness, like a sunlit coastal morning.', notes: 'Citrus · Cool freshness · Soft woods', image: '/images/azure.png' },
  { name: 'Cairo', mood: 'QUIET CONFIDENCE', description: 'Fresh aromatics meet warm woods. Refined, modern, clean and magnetic.', notes: 'Fresh aromatics · Warm woods · Musk', image: '/images/cairo.png' },
  { name: 'Aurum', mood: 'UNAPOLOGETIC ALLURE', description: 'Addictive juicy sweetness and warm amber. Bold, playful and unforgettable.', notes: 'Juicy fruit · Warm amber · Vanilla', image: '/images/aurum.png' },
  { name: 'Khesed', mood: 'THE ART OF PRESENCE', description: 'Bright citrus and aromatic warmth. Sophisticated and captivating.', notes: 'Bright citrus · Aromatics · Warm woods', image: '/images/khesed.png' },
  { name: 'Dahlia', mood: 'ROMANCE IN BLOOM', description: 'Luscious fruits and velvety florals. Feminine, romantic and expressive.', notes: 'Lush fruits · Velvety florals · Soft musk', image: '/images/dahlia.png' },
  { name: 'Celeste', mood: 'A SOFTER KIND OF STRENGTH', description: 'Delicate florals and clean luminous musk. Radiant and graceful.', notes: 'Delicate florals · Clean musk · Soft woods', image: '/images/celeste.png' }
];

const messengerUrl = () => FACEBOOK_PAGE_USERNAME
  ? `https://m.me/${FACEBOOK_PAGE_USERNAME}`
  : 'https://www.facebook.com/';

document.querySelectorAll('[data-messenger]').forEach((link) => {
  link.href = messengerUrl();
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
});

const products = document.querySelector('#products');
if (products) {
  products.innerHTML = catalog.map((product) => {
    const details = [product.size, Number.isFinite(product.price) ? `₱${product.price.toLocaleString('en-PH')}` : null]
      .filter(Boolean);
    return `
      <article class="product-card">
        <a class="product-photo" href="${messengerUrl()}" target="_blank" rel="noopener noreferrer" aria-label="Ask about ${product.name} on Facebook Messenger">
          <img src="${product.image}" alt="${product.name} fragrance bottle" loading="lazy" decoding="async">
        </a>
        <div class="product-info">
          <p class="product-mood">${product.mood}</p>
          <h3>${product.name}</h3>
          <p class="product-description">${product.description}</p>
          <p class="product-notes">${product.notes}</p>
          <div class="product-meta">
            <span>${details.length ? details.join(' · ') : 'Price on request'}</span>
            <a class="button button-small" data-messenger href="${messengerUrl()}" target="_blank" rel="noopener noreferrer">Order Now <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </article>`;
  }).join('');
}

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
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
}
