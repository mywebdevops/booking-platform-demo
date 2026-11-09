// Booking page. Vanilla JS, no dependencies.
// Service and business data lives in scraper-schema.json and is mirrored below
// as a fallback so the page also works when opened from the filesystem.
'use strict';

const FALLBACK = {
  gallery: [
    ['https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1400&q=80','Sage & Stone Salon — salon interior'],
    ['https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1400&q=80','Styling stations'],
    ['https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=1400&q=80','Hair styling in progress'],
    ['https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1400&q=80','Finished hair colour work'],
    ['https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=1400&q=80','Salon detail'],
    ['https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1400&q=80','Wash and style area']
  ],
  services: [
    {id:'consultation',name:'Consultation',durationMinutes:15,priceLabel:'Free',bufferMinutes:15,description:'Free consultation with Nicolas to discuss your hair history, options and pricing.'},
    {id:'shampoo-style',name:'shampoo & style',durationMinutes:45,priceLabel:'$110',bufferMinutes:15,description:'Shampoo and blow-dry style.'},
    {id:'highlights-balayage',name:'highlights, balayage, ombré, baby lights',durationMinutes:120,priceLabel:'$210',bufferMinutes:30,description:'Highlights, balayage, ombré or baby lights, finished with a gloss.'},
    {id:'hair-extensions',name:'hair extensions',durationMinutes:120,priceLabel:'$2,600',bufferMinutes:30,description:'Extension fitting for added length and volume. A consultation is recommended first.'},
    {id:'root-touch-up',name:'root touch-up',durationMinutes:60,priceLabel:'$110',bufferMinutes:15,description:'Colour applied to the roots to cover regrowth.'},
    {id:'mens-haircut',name:'mens haircut',durationMinutes:30,priceLabel:'$45',bufferMinutes:15,description:"Men's haircut, finished with styling."},
    {id:'brazilian-blowout',name:'brazilian blowout',durationMinutes:150,priceLabel:'$399',bufferMinutes:30,description:'Smoothing treatment to reduce frizz.'},
    {id:'extension-install',name:'extension Install',durationMinutes:120,priceLabel:'$1,500',bufferMinutes:30,description:'Fitting of extension wefts, cut and styled to finish.'},
    {id:'hair-restoration',name:'hair restoration treatment',durationMinutes:120,priceLabel:'$1,399',bufferMinutes:30,description:'Treatment for damaged or thinning hair.'},
    {id:'short-permanent-curl',name:'short permanent curl',durationMinutes:90,priceLabel:'$110',bufferMinutes:15,description:'Permanent curl for short hair.'},
    {id:'mini-move-up',name:'mini move up',durationMinutes:30,priceLabel:'$50',bufferMinutes:15,description:'Maintenance appointment to move up extension rows between full fittings.'},
    {id:'haircut-style',name:'haircut & style',durationMinutes:45,priceLabel:'$110',bufferMinutes:15,description:'Haircut finished with a blow-dry style.'}
  ]
};

const BUSINESSES = {
  sageandstonesalon: {
    slug: 'sageandstonesalon',
    name: 'Sage & Stone Salon',
    defaultClaimed: true,
    phone: '(480) 555-0119',
    hours: 'Mon–Sat 9:00 AM – 6:00 PM',
    email: 'hello@sageandstone.example',
    instagram: '@sageandstonesalon',
    about: 'Sage & Stone Salon is a salon in Downtown Phoenix. Services include haircuts, colour, extensions and treatments. Appointments are with Nicolas.',
    addressStreet: '100 N 3rd St, Ste 100',
    addressFull: '100 N 3rd St, Ste 100, Downtown Phoenix, AZ 85004',
    addressLinesHtml: '100 N 3rd St, Ste 100,<br>Downtown Phoenix, AZ 85004',
    mapEmbedUrl: 'https://www.google.com/maps?q=100%20N%203rd%20St%2C%20Ste%20100%2C%20Phoenix%2C%20AZ%2085004&output=embed',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=100+N+3rd+St+Ste+100+Phoenix+AZ+85004',
    staffName: 'Nicolas',
    staffRole: 'Stylist',
    staffInitial: 'N',
    logoText: 'A',
    ratingSummary: '★★★★★ <strong>5.0</strong> · 2 reviews · Phoenix, AZ',
    sidebarRating: '★★★★★ 5.0 (2) · Phoenix, AZ',
    gallery: FALLBACK.gallery,
    services: FALLBACK.services
  },
  desertbloombarbers: {
    slug: 'desertbloombarbers',
    name: 'Desert Bloom Barbers',
    defaultClaimed: false,
    phone: '(602) 555-0147',
    hours: 'Tue–Sat 9:00 AM – 6:00 PM',
    email: '',
    instagram: '@desertbloombarbers',
    about: 'Desert Bloom Barbers is a barbershop on Roosevelt Row in Phoenix, AZ offering haircuts, beard trims and hot towel shaves. Sample data only — fictional business.',
    addressStreet: '214 E Roosevelt St',
    addressFull: '214 E Roosevelt St, Phoenix, AZ 85004',
    addressLinesHtml: '214 E Roosevelt St,<br>Phoenix, AZ 85004',
    mapEmbedUrl: 'https://www.google.com/maps?q=214%20E%20Roosevelt%20St%2C%20Phoenix%2C%20AZ%2085004&output=embed',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=214+E+Roosevelt+St+Phoenix+AZ+85004',
    staffName: 'Marco',
    staffRole: 'Barber',
    staffInitial: 'M',
    logoText: 'D',
    ratingSummary: 'Phoenix, AZ · Sample profile',
    sidebarRating: 'Phoenix, AZ · Sample profile',
    gallery: [
      ['https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1400&q=80','Desert Bloom Barbers — barber chairs'],
      ['https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1400&q=80','Classic haircut and trim'],
      ['https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1400&q=80','Barbershop station']
    ],
    services: [
      {id:'db-haircut',name:'Haircut',durationMinutes:30,priceLabel:'$35',bufferMinutes:15,description:'Standard haircut and style.'},
      {id:'db-beard-trim',name:'Beard trim',durationMinutes:20,priceLabel:'$20',bufferMinutes:15,description:'Beard shaping, trim and line-up.'},
      {id:'db-hot-towel-shave',name:'Hot towel shave',durationMinutes:45,priceLabel:'$40',bufferMinutes:15,description:'Traditional straight-razor shave with hot towel.'},
      {id:'db-haircut-beard',name:'Haircut & beard trim',durationMinutes:50,priceLabel:'$50',bufferMinutes:15,description:'Full haircut and beard trim.'}
    ]
  }
};

