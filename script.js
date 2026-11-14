/**
 * VIBEATS × FRAME YOUR MEMORIES COLLABORATION JAVASCRIPT
 * Handles CS routing, interactive live customizer, catalog filtering, and WhatsApp URL generator
 */

// ==========================================
// 1. CONFIGURATION: ADMIN PHONE NUMBERS & HANDLES
// Kamu bisa mengubah nomor WhatsApp di sini:
// Format: kode negara tanpa tanda + (contoh: 628123456789)
// ==========================================
const BRAND_CONFIG = {
  vibeats: {
    name: 'Vibeats Keychain',
    waNumber: '6281234567890', // Ganti dengan nomor WhatsApp Admin Vibeats
    instagram: '@vibeats.keychain',
    specialty: 'Akrilik Spotify Barcode',
    csTitle: 'Admin Vibeats Keychain'
  },
  frame: {
    name: 'Frame Your Memories',
    waNumber: '6289876543210', // Ganti dengan nomor WhatsApp Admin Frame Your Memories
    instagram: '@frameyourmemories.id',
    specialty: 'Handmade Felt Photobooth Frame',
    csTitle: 'Admin Frame Your Memories'
  }
};

// Current active product for CS modal
let currentSelectedProduct = null;

// State for Customizer
const customizerState = {
  vibeats: {
    songTitle: 'Glimpse of Us',
    artist: 'Joji • Our Anniversary',
    coverUrl: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=500&q=80',
    shape: 'rounded'
  },
  frame: {
    feltColor: '#312e81',
    colorName: 'Moonlight Navy',
    title: 'BESTIES FOREVER • 2026',
    ribbon: true,
    beads: true,
    theme: 'friends'
  }
};

// ==========================================
// 2. MOBILE NAVIGATION DRAWER
// ==========================================
function toggleMobileMenu() {
  const mobileNav = document.getElementById('mobile-nav');
  const menuIcon = document.getElementById('menu-icon');
  
  if (mobileNav.classList.contains('hidden')) {
    mobileNav.classList.remove('hidden');
    menuIcon.setAttribute('data-lucide', 'x');
  } else {
    mobileNav.classList.add('hidden');
    menuIcon.setAttribute('data-lucide', 'menu');
  }
  lucide.createIcons();
}

// ==========================================
// 3. CATALOG FILTERING SYSTEM
// ==========================================
function filterCatalog(category) {
  const buttons = document.querySelectorAll('.catalog-filter-btn');
  buttons.forEach(btn => {
    btn.classList.remove('active', 'bg-white/15', 'text-white');
    btn.classList.add('text-slate-400');
  });

  const activeBtn = document.getElementById(`filter-${category}`);
  if (activeBtn) {
    activeBtn.classList.add('active');
    activeBtn.classList.remove('text-slate-400');
  }

  const products = document.querySelectorAll('.product-card');
  products.forEach(card => {
    const cardCat = card.getAttribute('data-category');
    if (category === 'all' || cardCat === category) {
      card.style.display = 'flex';
      card.classList.add('animate-fade-in');
    } else {
      card.style.display = 'none';
    }
  });
}

// ==========================================
// 4. INTERACTIVE CUSTOMIZER: TAB SWITCHER
// ==========================================
function switchCustomizerTab(brand) {
  const tabVibeatsBtn = document.getElementById('tab-vibeats-btn');
  const tabFrameBtn = document.getElementById('tab-frame-btn');
  const panelVibeats = document.getElementById('vibeats-customizer-panel');
  const panelFrame = document.getElementById('frame-customizer-panel');

  if (brand === 'vibeats') {
    // Active Vibeats
    tabVibeatsBtn.className = 'px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all bg-gradient-to-r from-moonlight-red to-moonlight-burgundy text-white shadow-md';
    tabFrameBtn.className = 'px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all text-slate-400 hover:text-white';
    
    panelVibeats.classList.remove('hidden');
    panelFrame.classList.add('hidden');
  } else {
    // Active Frame Your Memories
    tabFrameBtn.className = 'px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all bg-gradient-to-r from-moonlight-blue to-moonlight-cyan text-white shadow-md';
    tabVibeatsBtn.className = 'px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all text-slate-400 hover:text-white';
    
    panelFrame.classList.remove('hidden');
    panelVibeats.classList.add('hidden');
  }

  lucide.createIcons();
}

