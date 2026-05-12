import {
  BarChart3,
  BellRing,
  Bot,
  Camera,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  Download,
  FileText,
  Flame,
  Goal,
  Home,
  MessageCircle,
  PiggyBank,
  ReceiptText,
  ScanLine,
  Settings,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  UsersRound,
  WalletCards,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import {
  bills,
  budgets,
  cashflow,
  challenges,
  formatRupiah,
  goals,
  insights,
  receiptQueue,
  splitBills,
  transactions,
  wallets,
} from '../data/mockData.js'
import { Button, Card, ProgressBar, SectionLabel } from '../components/ui.jsx'
import { isSupabaseReady } from '../lib/supabase.js'

const dashboardTabs = [
  { id: 'overview', label: 'Overview', icon: Home },
  { id: 'transactions', label: 'Transaksi', icon: ReceiptText },
  { id: 'assistant', label: 'AI Input', icon: Bot },
  { id: 'budgets', label: 'Budget', icon: Target },
  { id: 'goals', label: 'Goals', icon: Goal },
  { id: 'bills', label: 'Tagihan', icon: BellRing },
  { id: 'split', label: 'Split Bill', icon: UsersRound },
  { id: 'insights', label: 'Insights', icon: BarChart3 },
  { id: 'wallets', label: 'Wallet', icon: WalletCards },
  { id: 'settings', label: 'Settings', icon: Settings },
]

function StatCard({ label, value, note, color, icon: Icon }) {
  return (
    <Card color={color} className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[9px] font-black leading-5 text-muted">{label}</p>
        {Icon && <Icon size={22} />}
      </div>
      <h3 className="text-base font-black leading-7 md:text-lg">{value}</h3>
      <p className="text-[9px] font-black leading-5 text-muted">{note}</p>
    </Card>
  )
}

function PageTitle({ eyebrow, title, desc }) {
  return (
    <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
      <div>
        <SectionLabel>{eyebrow}</SectionLabel>
        <h1 className="mt-5 text-2xl font-black leading-10 md:text-4xl">{title}</h1>
        <p className="mt-2 max-w-3xl text-[10px] font-black leading-6 text-muted">{desc}</p>
      </div>
      <div className="brutal-card-sm bg-mint px-4 py-3 text-[9px] font-black leading-5">
        SUPABASE: {isSupabaseReady ? 'ON' : 'BELUM CONNECT'}
      </div>
    </div>
  )
}

function SummaryStats({ summary }) {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <StatCard label="SALDO" value={formatRupiah(summary.balance)} note="AMAN BUAT BULAN INI" color="bg-sky" icon={WalletCards} />
      <StatCard label="MASUK" value={formatRupiah(summary.income)} note="+12% DARI BULAN LALU" color="bg-mint" icon={Download} />
      <StatCard label="KELUAR" value={formatRupiah(summary.expense)} note="JANGAN BARBAR" color="bg-bubblegum" icon={CreditCard} />
      <StatCard label="SAVE RATE" value={`${summary.rate}%`} note="TARGET 30%" color="bg-banana" icon={PiggyBank} />
    </section>
  )
}