let DATA = FALLBACK;
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const state = {
  activeBusiness: 'sageandstonesalon',
  pendingClaimSlug: null,
  service: null,
  dayOffset: 0,
  slot: null,
  social: null,
  carousel: 0,
  staffFilter: false,
  lastFocus: null,
  callTimers: [],
  textCloseTimer: null
};

/* ---------- accounts & social sign-in ----------
   mode 'test' (default): sign-in redirects to auth-test.html, a local page
   that plays the provider's part (consent screen, then back with a code).
   It never asks for a provider password and no provider is contacted.
   mode 'live': a provider with a clientId set redirects to that provider's
   real OAuth consent screen and returns here with ?code=. Exchanging that
   code for a profile needs a small backend (client secrets cannot live in
   front-end code) — see README, "Going live". */
const AUTH_CONFIG = {
  mode: 'test',
  testPage: 'auth-test.html',
  providers: {
    Google:    { clientId: '', authUrl: 'https://accounts.google.com/o/oauth2/v2/auth', scope: 'openid email profile' },
    Instagram: { clientId: '', authUrl: 'https://api.instagram.com/oauth/authorize', scope: 'user_profile' },
    TikTok:    { clientId: '', authUrl: 'https://www.tiktok.com/v2/auth/authorize/', scope: 'user.info.basic' }
  }
};
const ACCOUNTS_KEY = 'booking.accounts';
const SESSION_KEY = 'booking.session';
const PROVIDERS_KEY = 'booking.providers';
const PROVIDER_SESSION_KEY = 'booking.providerSession';
const CLAIMS_KEY = 'booking.claims';
const BUSINESS_EDITS_KEY = 'booking.businessEdits';
const OUTREACH_KEY = 'booking.outreach';
const NOTIFY_KEY = 'booking.notifyRequests';

function loadJSON(key, fallback){
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch(_) { return fallback; }
}
function saveJSON(key, value){
  try { localStorage.setItem(key, JSON.stringify(value)); } catch(_) { /* storage unavailable (private mode etc.) */ }
}

/* ---------- customer account state ---------- */
function currentAccount(){
  const session = loadJSON(SESSION_KEY, null);
  if(!session || session.accountId == null) return null;
  const accounts = loadJSON(ACCOUNTS_KEY, []);
  if(!Array.isArray(accounts)) return null;
  return accounts.find(a => a && a.id === session.accountId) || null;
}
function renderAccount(){
  const bar = $('#accountBar'); if(!bar) return;
  const acct = currentAccount();
  if(!acct){
    bar.innerHTML = '<span>Not signed in</span>';
    return;
  }
  bar.innerHTML = '';
  const txt = document.createElement('span');
  txt.textContent = `Signed in as ${acct.name} · Account #${acct.id} · via ${acct.provider}${acct.testMode ? ' (test mode)' : ''}`;
  const btn = document.createElement('button');
  btn.type = 'button'; btn.className = 'btn-outline small'; btn.textContent = 'Sign out';
  btn.onclick = signOut;
  bar.append(txt, btn);
}
function reflectSignIn(){
  const acct = currentAccount();
  state.social = acct ? acct.provider : null;
  $$('[data-social]').forEach(x => {
    const active = !!acct && x.dataset.social === acct.provider;
    x.classList.toggle('verified', active);
    x.setAttribute('aria-pressed', String(active));
  });
  $('#socialStatus').textContent = acct
    ? `Signed in with ${acct.provider} as ${acct.name} (Account #${acct.id}).`
    : 'Sign in with one of the above, or enter your name and phone below.';
  const nameInput = $('#guestName');
  if(nameInput){
    if(acct && (!nameInput.value || nameInput.dataset.autofilled === 'true')){
      nameInput.value = acct.name;
      nameInput.dataset.autofilled = 'true';
    } else if(!acct && nameInput.dataset.autofilled === 'true'){
      nameInput.value = '';
      delete nameInput.dataset.autofilled;
    }
  }
  renderAccount();
  renderClaimNotifyBanner();
}
function signOut(){
  try { localStorage.removeItem(SESSION_KEY); } catch(_) {}
  reflectSignIn();
}

/* ---------- provider account state (Part 1) ---------- */
function currentProvider(){
  const session = loadJSON(PROVIDER_SESSION_KEY, null);
  if(!session || session.providerId == null) return null;
  const providers = loadJSON(PROVIDERS_KEY, []);
  if(!Array.isArray(providers)) return null;
  return providers.find(p => p && p.id === session.providerId) || null;
}
function providerSignOut(){
  try { localStorage.removeItem(PROVIDER_SESSION_KEY); } catch(_) {}
  state.pendingClaimSlug = null;
  renderProviderDashboard();
}

/* ---------- business data, claims & edits (Part 1 & Part 2) ---------- */
function isBusinessClaimed(slug){
  const base = BUSINESSES[slug];
  if(!base) return false;
  if(base.defaultClaimed) return true;
  const claims = loadJSON(CLAIMS_KEY, {});
  return !!(claims && claims[slug] && claims[slug].claimed);
}
function getBusinessClaim(slug){
  const claims = loadJSON(CLAIMS_KEY, {});
  return (claims && claims[slug]) || null;
}
function getBusiness(slug){
  const base = BUSINESSES[slug] || BUSINESSES.sageandstonesalon;
  const editsMap = loadJSON(BUSINESS_EDITS_KEY, {});
  const edits = (editsMap && editsMap[base.slug]) || {};
  const name = (edits.name && edits.name.trim()) ? edits.name.trim() : base.name;
  const phone = (edits.phone && edits.phone.trim()) ? edits.phone.trim() : base.phone;
  const hours = (edits.hours && edits.hours.trim()) ? edits.hours.trim() : base.hours;
  const phoneDigits = phone.replace(/[^\d+]/g, '');
  const phoneHref = phoneDigits ? `tel:${phoneDigits.startsWith('+') ? phoneDigits : '+1' + phoneDigits.replace(/^1/, '')}` : 'tel:+10000000000';
  return {
    ...base,
    name,
    phone,
    hours,
    phoneHref,
    claimed: isBusinessClaimed(base.slug)
  };
}

