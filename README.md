# Duit GenZ

Aplikasi keuangan Gen Z dengan vibe neo-brutalism ala MUTATIT: simpel, playful, dan nggak bikin pusing.

## Stack

- Expo / React Native
- NativeWind + TailwindCSS
- Supabase
- Expo Image Picker

## Fitur MVP

- Dashboard saldo, uang masuk, uang keluar
- Catat transaksi lewat chat natural, contoh: `beli kopi 18rb`
- Upload foto struk/bukti bayar sebagai fondasi OCR
- Split bill patungan cepat
- Schema Supabase untuk `transactions`, `budgets`, dan `split_bills`

## Setup

```bash
npm install
cp .env.example .env
npm start
```

Isi `.env`:

```bash
EXPO_PUBLIC_SUPABASE_URL=https://PROJECT_ID.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=PASTE_ANON_KEY_DI_SINI
```

Lalu jalankan SQL di `supabase/schema.sql` lewat Supabase SQL Editor.

## Catatan next step

- Tambah auth Supabase
- Upload receipt ke Supabase Storage
- OCR lokal/gratis untuk baca struk
- Parser chat lebih pintar pakai Ollama lokal
- Landing page marketing web
