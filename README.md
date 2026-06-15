```python
import os

readme_content = """# 🚀 Minimalist Glassmorphic Kanban Task Manager

Sebuah aplikasi pengelola tugas (*Task Manager*) modern berformat **Kanban Board** dengan estetika visual **Clean Minimalist ala Notion** yang dikombinasikan dengan efek **Glassmorphic premium** berkilau emas (*gold accent*). 

Proyek ini dibangun menggunakan *full-stack modern web stack* dengan integrasi database non-relasional yang andal.

---

## ✨ Fitur Utama
- **Estetika Glassmorphism & Notion Gold:** UI bersih, minimalis, menggunakan efek kaca transparan (`backdrop-blur`) dengan sentuhan warna emas/amber yang mewah namun elegan.
- **Full-Stack CRUD Architecture:** Operasi pembuatan, pembacaan, pembaruan status, dan penghapusan tugas terintegrasi langsung dari *frontend* ke *backend*.
- **Interactive Kanban Board Grid:** Pembagian tugas ke dalam 3 kolom interaktif (*To Do*, *In Progress*, dan *Done*) lengkap dengan perhitungan jumlah tugas dinamis.
- **Glowing Priority Border Badges:** Kartu tugas memiliki efek pencahayaan tepi (*glowing border*) otomatis yang membedakan tingkat urgensi berdasarkan warna (High = Merah, Medium = Emas, Low = Hijau).
- **Persistent Data Storage:** Data tersimpan secara permanen di database lokal, aman dari risiko kehilangan data saat halaman dimuat ulang (*refresh*).

---

## 🛠️ Stack Teknologi
- **Framework Frontend/Backend:** Next.js (App Router)
- **Bahasa Pemrograman:** TypeScript & JavaScript
- **Styling UI:** Tailwind CSS (Custom Backdrop-Blur & Arbitrary Shadow)
- **Komponen Ikon:** Lucide React
- **Database:** MongoDB
- **Object Data Modeling (ODM):** Mongoose

---

## 📂 Struktur Proyek

```

```text
SUCCESS

```text
web-sederhana/
├── app/
│   ├── api/
│   │   └── tasks/
│   │       ├── route.ts          # Endpoint GET (Read) & POST (Create)
│   │       └── [id]/
│   │           └── route.ts      # Endpoint PUT (Update Status) & DELETE
│   ├── layout.tsx
│   └── page.tsx                  # UI Kanban Board Glassmorphism (Frontend)
├── lib/
│   └── db.ts                     # Konfigurasi & Caching Koneksi MongoDB
├── models/
│   └── Task.ts                   # Mongoose Schema & Interface TypeScript Task
├── .env.local                    # Konfigurasi Environment Variable (Lokal)
├── package.json
└── tsconfig.json

```

---

## 🚀 Panduan Instalasi & Menjalankan Lokal

### 1. Prasyarat

Pastikan perangkat Anda sudah terinstal:

* [Node.js](https://nodejs.org/) (Versi terbaru direkomendasikan)
* [MongoDB Community Server](https://www.mongodb.com/try/download/community) & [MongoDB Compass](https://www.mongodb.com/products/tools/compass) (Sedang berjalan di `localhost:27017`)

### 2. Kloning Repositori

```bash
git clone [https://github.com/USERNAME_ANDA/NAMA_REPOSITORI.git](https://github.com/USERNAME_ANDA/NAMA_REPOSITORI.git)
cd web-sederhana

```

### 3. Instal Dependensi

Instal semua package dan library yang dibutuhkan:

```bash
npm install

```

### 4. Konfigurasi Database (Environment)

Buat file bernama `.env.local` di root folder proyek (`web-sederhana/`) dan masukkan string koneksi MongoDB Anda:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/taskmanager_db

```

*(Catatan: Proyek ini menggunakan skema manajemen koneksi global caching untuk mencegah penumpukan koneksi selama proses Hot Module Replacement).*

### 5. Jalankan Server Development

Nyalakan server lokal Next.js:

```bash
npm run dev

```

Buka browser Anda dan akses **`http://localhost:3000`** (atau port alternatif seperti `3001` jika port 3000 sedang terkunci).

---

## 🛡️ Praktik Keamanan & Git

File `.env.local` yang berisi string koneksi database lokal Anda telah dikonfigurasi di dalam `.gitignore` agar tidak ikut terunggah ke repositori publik GitHub, menjaga kredensial database Anda tetap aman secara lokal.

---

*Proyek ini dikembangkan sebagai implementasi fungsional pengembangan web full-stack modern dengan performa tinggi menggunakan Next.js Turbopack.*
"""

with open("README.md", "w", encoding="utf-8") as f:
f.write(readme_content)

print("SUCCESS")