/* ---------- auth initiation & callback (customer & provider) ---------- */
function startSignIn(provider, role = 'customer'){
  if(!Object.prototype.hasOwnProperty.call(AUTH_CONFIG.providers, provider)) return;
  if(role === 'customer'){
    const acct = currentAccount();
    if(acct && acct.provider === provider){ signOut(); return; }
  }
  const cfg = AUTH_CONFIG.providers[provider] || {};
  const nonce = Math.random().toString(36).slice(2) + Date.now().toString(36);
  const pageUrl = location.href.split('?')[0].split('#')[0];
  try {
    sessionStorage.setItem('booking.pendingAuth', JSON.stringify({
      provider,
      state: nonce,
      role,
      activeBusiness: state.activeBusiness,
      pendingClaimSlug: state.pendingClaimSlug,
      serviceId: role === 'customer' && state.service ? state.service.id : null
    }));
  } catch(_) {}
  if(AUTH_CONFIG.mode === 'live' && cfg.clientId){
    const u = new URL(cfg.authUrl);
    u.searchParams.set('client_id', cfg.clientId);
    u.searchParams.set('redirect_uri', pageUrl);
    u.searchParams.set('response_type', 'code');
    u.searchParams.set('scope', cfg.scope);
    u.searchParams.set('state', nonce);
    location.href = u.toString();
    return;
  }
  const t = new URL(AUTH_CONFIG.testPage, pageUrl);
  t.searchParams.set('provider', provider);
  t.searchParams.set('state', nonce);
  if(role === 'provider') t.searchParams.set('role', 'provider');
  t.searchParams.set('redirect', pageUrl);
  location.href = t.toString();
}

function handleAuthCallback(){
  const params = new URLSearchParams(location.search);
  if(!params.has('auth')) return;
  let pending = null;
  try { pending = JSON.parse(sessionStorage.getItem('booking.pendingAuth') || 'null'); } catch(_) {}
  try { sessionStorage.removeItem('booking.pendingAuth'); } catch(_) {}
  history.replaceState(null, '', location.href.split('?')[0].split('#')[0]);
  if(pending && pending.activeBusiness && BUSINESSES[pending.activeBusiness]){
    state.activeBusiness = pending.activeBusiness;
  }
  const provider = params.get('provider');
  const role = params.get('role') || (pending && pending.role) || 'customer';
  if(params.get('auth') !== 'ok' || !provider) return;
  if(!Object.prototype.hasOwnProperty.call(AUTH_CONFIG.providers, provider)) return;
  if(!pending || !pending.state || pending.state !== params.get('state') || pending.provider !== provider) return;

  const name = (params.get('name') || 'Guest').trim() || 'Guest';
  const handle = (params.get('handle') || name).trim().toLowerCase();

  if(role === 'provider'){
    const rawProviders = loadJSON(PROVIDERS_KEY, []);
    const providers = Array.isArray(rawProviders) ? rawProviders : [];
    let prov = providers.find(p => p && p.provider === provider && p.handle === handle);
    if(!prov){
      prov = {
        id: providers.length + 1,
        provider,
        name,
        handle,
        role: 'provider',
        createdAt: new Date().toISOString(),
        testMode: AUTH_CONFIG.mode !== 'live'
      };
      providers.push(prov);
      saveJSON(PROVIDERS_KEY, providers);
    } else if(prov.name !== name){
      prov.name = name;
      saveJSON(PROVIDERS_KEY, providers);
    }
    saveJSON(PROVIDER_SESSION_KEY, { providerId: prov.id, signedInAt: new Date().toISOString() });
    if(pending && pending.pendingClaimSlug){
      state.pendingClaimSlug = pending.pendingClaimSlug;
      state.activeBusiness = pending.pendingClaimSlug;
    }
    $('#providerDashboard').hidden = false;
    renderProviderDashboard();
    return;
  }

  const rawAccounts = loadJSON(ACCOUNTS_KEY, []);
  const accounts = Array.isArray(rawAccounts) ? rawAccounts : [];
  let acct = accounts.find(a => a && a.provider === provider && a.handle === handle);
  if(!acct){
    acct = { id: accounts.length + 1, provider, name, handle,
             createdAt: new Date().toISOString(), testMode: AUTH_CONFIG.mode !== 'live' };
    accounts.push(acct);
    saveJSON(ACCOUNTS_KEY, accounts);
  } else if(acct.name !== name){
    acct.name = name;
    saveJSON(ACCOUNTS_KEY, accounts);
  }
  saveJSON(SESSION_KEY, { accountId: acct.id, signedInAt: new Date().toISOString() });
  reflectSignIn();
  if(pending && pending.serviceId){
    const biz = getBusiness(state.activeBusiness);
    const svc = biz.services.find(s => s.id === pending.serviceId);
    if(svc) openBooking(svc);
  }
}

/* ---------- provider dashboard & claim flow (Part 1 & Part 2) ---------- */
function populateProviderForm(slug){
  const targetSlug = BUSINESSES[slug] ? slug : state.activeBusiness;
  const biz = getBusiness(targetSlug);
  $('#providerBizSelect').value = targetSlug;
  $('#providerBizName').value = biz.name;
  $('#providerBizPhone').value = biz.phone;
  $('#providerBizHours').value = biz.hours;
  $('#providerSaveStatus').textContent = '';
}

function renderProviderDashboard(){
  const prov = currentProvider();
  const signInView = $('#providerSignInView');
  const accountView = $('#providerAccountView');
  const claimPrompt = $('#providerClaimPrompt');
  const claimConfirmBox = $('#claimConfirmBox');

  if(!prov){
    signInView.hidden = false;
    accountView.hidden = true;
    if(state.pendingClaimSlug){
      const targetBiz = getBusiness(state.pendingClaimSlug);
      $('#providerClaimTargetName').textContent = targetBiz.name;
      $('#providerClaimTargetSlug').textContent = `${targetBiz.slug}.bastapapi.com`;
      claimPrompt.hidden = false;
    } else {
      claimPrompt.hidden = true;
    }
    return;
  }

  signInView.hidden = true;
  accountView.hidden = false;
  $('#providerStatusText').textContent = `Provider signed in as ${prov.name} · Provider #${prov.id} · via ${prov.provider}${prov.testMode ? ' (test mode)' : ''}`;

  if(state.pendingClaimSlug && !isBusinessClaimed(state.pendingClaimSlug)){
    const targetBiz = getBusiness(state.pendingClaimSlug);
    $('#claimConfirmText').innerHTML = `Confirm claim for <strong>${escapeHtml(targetBiz.name)}</strong> (<code>${escapeHtml(targetBiz.slug)}.bastapapi.com</code>) under provider account <strong>${escapeHtml(prov.name)}</strong>?`;
    claimConfirmBox.hidden = false;
  } else {
    claimConfirmBox.hidden = true;
  }

  const dbClaim = getBusinessClaim('desertbloombarbers');
  const dbBiz = getBusiness('desertbloombarbers');
  const sageBiz = getBusiness('sageandstonesalon');
  const summaryEl = $('#providerBusinessSummary');

  if(dbBiz.claimed){
    const claimNote = dbClaim && dbClaim.providerName ? ` (claimed by ${escapeHtml(dbClaim.providerName)})` : '';
    summaryEl.innerHTML = `<strong>Claimed businesses:</strong> <span>${escapeHtml(dbBiz.name)} (<code>${dbBiz.slug}.bastapapi.com</code>)${claimNote}</span> · <span>${escapeHtml(sageBiz.name)} (<code>${sageBiz.slug}.bastapapi.com</code>)</span>`;
  } else {
    summaryEl.innerHTML = `<strong>Your business:</strong> No unclaimed profile claimed yet. <span>${escapeHtml(dbBiz.name)} (<code>${dbBiz.slug}.bastapapi.com</code>) is currently <strong>Unclaimed</strong>.</span> `;
    const claimNowBtn = document.createElement('button');
    claimNowBtn.type = 'button';
    claimNowBtn.className = 'btn-outline small';
    claimNowBtn.textContent = `Claim ${dbBiz.name}`;
    claimNowBtn.onclick = () => startClaimFlow('desertbloombarbers');
    summaryEl.appendChild(claimNowBtn);
  }

  // Update option labels with latest names
  const select = $('#providerBizSelect');
  const optDb = select.querySelector('option[value="desertbloombarbers"]');
  const optSage = select.querySelector('option[value="sageandstonesalon"]');
  if(optDb) optDb.textContent = `${dbBiz.name} (${dbBiz.slug}.bastapapi.com) — ${dbBiz.claimed ? 'Claimed' : 'Unclaimed'}`;
  if(optSage) optSage.textContent = `${sageBiz.name} (${sageBiz.slug}.bastapapi.com) — Claimed`;

  const preferredSlug = state.pendingClaimSlug || (dbBiz.claimed ? 'desertbloombarbers' : state.activeBusiness);
  populateProviderForm(preferredSlug);
}

