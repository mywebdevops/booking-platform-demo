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

let DATA = FALLBACK;
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const state = { service:null, dayOffset:0, slot:null, social:null, carousel:0, staffFilter:false, lastFocus:null };

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
function loadJSON(key, fallback){
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch(_) { return fallback; }
}
function saveJSON(key, value){
  try { localStorage.setItem(key, JSON.stringify(value)); } catch(_) { /* storage unavailable (private mode etc.) */ }
}
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
}
function signOut(){
  try { localStorage.removeItem(SESSION_KEY); } catch(_) {}
  reflectSignIn();
}
function startSignIn(provider){
  if(!Object.prototype.hasOwnProperty.call(AUTH_CONFIG.providers, provider)) return;
  const acct = currentAccount();
  if(acct && acct.provider === provider){ signOut(); return; }
  const cfg = AUTH_CONFIG.providers[provider] || {};
  const nonce = Math.random().toString(36).slice(2) + Date.now().toString(36);
  const pageUrl = location.href.split('?')[0].split('#')[0];
  try {
    sessionStorage.setItem('booking.pendingAuth', JSON.stringify({
      provider, state: nonce, serviceId: state.service ? state.service.id : null
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
  const provider = params.get('provider');
  if(params.get('auth') !== 'ok' || !provider) return;
  if(!Object.prototype.hasOwnProperty.call(AUTH_CONFIG.providers, provider)) return;
  if(!pending || !pending.state || pending.state !== params.get('state') || pending.provider !== provider) return; // state mismatch: ignore
  const name = (params.get('name') || 'Guest').trim() || 'Guest';
  const handle = (params.get('handle') || name).trim().toLowerCase();
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
    const svc = DATA.services.find(s => s.id === pending.serviceId);
    if(svc) openBooking(svc);
  }
}

/* ---------- helpers ---------- */
const fmtDur = m => m >= 120 ? `${m/60} hrs` : m === 60 ? '1 hr' : `${m} mins`;
const fmtTime = mins => { let h=Math.floor(mins/60), m=mins%60, ap=h>=12?'PM':'AM'; h=h%12||12; return `${h}:${String(m).padStart(2,'0')} ${ap}`; };
function syncScrollLock(){
  const anyOpen = !$('#bookingDrawer').hidden || !$('#galleryModal').hidden || !$('#supportModal').hidden;
  document.body.style.overflow = anyOpen ? 'hidden' : '';
}
function restoreFocus(){
  if(state.lastFocus && typeof state.lastFocus.focus === 'function'){
    state.lastFocus.focus();
    state.lastFocus = null;
  }
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
        <button type="button" class="btn-service-book" data-book-service="${s.id}">Book</button>
      </div>
    </article>`).join('');
  $$('[data-details]').forEach(b=>b.onclick=()=>{
    const card=b.closest('.service-card'), open=card.classList.toggle('open');
    b.setAttribute('aria-expanded',String(open)); b.textContent=open?'Details ▴':'Details ▾';
  });
  $$('[data-book-service]').forEach(b=>b.onclick=()=>openBooking(DATA.services.find(s=>s.id===b.dataset.bookService)));
}
$('#bookWithNicolas').onclick=()=>{
  state.staffFilter=true;
  $('#staffFilterNote').textContent='Showing all services with Nicolas — tap any Book button to book directly with him.';
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
  const buffer=+$('#bufferSelect').value, end=state.slot+state.service.durationMinutes;
  el.textContent=`${fmtTime(state.slot)} – ${fmtTime(end)} (+${buffer} min buffer after) · with Nicolas`;
}
$$('[data-social]').forEach(b=>b.onclick=()=>{ $('#bookingError').hidden=true; startSignIn(b.dataset.social); });
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
  const d=new Date(); d.setDate(d.getDate()+state.dayOffset);
  const acct=currentAccount();
  const guest=name||(acct?acct.name:'');
  const who=guest?` for ${guest}`:'';
  $('#doneSummary').textContent=`${state.service.name} with Nicolas · ${d.toLocaleDateString(undefined,{weekday:'long',month:'long',day:'numeric'})} at ${fmtTime(state.slot)}${who}. The salon will confirm by phone or message.`;
  $('#bookingFormView').hidden=true; $('#bookingDoneView').hidden=false;
  drawer.scrollTo({top:0,behavior:'smooth'});
};
$('#doneCloseBtn').onclick=closeBooking;
document.addEventListener('keydown',e=>{ if(e.key==='Escape'){ closeBooking(); closeGallery(); closeSupport(); }});

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
  const chat=$('#supportChat');
  const userBubble=document.createElement('div');
  userBubble.className='chat-bubble user';
  userBubble.textContent=q;
  chat.appendChild(userBubble);
  const a=/reschedule|change/i.test(q)
    ? 'To reschedule, call the salon on (480) 555-0119 and they will move your appointment.'
    : 'Thanks — we will get back to you shortly. For anything urgent, call the salon on (480) 555-0119.';
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
  renderGallery(); renderServices();
  handleAuthCallback();
  reflectSignIn();
  try{
    const res=await fetch('scraper-schema.json',{cache:'no-store'});
    if(res.ok){
      const s=await res.json();
      if(s.provider?.branding?.accent) document.documentElement.style.setProperty('--brand-accent', s.provider.branding.accent);
      if(Array.isArray(s.services)&&s.services.length) {
        DATA={...DATA, services:s.services};
        renderServices();
        if(state.service){
          state.service = DATA.services.find(x=>x.id===state.service.id) || DATA.services[0];
          renderSlots();
        }
      }
      if(Array.isArray(s.gallery)&&s.gallery.length) { DATA={...DATA, gallery:s.gallery.map(g=>[g.src,g.alt])}; renderGallery(); }
    }
  }catch(_){ /* opened from the filesystem — use the fallback data above */ }
})();
