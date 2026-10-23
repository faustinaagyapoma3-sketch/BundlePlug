const supportNumber = '0205424146';
const paystackPublicKey = 'pk_live_72f5b032d37d0ba8c5aa530e002d18149abb0367';
const supportEmail = 'support@bundleplug.shop';
const networks = {
  mtn: { name: 'MTN', short: 'M', accent: '#f4c400', count: 14, prices: [12.5,20,40,55,72,92,115,140,165,195,230] },
  telecel: { name: 'Telecel', short: 'T', accent: '#ef233c', count: 11, prices: [9.5,17,22,30,37,57,77,102,122,162,207] },
  airteltigo: { name: 'AirtelTigo', short: 'AT', accent: '#159bdb', count: 11, prices: [9.5,17,22,30,37,57,77,102,122,162,207] }
};
const sizes = [3,5,6,8,10,15,20,25,30,40,50];
const bundles = Object.entries(networks).flatMap(([key, network]) => sizes.map((size, i) => ({
  id: `${key}-${size}`,
  network: key,
  name: network.name,
  short: network.short,
  size,
  price: network.prices[i],
  validity: '90 days',
  popular: (key === 'mtn' && (size === 3 || size === 10)) || (key === 'telecel' && size === 10)
})));
const popular = [bundles.find(x=>x.id==='mtn-3'), bundles.find(x=>x.id==='mtn-5'), bundles.find(x=>x.id==='mtn-10'), bundles.find(x=>x.id==='telecel-10'), bundles.find(x=>x.id==='airteltigo-5'), bundles.find(x=>x.id==='telecel-5')];
let expanded = null;
const productRoute = () => location.pathname.includes('/products');
const homeHref = () => productRoute() ? '../#hero' : './#hero';
const sectionHref = id => productRoute() ? `../#${id}` : `#${id}`;
const productsHref = key => productRoute() ? `./?network=${key}` : `products/?network=${key}`;