function startClaimFlow(slug){
  const targetSlug = slug || 'desertbloombarbers';
  state.pendingClaimSlug = targetSlug;
  if(state.activeBusiness !== targetSlug){
    switchBusiness(targetSlug);
  }
  const panel = $('#providerDashboard');
  panel.hidden = false;
  renderProviderDashboard();
  panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const prov = currentProvider();
  if(prov && !$('#claimConfirmBox').hidden){
    $('#confirmClaimBtn').focus();
  }
}

function confirmClaim(){
  const prov = currentProvider();
  const slug = state.pendingClaimSlug || 'desertbloombarbers';
  if(!prov || !BUSINESSES[slug]) return;
  const claims = loadJSON(CLAIMS_KEY, {});
  claims[slug] = {
    claimed: true,
    providerId: prov.id,
    providerName: prov.name,
    providerHandle: prov.handle,
    claimedAt: new Date().toISOString()
  };
  saveJSON(CLAIMS_KEY, claims);
  state.pendingClaimSlug = null;
  state.activeBusiness = slug;
  renderBusinessProfile();
  renderProviderDashboard();
  populateProviderForm(slug);
  $('#providerSaveStatus').textContent = `Claimed ${getBusiness(slug).name}. Booking is now active.`;
}

$('#forBusinessesLink').addEventListener('click', e => {
  e.preventDefault();
  const panel = $('#providerDashboard');
  panel.hidden = !panel.hidden;
  if(!panel.hidden){
    renderProviderDashboard();
    panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});
$('#closeProviderDashboardBtn').onclick = () => {
  $('#providerDashboard').hidden = true;
};
$$('[data-provider-social]').forEach(btn => {
  btn.onclick = () => startSignIn(btn.dataset.providerSocial, 'provider');
});
$('#providerSignOutBtn').onclick = providerSignOut;
$('#confirmClaimBtn').onclick = confirmClaim;
$('#cancelClaimBtn').onclick = () => {
  state.pendingClaimSlug = null;
  renderProviderDashboard();
};
$('#providerBizSelect').addEventListener('change', e => {
  populateProviderForm(e.target.value);
});
$('#providerBusinessForm').addEventListener('submit', e => {
  e.preventDefault();
  const slug = $('#providerBizSelect').value || state.activeBusiness;
  const name = $('#providerBizName').value.trim();
  const phone = $('#providerBizPhone').value.trim();
  const hours = $('#providerBizHours').value.trim();
  const editsMap = loadJSON(BUSINESS_EDITS_KEY, {});
  const prov = currentProvider();
  editsMap[slug] = {
    name: name || BUSINESSES[slug].name,
    phone: phone || BUSINESSES[slug].phone,
    hours: hours || BUSINESSES[slug].hours,
    updatedAt: new Date().toISOString(),
    updatedBy: prov ? prov.id : null
  };
  saveJSON(BUSINESS_EDITS_KEY, editsMap);
  renderBusinessProfile();
  renderProviderDashboard();
  populateProviderForm(slug);
  $('#providerSaveStatus').textContent = 'Saved to localStorage and updated profile.';
});

/* ---------- helpers ---------- */
function escapeHtml(str){
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
const fmtDur = m => m >= 120 ? `${m/60} hrs` : m === 60 ? '1 hr' : `${m} mins`;
const fmtTime = mins => { let h=Math.floor(mins/60), m=mins%60, ap=h>=12?'PM':'AM'; h=h%12||12; return `${h}:${String(m).padStart(2,'0')} ${ap}`; };
function syncScrollLock(){
  const anyOpen = !$('#bookingDrawer').hidden || !$('#galleryModal').hidden || !$('#supportModal').hidden || !$('#textOwnerModal').hidden || !$('#callOwnerModal').hidden;
  document.body.style.overflow = anyOpen ? 'hidden' : '';
}
function restoreFocus(){
  if(state.lastFocus && typeof state.lastFocus.focus === 'function'){
    state.lastFocus.focus();
    state.lastFocus = null;
  }
}

/* ---------- business profile rendering & switching (Part 2) ---------- */
function switchBusiness(slug){
  if(!BUSINESSES[slug]) return;
  state.activeBusiness = slug;
  state.carousel = 0;
  state.staffFilter = false;
  $('#staffFilterNote').textContent = '';
  $('#outreachStatusNote').textContent = '';
  closeBooking();
  renderBusinessProfile();
  if(!$('#providerDashboard').hidden && currentProvider()){
    populateProviderForm(slug);
  }
}

$$('[data-switch-business]').forEach(btn => {
  btn.onclick = () => switchBusiness(btn.dataset.switchBusiness);
});
$('#claimBusinessBtn').onclick = () => startClaimFlow(state.activeBusiness);
$('#sidebarClaimBtn').onclick = () => startClaimFlow(state.activeBusiness);

function updateBadgeEl(el, claimed){
  if(!el) return;
  el.textContent = claimed ? 'Claimed' : 'Unclaimed';
  el.classList.toggle('claimed', claimed);
  el.classList.toggle('unclaimed', !claimed);
}

function renderClaimNotifyBanner(){
  const banner = $('#claimNotifyBanner');
  if(!banner) return;
  const biz = getBusiness(state.activeBusiness);
  const notifyMap = loadJSON(NOTIFY_KEY, {});
  const req = notifyMap && notifyMap[biz.slug];
  if(biz.claimed && req && req.requested){
    banner.textContent = `${biz.name} is now taking bookings.`;
    banner.hidden = false;
  } else {
    banner.hidden = true;
    banner.textContent = '';
  }
}

function renderBusinessProfile(){
  const biz = getBusiness(state.activeBusiness);
  DATA = { gallery: biz.gallery, services: biz.services };

  document.title = `${biz.name} — BastaPapi`;

  // Header switcher tabs & badges
  $('#switchSageBtn').classList.toggle('active', biz.slug === 'sageandstonesalon');
  $('#switchDesertBtn').classList.toggle('active', biz.slug === 'desertbloombarbers');
  updateBadgeEl($('#sageTabBadge'), isBusinessClaimed('sageandstonesalon'));
  updateBadgeEl($('#desertTabBadge'), isBusinessClaimed('desertbloombarbers'));

  // Subdomain & claim status badges
  const domainText = `${biz.slug}.bastapapi.com`;
  $('#pageSubdomain').textContent = domainText;
  $('#heroSubdomain').textContent = domainText;
  $('#sidebarSubdomain').textContent = domainText;
  $('#unclaimedSlugText').textContent = domainText;

  updateBadgeEl($('#claimStatusBadge'), biz.claimed);
  updateBadgeEl($('#heroClaimBadge'), biz.claimed);
  updateBadgeEl($('#sidebarClaimBadge'), biz.claimed);

  // Hero & sidebar business details
  $('#bizHeroName').textContent = biz.name;
  $('#bizHeroSub').innerHTML = `${biz.ratingSummary} · <code id="heroSubdomain">${escapeHtml(domainText)}</code>`;
  $('#sidebarAvatar').textContent = biz.logoText;
  $('#sidebarBizName').textContent = biz.name;
  $('#sidebarBizSub').textContent = biz.sidebarRating;

  // Unclaimed vs Claimed controls
  $('#unclaimedActionsBox').hidden = biz.claimed;
  $('#sidebarUnclaimedActions').hidden = biz.claimed;
  $('#heroBookBtn').hidden = !biz.claimed;
  $('#sidebarBookBtn').hidden = !biz.claimed;
  $('#mobileBookPill').hidden = !biz.claimed;
  $('#bookWithNicolas').hidden = !biz.claimed;

  // Team
  $('#teamAvatar').textContent = biz.staffInitial;
  $('#teamMemberName').textContent = biz.staffName;
  $('#teamMemberRole').textContent = biz.staffRole;
  $('#bookWithNicolas').textContent = `Book with ${biz.staffName}`;
  $('#bkStaffAvatar').textContent = biz.staffInitial;
  $('#bkStaffName').textContent = biz.staffName;

  // About & contact info (reflects saved provider edits for name, phone, hours)
  $('#bizAboutText').textContent = biz.about;
  $('#bizPhoneLink').textContent = biz.phone;
  $('#bizPhoneLink').href = biz.phoneHref;
  $('#bizHoursText').textContent = biz.hours;

  if(biz.email){
    $('#bizEmailItem').hidden = false;
    $('#bizEmailLink').textContent = biz.email;
    $('#bizEmailLink').href = `mailto:${biz.email}`;
  } else {
    $('#bizEmailItem').hidden = true;
  }

  $('#bizInstaLink').textContent = `Instagram ${biz.instagram}`;
  $('#sidebarAddressItem').textContent = `📍 ${biz.addressStreet}`;
  $('#sidebarPhoneLink').textContent = biz.phone;
  $('#sidebarPhoneLink').href = biz.phoneHref;
  $('#sidebarHoursText').textContent = biz.hours;
  $('#sidebarInstaLink').textContent = biz.instagram;
  $('#doneInstaLink').textContent = `Follow ${biz.instagram} on Instagram`;
  $('#supportCallLink').textContent = `📞 Call ${biz.phone}`;
  $('#supportCallLink').href = biz.phoneHref;

  // Address & footer
  $('#bizAddressText').innerHTML = biz.addressLinesHtml;
  $('#bizMapIframe').title = `Map — ${biz.name}`;
  $('#bizMapIframe').src = biz.mapEmbedUrl;
  $('#bizDirectionsLink').href = biz.directionsUrl;
  $('#bizFooterText').textContent = `${biz.name} · ${biz.addressFull} · ${biz.phone} · ${biz.hours}`;

  renderClaimNotifyBanner();
  renderGallery();
  renderServices();
}

/* ---------- gallery / carousel ---------- */
function renderGallery(){
  const track=$('#carouselTrack'), dots=$('#carDots');
  track.innerHTML = DATA.gallery.map(([src,alt])=>`<div class="carousel-slide"><img src="${src}" alt="${alt}" loading="lazy"></div>`).join('');
  dots.innerHTML = DATA.gallery.map((_,i)=>`<button type="button" aria-label="Photo ${i+1}" data-i="${i}"></button>`).join('');
  dots.querySelectorAll('button').forEach(b=>b.onclick=()=>goTo(+b.dataset.i));
  $('#galleryGrid').innerHTML = DATA.gallery.map(([src,alt],i)=>`<button type="button" data-photo="${i}"><img src="${src}" alt="${alt}" loading="lazy"></button>`).join('');
  $('#modalGalleryGrid').innerHTML = DATA.gallery.map(([src,alt],i)=>`<button type="button" data-modal-photo="${i}"><img src="${src}" alt="${alt}" loading="lazy"></button>`).join('');
  $$('[data-photo]').forEach(b=>b.onclick=()=>{ goTo(+b.dataset.photo); openGallery(); });
  $$('[data-modal-photo]').forEach(b=>b.onclick=()=>{ goTo(+b.dataset.modalPhoto); closeGallery(); });
  goTo(state.carousel);
}
function goTo(i){
  const n=DATA.gallery.length; if(!n) return;
  state.carousel=(i+n)%n;
  $('#carouselTrack').style.transform=`translateX(-${state.carousel*100}%)`;
  $$('#carDots button').forEach((d,j)=>{
    const active = j===state.carousel;
    d.classList.toggle('active', active);
    d.setAttribute('aria-current', active ? 'true' : 'false');
  });
}
$('#carPrev').onclick=()=>goTo(state.carousel-1);
$('#carNext').onclick=()=>goTo(state.carousel+1);
let touchX=null;
$('#carousel').addEventListener('touchstart',e=>touchX=e.touches[0].clientX,{passive:true});
$('#carousel').addEventListener('touchend',e=>{ if(touchX==null)return; const d=e.changedTouches[0].clientX-touchX; if(Math.abs(d)>40) goTo(state.carousel+(d<0?1:-1)); touchX=null; },{passive:true});
$('#carousel').addEventListener('keydown',e=>{
  if(e.key==='ArrowLeft'){ e.preventDefault(); goTo(state.carousel-1); }
  else if(e.key==='ArrowRight'){ e.preventDefault(); goTo(state.carousel+1); }
});
function openGallery(){
  state.lastFocus=document.activeElement;
  $('#galleryModal').hidden=false;
  syncScrollLock();
  $('[data-close-gallery]').focus();
}
function closeGallery(){
  if($('#galleryModal').hidden) return;
  $('#galleryModal').hidden=true;
  syncScrollLock();
  restoreFocus();
}
$('#showAllPhotos').onclick=openGallery; $('#showAllPhotos2').onclick=openGallery;
$('[data-close-gallery]').onclick=closeGallery;
$('#galleryModal').addEventListener('click',e=>{ if(e.target.id==='galleryModal') closeGallery(); });

/* ---------- services ---------- */
function renderServices(){
  const claimed = isBusinessClaimed(state.activeBusiness);
  $('#servicesList').innerHTML = DATA.services.map(s=>`
    <article class="service-card" data-id="${s.id}">
      <div>
        <h3>${s.name}</h3>
        <p class="service-meta">${fmtDur(s.durationMinutes)} · ${s.priceLabel}</p>
        <p class="service-desc" id="desc-${s.id}">${s.description}</p>
        <button type="button" class="btn-details" data-details aria-expanded="false" aria-controls="desc-${s.id}">Details ▾</button>
      </div>
      <div class="service-side">
        <span class="service-price">${s.priceLabel}</span>
        ${claimed
          ? `<button type="button" class="btn-service-book" data-book-service="${s.id}">Book</button>`
          : `<span class="badge unclaimed">Unclaimed</span>`}
      </div>
    </article>`).join('');
  $$('[data-details]').forEach(b=>b.onclick=()=>{
    const card=b.closest('.service-card'), open=card.classList.toggle('open');
    b.setAttribute('aria-expanded',String(open)); b.textContent=open?'Details ▴':'Details ▾';
  });
  if(claimed){
    $$('[data-book-service]').forEach(b=>b.onclick=()=>openBooking(DATA.services.find(s=>s.id===b.dataset.bookService)));
  }
}
$('#bookWithNicolas').onclick=()=>{
  const biz = getBusiness(state.activeBusiness);
  if(!biz.claimed) return;
  state.staffFilter=true;
  $('#staffFilterNote').textContent=`Showing all services with ${biz.staffName} — tap any Book button to book directly with them.`;
  document.querySelector('#services').scrollIntoView({behavior:'smooth'});
};

/* ---------- sticky nav active state ---------- */
const navObs=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting) $$('[data-nav]').forEach(a=>a.classList.toggle('active', a.getAttribute('href')==='#'+e.target.id));
}),{rootMargin:'-40% 0px -55% 0px'});
['services','team','about','gallery','reviews','address'].forEach(id=>{const el=document.getElementById(id); if(el) navObs.observe(el);});