// ==========================================
// 5. VIBEATS CUSTOMIZER LOGIC
// ==========================================
function updateVibeatsPreview() {
  const songInput = document.getElementById('cust-song-title');
  const artistInput = document.getElementById('cust-artist');
  const previewSongTitle = document.getElementById('preview-song-title');
  const previewArtist = document.getElementById('preview-artist');

  const titleVal = songInput.value.trim() || 'Judul Lagu Kamu';
  const artistVal = artistInput.value.trim() || 'Nama Artis / Pesan';

  previewSongTitle.textContent = titleVal;
  previewArtist.textContent = artistVal;

  customizerState.vibeats.songTitle = titleVal;
  customizerState.vibeats.artist = artistVal;
}

function setVibeatsCover(url) {
  const previewImg = document.getElementById('preview-vibeats-img');
  previewImg.src = url;
  customizerState.vibeats.coverUrl = url;
}

function handleVibeatsImageUpload(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      setVibeatsCover(e.target.result);
    };
    reader.readAsDataURL(file);
  }
}

function setAcrylicShape(shape) {
  const mockupFrame = document.getElementById('acrylic-mockup-frame');
  const btnRounded = document.getElementById('shape-rounded');
  const btnPill = document.getElementById('shape-pill');

  if (shape === 'rounded') {
    mockupFrame.className = 'relative w-64 p-4 rounded-3xl bg-white/[0.05] border-2 border-white/40 shadow-2xl backdrop-blur-xl transition-all duration-300';
    btnRounded.className = 'flex-1 py-2 px-3 rounded-xl text-xs font-semibold border border-moonlight-red bg-moonlight-red/20 text-white';
    btnPill.className = 'flex-1 py-2 px-3 rounded-xl text-xs font-semibold border border-white/10 bg-space-950 text-slate-400 hover:text-white';
  } else {
    mockupFrame.className = 'relative w-64 p-4 rounded-t-full rounded-b-2xl bg-white/[0.05] border-2 border-white/40 shadow-2xl backdrop-blur-xl transition-all duration-300 pt-7';
    btnPill.className = 'flex-1 py-2 px-3 rounded-xl text-xs font-semibold border border-moonlight-red bg-moonlight-red/20 text-white';
    btnRounded.className = 'flex-1 py-2 px-3 rounded-xl text-xs font-semibold border border-white/10 bg-space-950 text-slate-400 hover:text-white';
  }
  customizerState.vibeats.shape = shape;
}

function orderFromVibeatsCustomizer() {
  const text = `Halo Admin Vibeats Keychain! ✨%0ASaya mau pesan Custom Gantungan Kunci Akrilik Spotify dari Web Collabs:%0A%0A🎵 *Judul Lagu/Momen:* ${encodeURIComponent(customizerState.vibeats.songTitle)}%0A🎤 *Artis/Pesan:* ${encodeURIComponent(customizerState.vibeats.artist)}%0A📐 *Bentuk Akrilik:* ${customizerState.vibeats.shape === 'rounded' ? 'Square Rounded' : 'Arch Oval'}%0A%0AMohon info ketersediaan slot & kirim foto covernya ya min. Terima kasih!`;
  
  const waUrl = `https://wa.me/${BRAND_CONFIG.vibeats.waNumber}?text=${text}`;
  window.open(waUrl, '_blank');
}

// ==========================================
// 6. FRAME YOUR MEMORIES CUSTOMIZER LOGIC
// ==========================================
function setFeltColor(hex, name) {
  const feltFrame = document.getElementById('felt-mockup-frame');
  feltFrame.style.backgroundColor = hex;
  customizerState.frame.feltColor = hex;
  customizerState.frame.colorName = name;
}

function updateFeltPreview() {
  const titleInput = document.getElementById('cust-felt-title');
  const previewTitle = document.getElementById('preview-felt-title');
  const ribbonCheckbox = document.getElementById('felt-charm-ribbon');
  const previewRibbon = document.getElementById('preview-felt-ribbon');

  const val = titleInput.value.trim() || 'PHOTO STRIP • 2026';
  previewTitle.textContent = val;
  customizerState.frame.title = val;

  if (ribbonCheckbox.checked) {
    previewRibbon.style.display = 'flex';
  } else {
    previewRibbon.style.display = 'none';
  }
}

function setFeltPhotoPreset(theme) {
  const p1 = document.getElementById('felt-photo-1');
  const p2 = document.getElementById('felt-photo-2');
  const p3 = document.getElementById('felt-photo-3');

  if (theme === 'friends') {
    p1.src = 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=400&q=80';
    p2.src = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80';
    p3.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';
  } else if (theme === 'couple') {
    p1.src = 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=400&q=80';
    p2.src = 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&w=400&q=80';
    p3.src = 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=400&q=80';
  } else {
    p1.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80';
    p2.src = 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80';
    p3.src = 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80';
  }
  customizerState.frame.theme = theme;
}

