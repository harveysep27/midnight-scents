// SET THIS before launch: your Facebook Page username (the part after facebook.com/).
// Example: if your page is facebook.com/mdnght.scents, enter 'mdnght.scents'.
const FACEBOOK_PAGE_USERNAME = '61587501380475';
const catalog = [
 {name:'Nacre',mood:'QUIET ELEGANCE',description:'Soft, intimate clean musk and delicate woods. Effortless and understated.',notes:'Soft musk · Powdery warmth · Gentle woods',tone:'cream'},
 {name:'Azure',mood:'THE FEELING OF ESCAPE',description:'Refreshing citrus and cool freshness, like a sunlit coastal morning.',notes:'Citrus · Cool freshness · Soft woods',tone:'blue'},
 {name:'Cairo',mood:'QUIET CONFIDENCE',description:'Fresh aromatics meet warm woods. Refined, modern, clean and magnetic.',notes:'Fresh aromatics · Warm woods · Musk',tone:'smoke'},
 {name:'Aurum',mood:'UNAPOLOGETIC ALLURE',description:'Addictive juicy sweetness and warm amber. Bold, playful and unforgettable.',notes:'Juicy fruit · Warm amber · Vanilla',tone:'amber'},
 {name:'Khesed',mood:'THE ART OF PRESENCE',description:'Bright citrus and aromatic warmth. Sophisticated and captivating.',notes:'Bright citrus · Aromatics · Warm woods',tone:'mint'},
 {name:'Dahlia',mood:'ROMANCE IN BLOOM',description:'Luscious fruits and velvety florals. Feminine, romantic and expressive.',notes:'Lush fruits · Velvety florals · Soft musk',tone:'rose'},
 {name:'Celeste',mood:'A SOFTER KIND OF STRENGTH',description:'Delicate florals and clean luminous musk. Radiant and graceful.',notes:'Delicate florals · Clean musk · Soft woods',tone:'lavender'}
];
const messengerUrl = () => FACEBOOK_PAGE_USERNAME && !FACEBOOK_PAGE_USERNAME.startsWith('YOUR_') ? `https://m.me/${FACEBOOK_PAGE_USERNAME}` : 'https://www.facebook.com/';
document.querySelectorAll('[data-messenger]').forEach(link => { link.href = messengerUrl(); link.target = '_blank'; link.rel = 'noopener'; });
const products = document.querySelector('#products');
if (products) products.innerHTML = catalog.map((p,i)=>`<article class="product"><div class="product-visual ${p.tone}"><div class="mini-bottle"><div class="mini-cap"></div><div class="mini-glass"><span>MDNGHT<br><small>SCENTS</small><b>${p.name.toUpperCase()}</b></span></div></div><span class="product-number">0${i+1}</span></div><div class="product-details"><p class="eyebrow">${p.mood}</p><h3>${p.name}</h3><p>${p.description}</p><p class="notes">${p.notes}</p><a class="order-link" data-messenger href="${messengerUrl()}" target="_blank" rel="noopener">ORDER NOW ↗</a></div></article>`).join('');
// Also bind messenger links added dynamically with the product cards.
if (products) products.querySelectorAll('[data-messenger]').forEach(link=>{link.href=messengerUrl();});
document.querySelector('#year').textContent = new Date().getFullYear();
const menu=document.querySelector('.menu-toggle'); if(menu) menu.addEventListener('click',()=>document.querySelector('.nav').classList.toggle('menu-open'));