/* ---------- booking drawer ---------- */
const drawer=$('#bookingDrawer'), overlay=$('#drawerOverlay');
function openBooking(service){
  const biz = getBusiness(state.activeBusiness);
  if(!biz.claimed) return;
  state.lastFocus=document.activeElement;
  state.service = service || DATA.services[0];
  state.slot=null; state.dayOffset=0;
  $('#bookingFormView').hidden=false; $('#bookingDoneView').hidden=true; $('#bookingError').hidden=true;
  $('#bkServiceName').textContent=state.service.name;
  $('#bkServiceMeta').textContent=`${fmtDur(state.service.durationMinutes)} · ${state.service.priceLabel}`;
  $('#bufferSelect').value=String(state.service.bufferMinutes||15);
  renderDays(); renderSlots();
  drawer.hidden=false; overlay.hidden=false; drawer.scrollTop=0; syncScrollLock();
  $('#drawerClose').focus();
}
function closeBooking(){
  if(drawer.hidden) return;
  drawer.hidden=true; overlay.hidden=true; syncScrollLock();
  restoreFocus();
}
$$('[data-book]').forEach(b=>b.addEventListener('click',()=>openBooking()));
$('#drawerClose').onclick=closeBooking; overlay.onclick=closeBooking;
$('#bufferSelect').addEventListener('change',renderSlots);

