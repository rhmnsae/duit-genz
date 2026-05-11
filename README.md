# Duit GenZ

Website aplikasi keuangan Gen Z dengan tema neo-brutalism + pixel 8-bit ala MUTATIT.

## Stack

- React JS
- Vite
- Tailwind CSS
- Supabase JS
- Lucide React icons

## Struktur

```text
src/
  components/   komponen reusable seperti Navbar, Button, Card
  data/         mock data dashboard
  lib/          koneksi Supabase
  pages/        Landing, Login/Register, Dashboard
  styles/       Tailwind dan global CSS
supabase/
  migrations/   SQL migration
  schema.sql    schema referensi
archive/
  react-native-expo/ backup versi Expo lama
```

## Jalanin lokal

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Env Supabase

Copy `.env.example` ke `.env` lalu isi:

```bash
VITE_SUPABASE_URL=https://PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=PASTE_ANON_KEY_DI_SINI
```