const money = n => `₵${n.toFixed(2)}`;
const icon = (symbol, cls='') => `<span class="network-icon ${cls}">${symbol}</span>`;
function header() {
  return `<div class="topline"><span>⌁</span> Delivery: <strong>10min - 1hr</strong><span class="topline-right">◷ <strong>Open Now</strong></span></div>
  <header class="site-header"><a class="brand" href="${homeHref()}" aria-label="BundlePlug home"><span class="brand-mark"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg></span><span>BundlePlug</span></a><nav><a href="${sectionHref('hero')}">Home</a><a href="${sectionHref('buy-data')}">Buy Data</a><a href="${sectionHref('track')}">Track Order</a><a href="${sectionHref('about')}">About</a></nav><a class="button button-primary header-cta" href="${sectionHref('buy-data')}">Get Started</a><button class="mobile-menu" data-mobile-menu aria-label="Open navigation">☰</button></header><div class="mobile-nav"><a href="${sectionHref('hero')}">Home</a><a href="${sectionHref('buy-data')}">Buy Data</a><a href="${sectionHref('track')}">Track Order</a><a href="${sectionHref('about')}">About</a><a class="button button-primary" href="${sectionHref('buy-data')}">Get Started</a></div>`;
}
function footer() {
  return `<footer class="footer"><div class="footer-main"><div><a class="brand footer-brand" href="${homeHref()}"><span class="brand-mark"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg></span><span>BundlePlug</span></a><p>Fast, affordable data bundles for everyone. Get connected instantly with our reliable service.</p></div><div><h4>Quick Links</h4><a href="${sectionHref('hero')}">Home</a><a href="${sectionHref('buy-data')}">Buy Data</a><a href="${sectionHref('track')}">Track Order</a><a href="${sectionHref('about')}">About Us</a></div><div><h4>Support</h4><p>Get help with your bundle, delivery, payment, or order directly inside BundlePlug.</p><button class="link-button" data-support>Message support</button><a href="mailto:${supportEmail}">${supportEmail}</a><a href="https://wa.me/233205424146" target="_blank" rel="noreferrer">WhatsApp: ${supportNumber}</a></div><div><h4>Location</h4><p>Accra, Ghana</p><p>In-app support is available whenever you need it.</p></div></div><div class="footer-bottom"><span>© 2026 BundlePlug. All rights reserved.</span><span><a href="${productRoute() ? '../privacy' : './privacy'}">Privacy Policy</a><a href="${productRoute() ? '../terms' : './terms'}">Terms of Service</a></span></div></footer><a class="whatsapp" href="https://wa.me/233205424146" target="_blank" rel="noopener noreferrer" aria-label="Chat with BundlePlug on WhatsApp"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 4.5a11.4 11.4 0 0 0-9.8 17.2L4.6 27.5l6-1.5A11.5 11.5 0 1 0 16 4.5Z" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M11.8 11.4c.3-.7.7-.7 1.1-.7h.8c.3 0 .6.1.7.5l.9 2.1c.1.3.1.5-.1.8l-.7.9c-.2.2-.2.4 0 .7.7 1.2 1.6 2.1 2.8 2.7.3.2.5.1.7-.1l.9-1.1c.2-.2.5-.3.8-.2l2 .9c.3.1.4.3.4.6 0 .7-.3 1.6-.8 2-.5.4-1.2.6-1.9.4-1.5-.4-3.2-1.3-4.7-2.7-1.4-1.3-2.5-2.9-3.1-4.4-.3-.8-.2-1.7.2-2.2Z" fill="currentColor"/></svg></a>`;
}
function purchaseForm(bundle) {
  const isOpen = expanded === bundle.id;
  return `<div class="purchase-area ${isOpen ? 'is-open' : ''}"><button class="button buy-button" data-expand="${bundle.id}">🛒&nbsp; Buy Now</button>${isOpen ? `<form class="purchase-form" data-form="${bundle.id}"><label>Your Name<input name="name" placeholder="Enter your name" autocomplete="name" required /></label><label>Phone Number<input name="phone" placeholder="024XXXXXXXX" inputmode="tel" autocomplete="tel" required /></label><label>Email for receipt<input name="email" type="email" placeholder="you@example.com" autocomplete="email" required /></label><small>Data will be delivered to this number. Email is used for your Paystack receipt.</small><button class="button payment-button" type="submit">Pay ${money(bundle.price)} with Paystack</button><p class="form-feedback" aria-live="polite"></p></form>` : ''}</div>`;
}
function card(bundle, compact=false) {
  const expandedLabel = expanded === bundle.id ? 'Close bundle details' : 'Show bundle details';
  return `<article class="bundle-card ${compact ? 'compact' : ''} ${expanded === bundle.id ? 'is-expanded' : ''}" data-id="${bundle.id}"><div class="card-top">${icon(bundle.short, `network-${bundle.network}`)}<button class="card-menu" data-expand="${bundle.id}" aria-label="${expandedLabel}" type="button">⌄</button></div><h3>${bundle.size}GB</h3><p class="bundle-network">${bundle.name}${compact ? '' : ' Bundle'}</p><div class="bundle-card-footer"><div class="price-row"><strong>${money(bundle.price)}</strong><span>${bundle.validity}</span></div>${purchaseForm(bundle)}</div>${bundle.popular ? '<span class="popular-badge">Popular</span>' : ''}</article>`;
}
function hero() {
  return `<section id="hero" class="hero"><div class="hero-copy"><span class="eyebrow">ϟ Instant Delivery</span><h1>Get Connected<br /><span>In Seconds</span></h1><p>Fast, affordable data bundles for all networks. No waiting. No hassle. Just instant connectivity at unbeatable prices.</p><div class="trust-panel"><span class="trust-label">WHY CUSTOMERS CHOOSE BUNDLEPLUG</span><div class="trust-items"><span><i class="trust-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z"/><circle cx="12" cy="10" r="2.4"/></svg></i><b>Serving customers<br />across Ghana</b></span><span><i class="trust-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 7 4v5c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V7l7-4Z"/><path d="m9 12 2 2 4-4"/></svg></i><b>Trusted by 5,000+<br />users in Ghana</b></span><span><i class="trust-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.8 9.3a11 11 0 0 1 14.4 0M7.8 13a6.5 6.5 0 0 1 8.4 0M10.7 16.7a2.2 2.2 0 0 1 2.6 0"/></svg></i><b>MTN, Telecel &<br />AirtelTigo</b></span></div></div><div class="hero-actions"><a class="button button-primary" href="#buy-data">Shop Now&nbsp; →</a><a class="button button-light" href="#track">Track Order</a></div></div><div class="hero-art"><img src="https://bundleplug.shop/manus-storage/product-showcase_34334b6a.png" alt="Data bundles showcase" /><span class="hero-chip delivery-chip">10-60min<br /><small>Delivery time</small></span><span class="hero-chip secure-chip">100%<br /><small>Secure</small></span></div></section>`;
}
function networksSection() {
  return `<section id="buy-data" class="section network-section"><div class="section-heading"><span class="section-kicker">NETWORKS</span><h2>Choose Your Network</h2><p>Select your network provider and browse available data bundles</p></div><div class="network-grid">${Object.entries(networks).map(([key,n])=>`<a class="network-choice network-choice-${key}" href="${productsHref(key)}" aria-label="Open ${n.name} bundles">${icon(n.short, `network-${key}`)}<span><strong>${n.name}</strong><small>${n.count} available bundles</small></span><span class="network-action">View Bundles <span aria-hidden="true">›</span></span></a>`).join('')}</div></section>`;
}
function popularSection() {
  return `<section id="popular" class="section popular-section"><div class="section-heading row-heading"><div><span class="section-kicker">DATA BUNDLES SHOWCASE</span><h2>Popular Bundles</h2><p>Our most purchased data bundles at unbeatable prices</p></div><div class="filter-pills"><button class="active" data-pop-filter="all">All</button><button data-pop-filter="mtn">MTN</button><button data-pop-filter="telecel">Telecel</button><button data-pop-filter="airteltigo">AirtelTigo</button></div></div><div class="bundle-grid popular-grid" id="popular-grid">${popular.map(x=>card(x,true)).join('')}</div></section>`;
}
function reliability() {
  const features = [['https://bundleplug.shop/manus-storage/speed-illustration_93000f91.png','Lightning Fast','Get your data delivered in 10-60 minutes. No long waits, no delays.'],['https://bundleplug.shop/manus-storage/security-illustration_3795f7f0.png','100% Secure','Your payment and data are protected with industry-leading security.'],['◷','24/7 Available','Buy data anytime, anywhere. We\'re always here for you.'],['✦','Expert Support','Our friendly team is ready to help with any questions or issues.']];
  return `<section id="about" class="section reliability"><div class="section-heading centered"><span class="section-kicker">WHY CHOOSE US</span><h2>Built for Reliability</h2><p>We're committed to providing the best data bundle experience with reliability, speed, and exceptional service.</p></div><div class="feature-grid">${features.map(([visual,title,copy])=>`<div class="feature-card">${visual.startsWith('http') ? `<img src="${visual}" alt="${title}" />` : `<span class="feature-icon">${visual}</span>`}<h3>${title}</h3><p>${copy}</p></div>`).join('')}</div></section>`;
}
function tracker() {
  return `<section id="track" class="section tracker"><div class="tracker-card"><div class="tracker-copy"><span class="section-kicker">ORDER TRACKING</span><h2>Track Your Order</h2><p>Check the status of your data bundle delivery in real-time</p><div class="track-tabs"><button class="active">Phone</button><button>Reference</button><button>Trans. ID</button></div><div class="track-input"><input placeholder="Enter phone number (e.g., 0241234567)" /><button class="button button-primary" data-track>Track Order</button></div></div><div class="status-guide"><h3>Order Status Guide</h3><div><span class="status-dot pending"></span><p><b>Pending</b><small>Order received, waiting to be processed</small></p></div><div><span class="status-dot processing"></span><p><b>Processing</b><small>Your data is being sent to the network. It changes to delivered after 30 minutes when you track again.</small></p></div><div><span class="status-dot delivered"></span><p><b>Delivered</b><small>Data delivered successfully! This completed status stays permanent.</small></p></div><div><span class="status-dot failed"></span><p><b>Failed</b><small>Something went wrong - contact support</small></p></div></div></div><p class="delivery-note"><b>Delivery Time:</b> Your order is being processed and delivered successfully within 10 minutes to 1 hour. It may be delayed if there are a lot of traffic on the orders being made by users.</p></section>`;
}
function finalCta() { return `<section class="final-cta"><div><span class="section-kicker">READY WHEN YOU ARE</span><h2>Ready to Get Connected?</h2><p>Choose your network and buy data in seconds. Fast delivery, great prices, and reliable service.</p></div><div><a class="button button-primary" href="#buy-data">Buy Data Now</a><button class="button button-light" data-support>Message Support</button></div></section>`; }
 function home() { return `${header()}<main>${hero()}${networksSection()}${popularSection()}${reliability()}${tracker()}${finalCta()}</main>${footer()}`; }