function renderDays(){
  const wrap=$('#dayChips'); wrap.innerHTML='';
  for(let i=0;i<7;i++){
    const d=new Date(); d.setDate(d.getDate()+i);
    const selected=i===state.dayOffset;
    const b=document.createElement('button');
    b.type='button';
    b.className='day-chip'+(selected?' selected':'');
    b.setAttribute('aria-pressed',String(selected));
    b.innerHTML=`${i===0?'Today':d.toLocaleDateString(undefined,{weekday:'short'})}<br><strong>${d.getDate()}</strong> ${d.toLocaleDateString(undefined,{month:'short'})}`;
    b.onclick=()=>{state.dayOffset=i; state.slot=null; renderDays(); renderSlots();};
    wrap.appendChild(b);
  }
}
function renderSlots(){
  const grid=$('#slotGrid'); grid.innerHTML='';
  if(!state.service) return;
  const dur=state.service.durationMinutes, buffer=+$('#bufferSelect').value;
  $('#slotHint').textContent=`· ${dur} min service + ${buffer} min buffer`;
  // A few slots are marked taken. Stable per day/service so the page behaves consistently.
  const seed=[...state.service.id].reduce((a,c)=>a+c.charCodeAt(0),0)+state.dayOffset*7;
  const lastStart=18*60-dur-buffer;
  if(state.slot!=null && (state.slot>lastStart || ((state.slot/15+seed)%9)===0)) state.slot=null;
  for(let t=9*60; t<=lastStart; t+=15){
    const selected=state.slot===t;
    const b=document.createElement('button');
    b.type='button';
    b.className='slot'+(selected?' selected':'');
    b.textContent=fmtTime(t);
    b.setAttribute('aria-pressed',String(selected));
    if(((t/15+seed)%9)===0) b.disabled=true; // scattered booked slots
    b.onclick=()=>{ state.slot=t; $('#bookingError').hidden=true; renderSlots(); };
    grid.appendChild(b);
  }
  updateSlotSummary();
}
function updateSlotSummary(){
  const el=$('#slotSummary');
  if(state.slot==null||!state.service){ el.textContent='Pick a time to see your end time.'; return; }
  const biz = getBusiness(state.activeBusiness);
  const buffer=+$('#bufferSelect').value, end=state.slot+state.service.durationMinutes;
  el.textContent=`${fmtTime(state.slot)} – ${fmtTime(end)} (+${buffer} min buffer after) · with ${biz.staffName}`;
}
$$('[data-social]').forEach(b=>b.onclick=()=>{ $('#bookingError').hidden=true; startSignIn(b.dataset.social, 'customer'); });
$('#guestName').addEventListener('input',()=>{ delete $('#guestName').dataset.autofilled; });
['#guestName','#guestPhone'].forEach(sel=>$(sel).addEventListener('input',()=>{ $('#bookingError').hidden=true; }));
$('#confirmBookingBtn').onclick=()=>{
  const err=$('#bookingError'), name=$('#guestName').value.trim(), phone=$('#guestPhone').value.trim();
  const problems=[];
  if(state.slot==null) problems.push('pick a time slot');
  if(!state.social){
    if(!name && !phone) problems.push('sign in with Instagram, TikTok or Google, or enter your name and phone');
    else if(!name || !phone) problems.push('enter both guest name and phone, or sign in above');
  }
  if(problems.length){ err.textContent='Please '+problems.join('; ')+'.'; err.hidden=false; return; }
  err.hidden=true;
  const biz = getBusiness(state.activeBusiness);
  const d=new Date(); d.setDate(d.getDate()+state.dayOffset);
  const acct=currentAccount();
  const guest=name||(acct?acct.name:'');
  const who=guest?` for ${guest}`:'';
  $('#doneSummary').textContent=`${state.service.name} with ${biz.staffName} at ${biz.name} · ${d.toLocaleDateString(undefined,{weekday:'long',month:'long',day:'numeric'})} at ${fmtTime(state.slot)}${who}. The business will confirm by phone or message.`;
  $('#bookingFormView').hidden=true; $('#bookingDoneView').hidden=false;
  drawer.scrollTo({top:0,behavior:'smooth'});
};
$('#doneCloseBtn').onclick=closeBooking;

