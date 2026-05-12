export const formatRupiah = (value) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value)

export const wallets = [
  { name: 'Cash', balance: 320000, color: 'bg-banana' },
  { name: 'BCA', balance: 3150000, color: 'bg-sky' },
  { name: 'E-Wallet', balance: 540000, color: 'bg-mint' },
  { name: 'Tabungan', balance: 4200000, color: 'bg-bubblegum' },
]

export const transactions = [
  { id: 1, title: 'Kopi susu + roti', category: 'Nongkrong', amount: 28000, type: 'expense', source: 'Chat', wallet: 'E-Wallet', date: 'Hari ini' },
  { id: 2, title: 'Gajian freelance', category: 'Income', amount: 450000, type: 'income', source: 'Manual', wallet: 'BCA', date: 'Kemarin' },
  { id: 3, title: 'Ojol pulang', category: 'Transport', amount: 17000, type: 'expense', source: 'Scan', wallet: 'E-Wallet', date: 'Kemarin' },
  { id: 4, title: 'Split ramen', category: 'Makan', amount: 52000, type: 'expense', source: 'Split', wallet: 'Cash', date: '2 hari lalu' },
  { id: 5, title: 'Bayar internet', category: 'Tagihan', amount: 180000, type: 'expense', source: 'Bill', wallet: 'BCA', date: '3 hari lalu' },
  { id: 6, title: 'Jual template', category: 'Income', amount: 275000, type: 'income', source: 'Manual', wallet: 'BCA', date: '4 hari lalu' },
  { id: 7, title: 'Seblak level 3', category: 'Makan', amount: 22000, type: 'expense', source: 'Chat', wallet: 'Cash', date: '4 hari lalu' },
  { id: 8, title: 'Top up game', category: 'Hiburan', amount: 99000, type: 'expense', source: 'Manual', wallet: 'E-Wallet', date: '5 hari lalu' },
]

export const budgets = [
  { name: 'Makan', used: 760000, limit: 1200000, color: 'bg-banana', reset: 'Bulanan' },
  { name: 'Nongkrong', used: 420000, limit: 500000, color: 'bg-bubblegum', reset: 'Bulanan' },
  { name: 'Transport', used: 210000, limit: 400000, color: 'bg-sky', reset: 'Bulanan' },
  { name: 'Jajan', used: 310000, limit: 350000, color: 'bg-mint', reset: 'Mingguan' },
  { name: 'Hiburan', used: 99000, limit: 250000, color: 'bg-banana', reset: 'Bulanan' },
]

export const goals = [
  { name: 'Dana darurat', saved: 2400000, target: 5000000, deadline: 'Des 2026', emoji: '🛟' },
  { name: 'HP baru', saved: 1300000, target: 3000000, deadline: 'Sep 2026', emoji: '📱' },
  { name: 'Liburan', saved: 850000, target: 2000000, deadline: 'Agu 2026', emoji: '🏖️' },
  { name: 'Modal jualan', saved: 620000, target: 1500000, deadline: 'Jul 2026', emoji: '🚀' },
]

export const bills = [
  { name: 'Kos', date: '12 Mei', amount: 750000, status: 'urgent', auto: false },
  { name: 'Internet', date: '15 Mei', amount: 180000, status: 'soon', auto: true },
  { name: 'Spotify', date: '21 Mei', amount: 55000, status: 'safe', auto: true },
  { name: 'Listrik', date: '25 Mei', amount: 120000, status: 'safe', auto: false },
]

export const cashflow = [
  { month: 'JAN', income: 2100000, expense: 1280000, amount: 820000, progress: 42 },
  { month: 'FEB', income: 2600000, expense: 1370000, amount: 1230000, progress: 54 },
  { month: 'MAR', income: 3100000, expense: 1460000, amount: 1640000, progress: 66 },
  { month: 'APR', income: 3800000, expense: 1750000, amount: 2050000, progress: 78 },
  { month: 'MEI', income: 4300000, expense: 1840000, amount: 2460000, progress: 90 },
]

export const splitBills = [
  { place: 'Ramen bar', total: 156000, people: ['Sae', 'Dya', 'Raka'], status: 'Belum semua bayar' },
  { place: 'Kopi sore', total: 84000, people: ['Sae', 'Dya'], status: 'Lunas' },
  { place: 'Nobar', total: 225000, people: ['Sae', 'Dya', 'Raka', 'Nisa', 'Fahmi'], status: 'Tagih 2 orang' },
]

export const insights = [
  { title: 'Nongkrong hampir limit', desc: 'Budget nongkrong sudah 84%. Sisa bulan ini coba pilih tempat yang lebih hemat.', level: 'warning' },
  { title: 'Income naik', desc: 'Pemasukan bulan ini naik 13% dari bulan lalu. Mantap, jangan langsung foya-foya.', level: 'good' },
  { title: 'Tagihan dekat', desc: 'Kos jatuh tempo 12 Mei. Siapkan dana biar nggak panik.', level: 'danger' },
  { title: 'Saving rate aman', desc: 'Kamu masih di jalur 30% tabungan kalau expense minggu ini dijaga.', level: 'good' },
]

export const receiptQueue = [
  { merchant: 'Minimarket', total: 67300, status: 'Perlu cek kategori', confidence: 86 },
  { merchant: 'Warung makan', total: 34000, status: 'Siap disimpan', confidence: 92 },
  { merchant: 'Parkir', total: 5000, status: 'Foto blur', confidence: 54 },
]

export const challenges = [
  { name: 'No jajan 3 hari', reward: 'Hemat 75rb', progress: 66 },
  { name: 'Masak sendiri 5x', reward: 'Budget makan aman', progress: 40 },
  { name: 'Catat 7 hari streak', reward: 'Insight lebih akurat', progress: 85 },
]

export const featureCards = [
  ['Chat To Save', 'Ketik transaksi pakai bahasa sehari-hari. Sistem bantu catat otomatis.'],
  ['Scan Struk', 'Foto bukti bayar, OCR siap bantu baca total dan item.'],
  ['Split Bill', 'Patungan bisa rata atau per item. Anti drama pas nongkrong.'],
  ['Insight Boncos', 'Lihat kategori paling boros dan saran biar aman.'],
]