function Overview({ summary, setTab }) {
  return (
    <div className="space-y-5">
      <PageTitle eyebrow="Control center" title="DASHBOARD KEUANGAN" desc="Ringkasan duit, cashflow, AI warning, dan quick action. Semua kelihatan, nggak ada yang kabur." />
      <SummaryStats summary={summary} />

      <section className="grid gap-4 xl:grid-cols-[1.35fr_.65fr]">
        <Card className="space-y-5">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-sm font-black leading-6">CASHFLOW BULAN INI</h2>
            <Button variant="light" onClick={() => setTab('insights')} className="py-3">Detail</Button>
          </div>
          <div className="space-y-4">
            {cashflow.map((item) => (
              <div key={item.month} className="space-y-2">
                <div className="flex justify-between gap-3 text-[9px] font-black leading-5"><span>{item.month}</span><span>{formatRupiah(item.amount)}</span></div>
                <ProgressBar value={item.progress} color="bg-mint" />
              </div>
            ))}
          </div>
        </Card>
        <Card color="bg-darkcard" className="space-y-5 text-paper">
          <div className="brutal-card-sm inline-grid h-14 w-14 place-items-center bg-banana text-ink"><Bot /></div>
          <h2 className="text-sm font-black leading-6">AI MONEY COACH</h2>
          <p className="text-[10px] font-black leading-6 text-white">BESTIE, NONGKRONG UDAH 84% DARI BUDGET. SISA MINGGU INI PILIH MENU HEMAT DULU.</p>
          <Button variant="banana" onClick={() => setTab('assistant')}>Chat coach</Button>
        </Card>
      </section>

      <section className="grid gap-4 xl:grid-cols-4">
        {[
          ['Catat transaksi', MessageCircle, 'assistant', 'Ketik: beli kopi 18rb'],
          ['Scan struk', Camera, 'assistant', 'Upload foto pembayaran'],
          ['Split bill', UsersRound, 'split', 'Bagi patungan anti drama'],
          ['Budget alert', Flame, 'budgets', 'Cek kategori hampir boncos'],
        ].map(([title, Icon, tab, desc]) => (
          <button key={title} onClick={() => setTab(tab)} className="brutal-card bg-white p-5 text-left transition active:translate-x-1 active:translate-y-1 active:shadow-none">
            <Icon />
            <h3 className="mt-4 text-sm font-black leading-6">{title}</h3>
            <p className="mt-2 text-[9px] font-black leading-5 text-muted">{desc}</p>
          </button>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1fr_1fr]">
        <Card className="space-y-4">
          <h2 className="text-sm font-black leading-6">TRANSAKSI TERBARU</h2>
          {transactions.slice(0, 4).map((item) => <TransactionRow key={item.id} item={item} />)}
        </Card>
        <Card color="bg-banana" className="space-y-4">
          <h2 className="text-sm font-black leading-6">INSIGHT CEPAT</h2>
          {insights.slice(0, 3).map((item) => <InsightItem key={item.title} item={item} />)}
        </Card>
      </section>
    </div>
  )
}

function TransactionRow({ item }) {
  return (
    <div className="grid gap-3 border-[3px] border-ink bg-white p-4 md:grid-cols-[1fr_auto] md:items-center">
      <div>
        <p className="text-[10px] font-black leading-5">{item.title}</p>
        <p className="mt-1 text-[8px] font-black text-muted">#{item.category} / {item.source} / {item.wallet} / {item.date}</p>
      </div>
      <p className={`text-[10px] font-black leading-5 ${item.type === 'income' ? 'text-green-700' : 'text-red-600'}`}>{item.type === 'income' ? '+' : '-'}{formatRupiah(item.amount)}</p>
    </div>
  )
}

function TransactionsPage({ summary }) {
  return (
    <div className="space-y-5">
      <PageTitle eyebrow="Ledger" title="SEMUA TRANSAKSI" desc="Filter income, expense, wallet, sumber input, sampai kategori. Nanti tinggal dihubungkan ke Supabase." />
      <SummaryStats summary={summary} />
      <section className="grid gap-4 xl:grid-cols-[.7fr_1.3fr]">
        <Card color="bg-mint" className="space-y-4">
          <h2 className="text-sm font-black leading-6">FILTER</h2>
          {['Semua', 'Expense', 'Income', 'Scan struk', 'Split bill', 'Belum terkategori'].map((filter) => <button key={filter} className="brutal-card-sm block w-full bg-white px-4 py-3 text-left text-[9px] font-black">{filter}</button>)}
          <Button>Export CSV</Button>
        </Card>
        <Card className="space-y-4">
          <h2 className="text-sm font-black leading-6">RIWAYAT</h2>
          {transactions.map((item) => <TransactionRow key={item.id} item={item} />)}
        </Card>
      </section>
    </div>
  )
}

function AssistantPage() {
  return (
    <div className="space-y-5">
      <PageTitle eyebrow="AI input" title="CATAT DUIT PAKE BAHASA SENDIRI" desc="Chat transaksi, scan struk, voice note, dan koreksi kategori. Dibikin siap untuk OCR + AI parsing." />
      <section className="grid gap-4 xl:grid-cols-3">
        <Card color="bg-banana" className="space-y-4">
          <MessageCircle />
          <h2 className="text-sm font-black leading-6">CHAT INPUT</h2>
          <p className="text-[10px] font-black leading-6 text-muted">Contoh: “beli seblak 22rb cash kategori makan”.</p>
          <textarea className="min-h-32 w-full border-[3px] border-ink bg-white px-4 py-4 text-[10px] font-black" defaultValue="beli kopi 18rb pake e-wallet" />
          <Button>Simpan transaksi</Button>
        </Card>
        <Card className="space-y-4">
          <ScanLine />
          <h2 className="text-sm font-black leading-6">SCAN STRUK</h2>
          <div className="grid h-36 place-items-center border-[3px] border-dashed border-ink bg-paper text-center text-[9px] font-black text-muted">DROP FOTO STRUK / BUKTI TRANSFER</div>
          <Button variant="mint">Upload foto</Button>
        </Card>
        <Card color="bg-bubblegum" className="space-y-4">
          <Bot />
          <h2 className="text-sm font-black leading-6">AI REVIEW</h2>
          <p className="text-[10px] font-black leading-6">AI cek duplikasi, kategori, wallet, dan tanda transaksi mencurigakan.</p>
          <Button>Review antrean</Button>
        </Card>
      </section>
      <section className="grid gap-4 xl:grid-cols-3">
        {receiptQueue.map((item) => <Card key={item.merchant} className="space-y-3"><FileText /><h3 className="text-sm font-black">{item.merchant}</h3><p className="text-[10px] font-black text-muted">{formatRupiah(item.total)} / confidence {item.confidence}%</p><p className="text-[9px] font-black">{item.status}</p></Card>)}
      </section>
    </div>
  )
}

function BudgetsPage() {
  return (
    <div className="space-y-5">
      <PageTitle eyebrow="Budget guard" title="BATAS BONCOS" desc="Pantau limit kategori, reminder, dan challenge hemat biar pengeluaran nggak liar." />
      <section className="grid gap-4 xl:grid-cols-[1.2fr_.8fr]">
        <Card className="space-y-4">
          <h2 className="text-sm font-black leading-6">BUDGET AKTIF</h2>
          {budgets.map((budget) => {
            const percent = Math.round((budget.used / budget.limit) * 100)
            return <div key={budget.name} className="space-y-2 border-[3px] border-ink p-4"><div className="flex justify-between gap-3 text-[9px] font-black leading-5"><span>{budget.name}</span><span>{percent}%</span></div><ProgressBar value={percent} color={budget.color} /><p className="text-[8px] font-black leading-4 text-muted">{formatRupiah(budget.used)} / {formatRupiah(budget.limit)} • reset {budget.reset}</p></div>
          })}
        </Card>
        <Card color="bg-banana" className="space-y-4">
          <Trophy />
          <h2 className="text-sm font-black leading-6">CHALLENGE HEMAT</h2>
          {challenges.map((item) => <div key={item.name} className="space-y-2 border-[3px] border-ink bg-white p-4"><p className="text-[10px] font-black">{item.name}</p><ProgressBar value={item.progress} color="bg-mint" /><p className="text-[8px] font-black text-muted">Reward: {item.reward}</p></div>)}
        </Card>
      </section>
    </div>
  )
}

function GoalsPage() {
  return (
    <div className="space-y-5">
      <PageTitle eyebrow="Dream wallet" title="TABUNGAN & TARGET" desc="Dana darurat, modal, liburan, gadget—semua target punya progress dan estimasi kapan tercapai." />
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {goals.map((goal) => {
          const percent = Math.round((goal.saved / goal.target) * 100)
          return <Card key={goal.name} color="bg-sky" className="space-y-4"><div className="text-3xl">{goal.emoji}</div><h2 className="text-sm font-black leading-6">{goal.name}</h2><ProgressBar value={percent} color="bg-banana" /><p className="text-[9px] font-black leading-5 text-muted">{formatRupiah(goal.saved)} / {formatRupiah(goal.target)}</p><p className="text-[9px] font-black">Deadline: {goal.deadline}</p></Card>
        })}
      </section>
    </div>
  )
}

function BillsPage() {
  return (
    <div className="space-y-5">
      <PageTitle eyebrow="Bill tracker" title="TAGIHAN & SUBSCRIPTION" desc="Pantau kos, internet, listrik, langganan, cicilan, dan reminder otomatis." />
      <section className="grid gap-4 xl:grid-cols-[1.2fr_.8fr]">
        <Card className="space-y-4">
          {bills.map((bill) => <div key={bill.name} className="flex justify-between gap-4 border-[3px] border-ink bg-white p-4"><div><p className="text-[10px] font-black leading-5">{bill.name}</p><p className="mt-1 text-[8px] font-black text-muted">Jatuh tempo {bill.date} • auto-pay {bill.auto ? 'ON' : 'OFF'}</p></div><div className="text-right"><p className="text-[10px] font-black leading-5">{formatRupiah(bill.amount)}</p><p className="text-[8px] font-black uppercase text-muted">{bill.status}</p></div></div>)}
        </Card>
        <Card color="bg-mint" className="space-y-4"><BellRing /><h2 className="text-sm font-black leading-6">REMINDER</h2><p className="text-[10px] font-black leading-6">Kirim notifikasi H-3, H-1, dan hari H. Kalau saldo wallet kurang, kasih warning.</p><Button>Buat reminder</Button></Card>
      </section>
    </div>
  )
}

function SplitPage() {
  return (
    <div className="space-y-5">
      <PageTitle eyebrow="Anti drama" title="SPLIT BILL" desc="Bagi rata, per item, pajak/service, status bayar, dan template tagihan WhatsApp." />
      <section className="grid gap-4 xl:grid-cols-[.9fr_1.1fr]">
        <Card color="bg-bubblegum" className="space-y-4">
          <UsersRound />
          <h2 className="text-sm font-black leading-6">BUAT SPLIT BARU</h2>
          <input className="w-full border-[3px] border-ink bg-white px-4 py-4 text-[10px] font-black" defaultValue="156000" />
          <input className="w-full border-[3px] border-ink bg-white px-4 py-4 text-[10px] font-black" defaultValue="Sae, Dya, Raka" />
          <p className="text-[10px] font-black leading-6">RP 52.000 / ORANG</p>
          <Button>Bikin split</Button>
        </Card>
        <Card className="space-y-4">
          <h2 className="text-sm font-black leading-6">RIWAYAT SPLIT</h2>
          {splitBills.map((item) => <div key={item.place} className="border-[3px] border-ink bg-white p-4"><p className="text-[10px] font-black">{item.place}</p><p className="mt-2 text-[8px] font-black text-muted">{formatRupiah(item.total)} • {item.people.join(', ')}</p><p className="mt-2 text-[9px] font-black">{item.status}</p></div>)}
        </Card>
      </section>
    </div>
  )
}

function InsightItem({ item }) {
  const color = item.level === 'good' ? 'bg-mint' : item.level === 'danger' ? 'bg-bubblegum' : 'bg-banana'
  return <div className={`border-[3px] border-ink ${color} p-4`}><p className="text-[10px] font-black leading-5">{item.title}</p><p className="mt-2 text-[9px] font-black leading-5 text-muted">{item.desc}</p></div>
}

function InsightsPage() {
  return (
    <div className="space-y-5">
      <PageTitle eyebrow="AI analytics" title="INSIGHT & LAPORAN" desc="Analisis kebiasaan belanja, cashflow, saving rate, dan prediksi saldo akhir bulan." />
      <section className="grid gap-4 xl:grid-cols-[1fr_1fr]">
        <Card className="space-y-5"><h2 className="text-sm font-black leading-6">CASHFLOW DETAIL</h2>{cashflow.map((item) => <div key={item.month} className="grid gap-3 border-[3px] border-ink p-4 md:grid-cols-3"><p className="text-[10px] font-black">{item.month}</p><p className="text-[9px] font-black text-green-700">IN {formatRupiah(item.income)}</p><p className="text-[9px] font-black text-red-600">OUT {formatRupiah(item.expense)}</p></div>)}</Card>
        <Card color="bg-banana" className="space-y-4"><h2 className="text-sm font-black leading-6">AI TEMUAN</h2>{insights.map((item) => <InsightItem key={item.title} item={item} />)}</Card>
      </section>
    </div>
  )
}

function WalletsPage() {
  return (
    <div className="space-y-5">
      <PageTitle eyebrow="Multi wallet" title="DOMPET & AKUN" desc="Cash, bank, e-wallet, tabungan, dan nanti bisa rekonsiliasi mutasi otomatis." />
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {wallets.map((wallet) => <Card key={wallet.name} color={wallet.color} className="space-y-3"><WalletCards /><p className="text-[10px] font-black leading-5">{wallet.name}</p><h2 className="text-base font-black leading-7">{formatRupiah(wallet.balance)}</h2><p className="text-[8px] font-black text-muted">SYNC MANUAL</p></Card>)}
      </section>
      <Card className="space-y-4"><h2 className="text-sm font-black leading-6">REKONSILIASI</h2><p className="text-[10px] font-black leading-6 text-muted">Cocokkan transaksi dari struk, chat, dan mutasi. Kalau ada selisih, sistem kasih warning.</p></Card>
    </div>
  )
}

function SettingsPage() {
  return (
    <div className="space-y-5">
      <PageTitle eyebrow="Setup" title="PENGATURAN" desc="Profile, kategori, wallet, security, ekspor data, dan koneksi Supabase." />
      <section className="grid gap-4 xl:grid-cols-3">
        {[['Kategori custom', Target], ['Security PIN', ShieldCheck], ['Export data', Download], ['Notifikasi', BellRing], ['Backup Supabase', Sparkles], ['Tema pixel', CheckCircle2]].map(([title, Icon]) => <Card key={title} className="space-y-4"><Icon /><h2 className="text-sm font-black leading-6">{title}</h2><p className="text-[9px] font-black leading-5 text-muted">Siap dihubungkan ke backend.</p><Button variant="light">Atur <ChevronRight size={16} /></Button></Card>)}
      </section>
    </div>
  )
}

export default function Dashboard() {
  const [tab, setTab] = useState('overview')
  const summary = useMemo(() => {
    const income = transactions.filter((item) => item.type === 'income').reduce((sum, item) => sum + item.amount, 0)
    const expense = transactions.filter((item) => item.type === 'expense').reduce((sum, item) => sum + item.amount, 0)
    return { income, expense, balance: income - expense, rate: income ? Math.round(((income - expense) / income) * 100) : 0 }
  }, [])

  const pages = {
    overview: <Overview summary={summary} setTab={setTab} />,
    transactions: <TransactionsPage summary={summary} />,
    assistant: <AssistantPage />,
    budgets: <BudgetsPage />,
    goals: <GoalsPage />,
    bills: <BillsPage />,
    split: <SplitPage />,
    insights: <InsightsPage />,
    wallets: <WalletsPage />,
    settings: <SettingsPage />,
  }

  return (
    <main id="dashboard" className="pixel-bg mx-auto grid w-full max-w-7xl gap-5 px-4 py-8 xl:grid-cols-[260px_1fr]">
      <aside className="brutal-card h-fit bg-white p-3 xl:sticky xl:top-28">
        <div className="mb-4 border-[3px] border-ink bg-banana p-4">
          <p className="text-[8px] font-black leading-4 text-muted">DUIT GENZ APP</p>
          <h2 className="mt-2 text-sm font-black leading-6">FINANCE OS</h2>
        </div>
        <nav className="grid gap-2">
          {dashboardTabs.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setTab(id)} className={`flex items-center gap-3 border-[3px] border-ink px-3 py-3 text-left text-[9px] font-black uppercase leading-5 transition active:translate-x-1 active:translate-y-1 ${tab === id ? 'bg-mint shadow-[3px_3px_0_#111]' : 'bg-paper'}`}>
              <Icon size={17} /> {label}
            </button>
          ))}
        </nav>
      </aside>
      <section className="min-w-0">{pages[tab]}</section>
    </main>
  )
}