/* ---------- Part 3: Contact-the-owner flows (SIMULATED) ---------- */
function composeOutreachText(slug){
  return `Hey, I was trying to book an appointment with you, but your profile hasn't been claimed on BastaPapi.com. Claim now and join the only free forever booking platform. We'll do the heavy lifting for you, and your booking page is already waiting for you! Visit ${slug}.bastapapi.com`;
}

function recordOutreach(entry){
  const list = loadJSON(OUTREACH_KEY, []);
  const arr = Array.isArray(list) ? list : [];
  arr.push(entry);
  saveJSON(OUTREACH_KEY, arr);
  if(entry.notifyWhenClaimed){
    const notifyMap = loadJSON(NOTIFY_KEY, {});
    notifyMap[entry.businessSlug] = {
      requested: true,
      customerName: entry.customerName || 'Customer',
      customerAccountId: entry.customerAccountId || null,
      requestedAt: entry.createdAt
    };
    saveJSON(NOTIFY_KEY, notifyMap);
  }
}

function openTextModal(){
  const biz = getBusiness(state.activeBusiness);
  state.lastFocus = document.activeElement;
  if(state.textCloseTimer){ clearTimeout(state.textCloseTimer); state.textCloseTimer = null; }
  $('#textRecipientPhone').textContent = biz.phone;
  $('#textRecipientBiz').textContent = biz.name;
  $('#textMessagePreview').value = composeOutreachText(biz.slug);
  $('#textNotifyCheckbox').checked = true;
  $('#textComposeView').hidden = false;
  $('#textSentView').hidden = true;
  $('#textOwnerModal').hidden = false;
  syncScrollLock();
  $('#sendTextBtn').focus();
}

function closeTextModal(){
  if($('#textOwnerModal').hidden) return;
  if(state.textCloseTimer){ clearTimeout(state.textCloseTimer); state.textCloseTimer = null; }
  $('#textOwnerModal').hidden = true;
  syncScrollLock();
  restoreFocus();
}

$('#textOwnerBtn').onclick = openTextModal;
$('#sidebarTextOwnerBtn').onclick = openTextModal;
$('#closeTextModalBtn').onclick = closeTextModal;
$('#cancelTextBtn').onclick = closeTextModal;
$('#doneTextBtn').onclick = closeTextModal;
$('#textOwnerModal').addEventListener('click', e => { if(e.target.id === 'textOwnerModal') closeTextModal(); });

$('#sendTextBtn').onclick = () => {
  const biz = getBusiness(state.activeBusiness);
  const acct = currentAccount();
  const notify = $('#textNotifyCheckbox').checked;
  const message = $('#textMessagePreview').value;
  recordOutreach({
    type: 'text',
    businessSlug: biz.slug,
    businessName: biz.name,
    phone: biz.phone,
    customerName: acct ? acct.name : 'Guest',
    customerAccountId: acct ? acct.id : null,
    message,
    notifyWhenClaimed: notify,
    simulated: true,
    createdAt: new Date().toISOString()
  });
  $('#textComposeView').hidden = true;
  $('#textSentView').hidden = false;
  $('#outreachStatusNote').textContent = `Simulated text recorded for ${biz.phone} (test mode).${notify ? ' You will see a notice here once this business is claimed.' : ''}`;
  state.textCloseTimer = setTimeout(() => {
    closeTextModal();
  }, 1400);
};

function clearCallTimers(){
  state.callTimers.forEach(t => clearTimeout(t));
  state.callTimers = [];
}

function openCallModal(){
  const biz = getBusiness(state.activeBusiness);
  const acct = currentAccount();
  state.lastFocus = document.activeElement;
  clearCallTimers();
  $('#callTargetBiz').textContent = biz.name;
  $('#callTargetPhone').textContent = biz.phone;
  $('#callTranscriptBiz').textContent = biz.name;
  $('#callCustomerName').value = acct && acct.name ? acct.name.split(/\s+/)[0] : '';
  $('#callNotifyCheckbox').checked = true;
  $('#callNameError').hidden = true;
  $('#callStep1View').hidden = false;
  $('#callStep2View').hidden = true;
  $('#callStep3View').hidden = true;
  $('#callTranscript').innerHTML = '';
  $('#callFollowupText').textContent = '';
  $('#callOwnerModal').hidden = false;
  syncScrollLock();
  $('#callCustomerName').focus();
}

