export const formatRupiah = (value) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value)

export const transactions = [
  { id: 1, title: 'Kopi susu + roti', category: 'Nongkrong', amount: 28000, type: 'expense', source: 'Chat', date: 'Hari ini' },
  { id: 2, title: 'Gajian freelance', category: 'Income', amount: 450000, type: 'income', source: 'Manual', date: 'Kemarin' },
  { id: 3, title: 'Ojol pulang', category: 'Transport', amount: 17000, type: 'expense', source: 'Scan', date: 'Kemarin' },
  { id: 4, title: 'Split ramen', category: 'Makan', amount: 52000, type: 'expense', source: 'Split', date: '2 hari lalu' },
]

export const budgets = [
  { name: 'Makan', used: 760000, limit: 1200000, color: 'bg-banana' },
  { name: 'Nongkrong', used: 420000, limit: 500000, color: 'bg-bubblegum' },
  { name: 'Transport', used: 210000, limit: 400000, color: 'bg-sky' },
  { name: 'Jajan', used: 310000, limit: 350000, color: 'bg-mint' },
]

export const goals = [
  { name: 'Dana darurat', saved: 2400000, target: 5000000 },
  { name: 'HP baru', saved: 1300000, target: 3000000 },
  { name: 'Liburan', saved: 850000, target: 2000000 },
]

export const bills = [
  { name: 'Kos', date: '12 Mei', amount: 750000 },
  { name: 'Internet', date: '15 Mei', amount: 180000 },
  { name: 'Spotify', date: '21 Mei', amount: 55000 },
]

export const cashflow = [
  { month: 'JAN', amount: 820000, progress: 42 },
  { month: 'FEB', amount: 1230000, progress: 54 },
  { month: 'MAR', amount: 1640000, progress: 66 },
  { month: 'APR', amount: 2050000, progress: 78 },
  { month: 'MEI', amount: 2460000, progress: 90 },
]

export const featureCards = [
  ['Chat To Save', 'Ketik transaksi pakai bahasa sehari-hari. Sistem bantu catat otomatis.'],
  ['Scan Struk', 'Foto bukti bayar, OCR siap bantu baca total dan item.'],
  ['Split Bill', 'Patungan bisa rata atau per item. Anti drama pas nongkrong.'],
  ['Insight Boncos', 'Lihat kategori paling boros dan saran biar aman.'],
]
