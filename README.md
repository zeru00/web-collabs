# Vibeats Keychain × Frame Your Memories Collabs Website

Website resmi kolaborasi brand gantungan kunci:
1. **Vibeats Keychain**: Gantungan kunci akrilik Spotify Barcode jernih tebal 3mm (scannable barcode, foto custom & lagu favorit).
2. **Frame Your Memories**: Gantungan kunci handmade dari kain flannel kaku yang dijahit membentuk frame foto booth memanjang vertikal (muat 3-4 foto kenangan).

---

## 🎨 Konsep Desain & Nuansa Warna
- **Gradasi Red Moonlight & Blue Moonlight**: Sentuhan kosmik malam yang aesthetic.
- **Aksen Burgundy & Ungu Gelap**: Memberikan kesan mewah, elegan, dan harmonis antara kedua brand.
- **Glassmorphism & Realistic Mockup**: Efek akrilik kilau kaca (*high gloss reflection*) untuk Vibeats dan tekstur jahitan kain (*felt stitches*) untuk Frame Your Memories.

---

## ✨ Fitur Unggulan Website

1. **Routing Customer Service Terpisah**:
   - Tiap produk dan tombol order secara otomatis mengarahkan pelanggan ke WhatsApp Customer Service brand yang sesuai (*Vibeats CS* atau *Frame Your Memories CS*).
   - Teks pesan WhatsApp terisi otomatis secara rapi mencantumkan nama produk, kode promo, dan spesifikasi custom.
2. **Interactive Live Customizer (Coba Desain Sendiri)**:
   - **Tab Vibeats**: Pelanggan bisa mengetik judul lagu & artis, memilih cover, mengunggah foto sendiri, dan mengganti bentuk akrilik dengan render realistis.
   - **Tab Frame Your Memories**: Pelanggan bisa mengganti warna kain flannel, melihat preview strip 3 foto memanjang, serta mengaktifkan pita & rantai biji lada.
3. **Banner Promo Masing-Masing Brand**:
   - Promo Vibeats: Voucher `VIBEATMINI` (Beli 2 gratis 1 mini charm).
   - Promo Frame Your Memories: Voucher `FREEMEMORY` (Gratis aksen pita & charm inisial).
   - Promo Collab Bundle: **Duo Memories Pack** (1 Akrilik Spotify + 1 Flannel Photobooth) diskon 20%.
4. **Katalog Produk Lengkap dengan Tag Harga**:
   - Dilengkapi harga normal dan harga diskon (strikethrough).
   - Filter tab berdasarkan brand (*Semua, Vibeats, Frame Memories, Collab Pack*).
5. **Mobile-Friendly & Super Cepat**:
   - Responsive di HP, tablet, maupun laptop.

---

## 🛠️ Cara Mengubah Nomor WhatsApp Admin

Buka file [script.js](file:///c:/Users/MP2KT/OneDrive/Desktop/project/projectcollabs/script.js#L11-L26) di baris 11-26:

```javascript
const BRAND_CONFIG = {
  vibeats: {
    name: 'Vibeats Keychain',
    waNumber: '6281234567890', // Ganti dengan nomor WA Admin Vibeats (tanpa simbol + atau spasi)
    instagram: '@vibeats.keychain',
    // ...
  },
  frame: {
    name: 'Frame Your Memories',
    waNumber: '6289876543210', // Ganti dengan nomor WA Admin Frame Your Memories
    instagram: '@frameyourmemories.id',
    // ...
  }
};
```

---

## 🚀 Cara Menjalankan Website

### Cara 1: Langsung Buka di Browser
Cukup klik dua kali file `index.html` di file explorer.

### Cara 2: Menggunakan Local Server (Node.js)
Jalankan di terminal:
```bash
npx serve .
```
Lalu buka alamat `http://localhost:3000` di browser.