function closeCallModal(){
  if($('#callOwnerModal').hidden) return;
  clearCallTimers();
  $('#callOwnerModal').hidden = true;
  syncScrollLock();
  restoreFocus();
}

$('#callOwnerBtn').onclick = openCallModal;
$('#sidebarCallOwnerBtn').onclick = openCallModal;
$('#closeCallModalBtn').onclick = closeCallModal;
$('#cancelCallBtn').onclick = closeCallModal;
$('#doneCallBtn').onclick = closeCallModal;
$('#callOwnerModal').addEventListener('click', e => { if(e.target.id === 'callOwnerModal') closeCallModal(); });
$('#callCustomerName').addEventListener('input', () => { $('#callNameError').hidden = true; });

$('#startCallBtn').onclick = () => {
  const biz = getBusiness(state.activeBusiness);
  const acct = currentAccount();
  const rawName = $('#callCustomerName').value.trim() || (acct && acct.name ? acct.name.split(/\s+/)[0] : '');
  if(!rawName){
    $('#callNameError').hidden = false;
    $('#callCustomerName').focus();
    return;
  }
  $('#callNameError').hidden = true;
  const name = rawName;
  const notify = $('#callNotifyCheckbox').checked;

  const scriptLines = [
    { speaker: 'AI', text: `AI: "Hi ${name}, let's call ${biz.name} and get this sorted."` },
    { status: true, text: '(Ringing…)' },
    { speaker: 'AI', text: `AI: "Hey ${biz.name}, I have ${name} on the line. They were trying to book with you, but your business is currently unclaimed on BastaPapi.com and you're losing customers."` },
    { speaker: name, text: `${name}: "Yeah, I was trying to book."` },
    { speaker: 'AI', text: `AI: "Go to ${biz.slug}.bastapapi.com and join the only free forever booking platform. In the meantime, ${name} would like to be your first booking. We'll notify ${name} the moment your business has been claimed. Take care."` },
    { status: true, text: '(Call ended)' }
  ];

  const followupText = `Hi ${biz.name}, ${name} just tried to book with you through BastaPapi.com. Claim your page at ${biz.slug}.bastapapi.com to accept the booking — we'll let ${name} know as soon as you do.`;

  recordOutreach({
    type: 'call',
    businessSlug: biz.slug,
    businessName: biz.name,
    phone: biz.phone,
    customerName: name,
    customerAccountId: acct ? acct.id : null,
    transcript: scriptLines.map(l => l.text),
    followupText,
    notifyWhenClaimed: notify,
    simulated: true,
    createdAt: new Date().toISOString()
  });

  $('#callStep1View').hidden = true;
  $('#callStep2View').hidden = false;
  $('#callStep3View').hidden = true;
  $('#callFollowupText').textContent = followupText;
  $('#outreachStatusNote').textContent = `Simulated call and follow-up text recorded for ${biz.name} (test mode).`;

  const transcriptEl = $('#callTranscript');
  transcriptEl.innerHTML = '';
  clearCallTimers();

  scriptLines.forEach((line, idx) => {
    const timer = setTimeout(() => {
      const p = document.createElement('p');
      p.className = 'transcript-line' + (line.status ? ' status' : '');
      p.textContent = line.text;
      transcriptEl.appendChild(p);
      if(idx === scriptLines.length - 1){
        $('#callStep3View').hidden = false;
      }
    }, idx * 450);
    state.callTimers.push(timer);
  });
};

document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){
    closeBooking();
    closeGallery();
    closeSupport();
    closeTextModal();
    closeCallModal();
  }
});

/* ---------- support dock ---------- */
function openSupport(){
  state.lastFocus=document.activeElement;
  $('#supportModal').hidden=false;
  syncScrollLock();
  $('#supportInput').focus();
}
function closeSupport(){
  if($('#supportModal').hidden) return;
  $('#supportModal').hidden=true;
  syncScrollLock();
  restoreFocus();
}
$('#supportDock').onclick=openSupport;
$('[data-close-support]').onclick=closeSupport;
$('#supportModal').addEventListener('click',e=>{ if(e.target.id==='supportModal') closeSupport(); });
function supportReply(q){
  const biz = getBusiness(state.activeBusiness);
  const chat=$('#supportChat');
  const userBubble=document.createElement('div');
  userBubble.className='chat-bubble user';
  userBubble.textContent=q;
  chat.appendChild(userBubble);
  const a=/reschedule|change/i.test(q)
    ? `To reschedule, call ${biz.name} on ${biz.phone} and they will move your appointment.`
    : `Thanks — we will get back to you shortly. For anything urgent, call ${biz.name} on ${biz.phone}.`;
  setTimeout(()=>{
    const agentBubble=document.createElement('div');
    agentBubble.className='chat-bubble agent';
    agentBubble.textContent=a;
    chat.appendChild(agentBubble);
    chat.scrollTop=chat.scrollHeight;
  },350);
}
$$('[data-support-q]').forEach(b=>b.onclick=()=>supportReply(b.dataset.supportQ));
$('#supportForm').addEventListener('submit',e=>{ e.preventDefault(); const v=$('#supportInput').value.trim(); if(v){ supportReply(v); $('#supportInput').value=''; }});

/* ---------- init: load the data file when available ---------- */
(async function init(){
  const params = new URLSearchParams(location.search);
  const requestedBiz = params.get('business');
  if(requestedBiz && BUSINESSES[requestedBiz]){
    state.activeBusiness = requestedBiz;
  } else if(location.hash === '#desertbloombarbers'){
    state.activeBusiness = 'desertbloombarbers';
  }
  renderBusinessProfile();
  handleAuthCallback();
  reflectSignIn();
  renderProviderDashboard();
  try{
    const res=await fetch('scraper-schema.json',{cache:'no-store'});
    if(res.ok){
      const s=await res.json();
      if(s.provider?.branding?.accent) document.documentElement.style.setProperty('--brand-accent', s.provider.branding.accent);
      if(Array.isArray(s.services)&&s.services.length) {
        BUSINESSES.sageandstonesalon.services = s.services;
      }
      if(Array.isArray(s.gallery)&&s.gallery.length) {
        BUSINESSES.sageandstonesalon.gallery = s.gallery.map(g=>[g.src,g.alt]);
      }
      if(state.activeBusiness === 'sageandstonesalon'){
        renderBusinessProfile();
        if(state.service){
          state.service = DATA.services.find(x=>x.id===state.service.id) || DATA.services[0];
          renderSlots();
        }
      }
    }
  }catch(_){ /* opened from the filesystem — use the fallback data above */ }
})();