function products() {
  const params = new URLSearchParams(location.search); const active = params.get('network') || 'all';
  return `${header()}<main class="products-page catalog-view"><a class="back-link" href="${homeHref()}">← Back to Home</a><div class="products-heading"><div><h1>Data Bundles</h1><p>Choose your bundle and get data instantly</p></div></div><div class="catalog-toolbar"><div class="search-box">⌕<input id="search" placeholder="Search bundles..." /></div><div class="toolbar-row"><div class="filter-pills" id="network-filters"><button data-network="all" class="${active==='all'?'active':''}">All Networks</button><button data-network="mtn" class="${active==='mtn'?'active':''}">MTN</button><button data-network="telecel" class="${active==='telecel'?'active':''}">Telecel</button><button data-network="airteltigo" class="${active==='airteltigo'?'active':''}">AirtelTigo</button></div><select id="sort"><option value="price-asc">Price: Low to High</option><option value="price-desc">Price: High to Low</option><option value="size-asc">Size: Small to Large</option><option value="size-desc">Size: Large to Small</option></select></div><div class="catalog-meta"><span id="bundle-count"></span><span class="tag">ϟ Fast delivery</span><span class="tag green">◉ Secure</span></div></div><div class="notice"><b>Note:</b> Please verify your phone number before purchase. Data is delivered within 10 minutes to 1 hour.</div><div class="bundle-grid catalog-grid" id="catalog-grid"></div></main>${footer()}`;
}
function render() { expanded = null; document.getElementById('app').innerHTML = productRoute() ? products() : home(); bind(); if (productRoute()) updateCatalog(); }
function startPaystackCheckout(form, bundle, feedback) {
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const phone = form.phone.value.replace(/\D/g, '');
  if (phone.length < 10) { feedback.textContent='Please enter a valid Ghana phone number.'; feedback.className='form-feedback error'; return; }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { feedback.textContent='Please enter a valid email for your Paystack receipt.'; feedback.className='form-feedback error'; return; }
  if (!window.Paystack) { feedback.textContent='Paystack checkout could not load. Please refresh and try again.'; feedback.className='form-feedback error'; return; }
  feedback.textContent='Opening secure Paystack checkout…'; feedback.className='form-feedback';
  const popup = new window.Paystack();
  popup.checkout({
    key: paystackPublicKey,
    email,
    amount: Math.round(bundle.price * 100),
    currency: 'GHS',
    firstName: name,
    phone,
    reference: `BUNDLE-${bundle.id}-${Date.now()}`,
    metadata: { bundle: `${bundle.size}GB ${bundle.name}`, delivery_phone: phone, customer_name: name },
    onSuccess: transaction => { feedback.textContent=`Payment completed. Reference: ${transaction.reference || transaction.trxref || 'received'}.`; feedback.className='form-feedback success'; },
    onCancel: () => { feedback.textContent='Payment cancelled. Your bundle has not been delivered.'; feedback.className='form-feedback error'; },
    onError: error => { feedback.textContent=error?.message || 'Paystack could not start this payment. Please try again.'; feedback.className='form-feedback error'; }
  });
}
function bind() {
  document.querySelectorAll('[data-expand]').forEach(btn=>btn.addEventListener('click',()=>{ expanded = expanded === btn.dataset.expand ? null : btn.dataset.expand; const el=document.querySelector(`[data-id="${btn.dataset.expand}"]`); if (el) { const cardData=bundles.find(x=>x.id===btn.dataset.expand); const keepCatalogStyle=Boolean(el.closest('.popular-grid')); el.outerHTML=card(cardData, keepCatalogStyle); bind(); const opened=document.querySelector(`[data-id="${btn.dataset.expand}"]`); opened?.scrollIntoView({block:'nearest',behavior:'smooth'}); } }));
  document.querySelectorAll('[data-form]').forEach(form=>form.addEventListener('submit', e=>{e.preventDefault(); const feedback=form.querySelector('.form-feedback'); const bundle=bundles.find(x=>x.id===form.dataset.form); if(bundle) startPaystackCheckout(form,bundle,feedback);}));
  document.querySelectorAll('[data-support]').forEach(btn=>btn.addEventListener('click',()=>window.open('https://wa.me/233205424146','_blank','noopener')));
  document.querySelector('[data-mobile-menu]')?.addEventListener('click',()=>document.querySelector('.mobile-nav')?.classList.toggle('is-open'));
  document.querySelectorAll('[data-pop-filter]').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('[data-pop-filter]').forEach(x=>x.classList.remove('active'));btn.classList.add('active'); const key=btn.dataset.popFilter; document.getElementById('popular-grid').innerHTML=popular.filter(x=>key==='all'||x.network===key).map(x=>card(x,true)).join(''); bind();}));
  document.querySelectorAll('[data-network]').forEach(btn=>btn.addEventListener('click',()=>{const params=new URLSearchParams(location.search); params.set('network',btn.dataset.network); history.pushState({},'',`/products?${params}`); document.querySelectorAll('[data-network]').forEach(x=>x.classList.toggle('active',x===btn)); updateCatalog();}));
  document.getElementById('search')?.addEventListener('input',updateCatalog); document.getElementById('sort')?.addEventListener('change',updateCatalog);
  document.querySelectorAll('.track-tabs button').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.track-tabs button').forEach(x=>x.classList.remove('active'));btn.classList.add('active');}));
  document.querySelector('[data-track]')?.addEventListener('click',()=>{const input=document.querySelector('.track-input input'); const note=document.querySelector('.delivery-note'); note.innerHTML=input.value.trim()?'<b>Order status:</b> We could not find a live order in this test preview. Please check the number and try again.':'<b>Enter your phone number</b> to look up an order.';});
}
function updateCatalog(){ const params=new URLSearchParams(location.search); const network=params.get('network')||'all'; const query=(document.getElementById('search')?.value||'').toLowerCase(); const sort=document.getElementById('sort')?.value||'price-asc'; let list=bundles.filter(x=>(network==='all'||x.network===network)&&(`${x.size}gb ${x.name}`.toLowerCase().includes(query))); list.sort((a,b)=>sort==='price-desc'?b.price-a.price:sort==='size-asc'?a.size-b.size:sort==='size-desc'?b.size-a.size:a.price-b.price); const grid=document.getElementById('catalog-grid'); if(!grid)return; grid.innerHTML=list.map(x=>card(x)).join(''); document.getElementById('bundle-count').textContent=`${list.length} bundles`; bind(); }
window.addEventListener('popstate',render); render();