function orderFromFrameCustomizer() {
  const text = `Halo Admin Frame Your Memories! ✂️🎀%0ASaya mau order Gantungan Kunci Handmade Flannel Photobooth dari Web Collabs:%0A%0A🧵 *Warna Flannel:* ${encodeURIComponent(customizerState.frame.colorName)}%0A📸 *Header/Tanggal Strip:* ${encodeURIComponent(customizerState.frame.title)}%0A🎀 *Custom Charm:* Pita Flannel & Rantai Biji Lada%0A%0ABagaimana cara kirim 3 fotonya ya min? Terima kasih!`;
  
  const waUrl = `https://wa.me/${BRAND_CONFIG.frame.waNumber}?text=${text}`;
  window.open(waUrl, '_blank');
}

// ==========================================
// 7. DIRECT ROUTING TO SPECIFIC BRAND CS
// ==========================================
function directToBrandCs(brandKey, productOrContext = 'Umum') {
  let targetNumber = '';
  let brandName = '';
  let defaultMessage = '';

  if (brandKey === 'vibeats') {
    targetNumber = BRAND_CONFIG.vibeats.waNumber;
    brandName = BRAND_CONFIG.vibeats.name;
    defaultMessage = `Halo ${BRAND_CONFIG.vibeats.csTitle}! 👋%0ASaya tertarik dan mau order / tanya custom untuk produk: *${encodeURIComponent(productOrContext)}*.%0ABoleh minta info price list, katalog lagu Spotify, dan format fotonya? Terima kasih!`;
  } else if (brandKey === 'frame') {
    targetNumber = BRAND_CONFIG.frame.waNumber;
    brandName = BRAND_CONFIG.frame.name;
    defaultMessage = `Halo ${BRAND_CONFIG.frame.csTitle}! 👋%0ASaya tertarik dan mau order / tanya custom untuk produk: *${encodeURIComponent(productOrContext)}*.%0ABoleh minta info pilihan warna kain flannel kaku dan cara kirim fotonya? Terima kasih!`;
  } else {
    // Default Collab
    targetNumber = BRAND_CONFIG.vibeats.waNumber;
    defaultMessage = `Halo Admin Collabs! 👋%0ASaya mau order *${encodeURIComponent(productOrContext)}*. Mohon info pemesanan bundling ya!`;
  }

  const waUrl = `https://wa.me/${targetNumber}?text=${defaultMessage}`;
  window.open(waUrl, '_blank');
}

// ==========================================
// 8. CS ROUTING MODAL HANDLERS
// ==========================================
function openCsRoutingModal(productName = null) {
  currentSelectedProduct = productName;
  const modal = document.getElementById('cs-modal');
  const selectedTag = document.getElementById('modal-selected-product');
  const nameLabel = document.getElementById('modal-product-name');
  const subtitle = document.getElementById('modal-subtitle');

  if (productName) {
    selectedTag.classList.remove('hidden');
    nameLabel.textContent = productName;
    subtitle.textContent = `Kamu sedang memilih "${productName}". Mau pesan ke Admin brand mana?`;
  } else {
    selectedTag.classList.add('hidden');
    subtitle.textContent = 'Pilih kontak Customer Service sesuai produk yang ingin kamu pesan atau konsultasikan:';
  }

  modal.classList.remove('hidden');
  lucide.createIcons();
}

function closeCsModal() {
  const modal = document.getElementById('cs-modal');
  modal.classList.add('hidden');
  currentSelectedProduct = null;
}

function executeCsRedirect(brandKey) {
  const productContext = currentSelectedProduct || 'Konsultasi Produk';
  if (brandKey === 'collab') {
    // When ordering combo, message mentions both
    const msg = `Halo Admin Collabs! ✨%0ASaya ingin memesan *Combo Collabs Duo Memories* (1 Spotify Acrylic Vibeats + 1 Felt Photobooth Frame). Mohon dibantu ya!`;
    const waUrl = `https://wa.me/${BRAND_CONFIG.vibeats.waNumber}?text=${msg}`;
    window.open(waUrl, '_blank');
  } else {
    directToBrandCs(brandKey, productContext);
  }
  closeCsModal();
}

// Close modal when clicking outside
window.addEventListener('click', function(e) {
  const modal = document.getElementById('cs-modal');
  if (e.target === modal) {
    closeCsModal();
  }
});

// Close modal with ESC key
window.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeCsModal();
  }
});

