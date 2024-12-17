# Gmail Generator Tool

Gmail Generator Tool

Sebuah tool untuk menghasilkan variasi alamat Gmail yang valid menggunakan teknik dot (.) dan plus (+). Semua variasi akan tetap mengirim email ke alamat Gmail utama Anda.

> **Catatan Penting**: Project ini sepenuhnya dibuat dan di-generate menggunakan AI Claude-3.5 Sonnet, termasuk struktur project, kode, dan dokumentasi.

## 🌟 Fitur

### Single Email Generator
- 📧 Generate variasi email dengan teknik dot (.)
- ➕ Generate variasi email dengan teknik plus (+)
- 🔄 Generate variasi campuran (dot + plus)
- 📋 Copy hasil ke clipboard
- 💾 Download hasil dalam format .txt

### Bulk Email Generator 
- 📤 Upload file .txt dan .csv untuk batch processing
- 🔢 Generate variasi untuk banyak email sekaligus
- 📋 Copy semua hasil ke clipboard
- 💾 Download semua hasil dalam format .txt

### Fitur Tambahan
- 🌓 Dark/Light mode
- 📱 Responsive design
- 📊 Tampilan grid dan list
- 🔢 Pagination untuk hasil yang banyak
- ⚡️ Performa yang optimal
- 🎯 Validasi input email
- 🔍 Preview nomor urut pada setiap variasi
- 💫 Animasi dan transisi yang smooth

## 🛠️ Teknologi yang Digunakan

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)
- [Tauri](https://tauri.studio/)

## 🚀 Cara Menjalankan Proyek

### Sebagai Aplikasi Web
1. Clone repository
2. Install dependencies dengan `npm install`
3. Jalankan development server dengan `npm run dev`
4. Buka browser dan akses `http://localhost:3000`

### Sebagai Aplikasi Desktop
1. **Pastikan Rust dan Tauri CLI terinstall**

   #### Instalasi Rust
   - **Windows**: 
     - Unduh dan jalankan [Rustup installer](https://rustup.rs/).
     - Ikuti petunjuk instalasi di layar.
   - **macOS**:
     - Buka Terminal dan jalankan:
       ```bash
       curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
       ```
     - Ikuti petunjuk di layar.
   - **Linux**:
     - Buka Terminal dan jalankan:
       ```bash
       curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
       ```
     - Ikuti petunjuk di layar.

   #### Instalasi Tauri CLI
   - Setelah Rust terinstall, jalankan:
     ```bash
     cargo install tauri-cli
     ```

2. Clone repository
3. Install dependencies dengan `npm install`
4. Jalankan aplikasi desktop dengan `npm run tauri dev`

## 📝 Cara Penggunaan

### Single Email
1. Masukkan username Gmail Anda (tanpa @gmail.com)
2. Klik tombol "Generate"
3. Pilih jenis variasi yang diinginkan (Dot/Plus/Mix)
4. Copy atau download hasil yang diinginkan

### Bulk Email
1. Siapkan file .txt/.csv yang berisi daftar email
2. Upload file melalui tombol "Upload"
3. Pilih jenis variasi yang diinginkan
4. Tunggu proses generate selesai
5. Download atau copy semua hasil

### Pengaturan Tampilan
- Pilih tampilan grid atau list sesuai preferensi
- Atur jumlah item per halaman jika diperlukan

## ✨ Jenis Variasi

### Dot Variations (.)
Gmail mengabaikan titik dalam alamat email.
### Plus Variations (+)
Gmail mengabaikan semua karakter setelah tanda plus.
### Mix Variations
Kombinasi dari kedua teknik di atas.

## 🔧 Scripts

- `npm run dev` - Menjalankan development server
- `npm run build` - Build project untuk production
- `npm run lint` - Menjalankan ESLint
- `npm run preview` - Preview build hasil production
- `npm run tauri dev` - Menjalankan aplikasi desktop dengan Tauri
- `npm run tauri build` - Build aplikasi desktop untuk distribusi

## 🤝 Kontribusi

Kontribusi selalu diterima! Silakan buat pull request atau issue jika menemukan bug atau memiliki saran pengembangan.

## 📄 Lisensi

[MIT License](LICENSE)

## 👨‍💻 Author

[NanoDG]

---

⭐️ Jika project ini membantu, berikan bintang di GitHub!
