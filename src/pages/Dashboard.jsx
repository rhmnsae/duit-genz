import { Bot, Camera, Download, PiggyBank, ReceiptText, UsersRound } from 'lucide-react'
import { useMemo, useState } from 'react'
import { bills, budgets, cashflow, formatRupiah, goals, transactions as initialTransactions } from '../data/mockData.js'
import { Button, Card, ProgressBar, SectionLabel } from '../components/ui.jsx'
import { isSupabaseReady } from '../lib/supabase.js'

function StatCard({ label, value, note, color }) {
  return (
    <Card color={color} className="space-y-3">
      <p className="text-[9px] font-black leading-5 text-muted">{label}</p>
      <h3 className="text-base font-black leading-7 md:text-lg">{value}</h3>
      <p className="text-[9px] font-black leading-5 text-muted">{note}</p>
    </Card>
  )
}

export default function Dashboard() {
  const [transactions] = useState(initialTransactions)
  const summary = useMemo(() => {
    const income = transactions.filter((item) => item.type === 'income').reduce((sum, item) => sum + item.amount, 0)
    const expense = transactions.filter((item) => item.type === 'expense').reduce((sum, item) => sum + item.amount, 0)
    return { income, expense, balance: income - expense, rate: income ? Math.round(((income - expense) / income) * 100) : 0 }
  }, [transactions])

  return (
    <main className="pixel-bg mx-auto w-full max-w-7xl space-y-5 px-4 py-8">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <SectionLabel>Control center</SectionLabel>
          <h1 className="mt-5 text-2xl font-black leading-10 md:text-4xl">DASHBOARD KEUANGAN</h1>
          <p className="mt-2 text-[10px] font-black leading-6 text-muted">Semua duit kelihatan. Ga ada yang kabur.</p>
        </div>
        <div className="brutal-card-sm bg-mint px-4 py-3 text-[9px] font-black leading-5">SUPABASE: {isSupabaseReady ? 'ON' : 'BELUM CONNECT'}</div>
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="SALDO" value={formatRupiah(summary.balance)} note="AMAN BUAT BULAN INI" color="bg-sky" />
        <StatCard label="MASUK" value={formatRupiah(summary.income)} note="+12% DARI BULAN LALU" color="bg-mint" />
        <StatCard label="KELUAR" value={formatRupiah(summary.expense)} note="JANGAN BARBAR" color="bg-bubblegum" />
        <StatCard label="SAVE RATE" value={`${summary.rate}%`} note="TARGET 30%" color="bg-banana" />
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.35fr_.65fr]">
        <Card className="space-y-5">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-sm font-black leading-6">CASHFLOW BULAN INI</h2>
            <Download size={22} />
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
          <p className="text-[10px] font-black leading-6 text-[#fff8db]">BESTIE, NONGKRONG UDAH 84% DARI BUDGET. KALO MAU AMAN, SISA MINGGU INI PILIH MENU HEMAT DULU.</p>
          <Button variant="banana">Lihat saran</Button>
        </Card>
      </section>

      <section className="grid gap-4 xl:grid-cols-3" id="split">
        <Card color="bg-banana" className="space-y-4">
          <ReceiptText />
          <h2 className="text-sm font-black leading-6">CHAT INPUT</h2>
          <p className="text-[10px] font-black leading-6 text-muted">Ketik natural: “beli kopi 18rb”. Nanti masuk data.</p>
          <input className="w-full border-[3px] border-ink bg-white px-4 py-4 text-[10px] font-black" defaultValue="beli kopi 18rb" />
          <Button>Simpan</Button>
        </Card>
        <Card className="space-y-4">
          <Camera />
          <h2 className="text-sm font-black leading-6">SCAN STRUK</h2>
          <p className="text-[10px] font-black leading-6 text-muted">Upload foto struk buat OCR dan auto catat.</p>
          <div className="grid h-28 place-items-center border-[3px] border-dashed border-ink bg-paper text-[9px] font-black text-muted">DROP FOTO DI SINI</div>
          <Button variant="mint">Upload foto</Button>
        </Card>
        <Card color="bg-bubblegum" className="space-y-4">
          <UsersRound />
          <h2 className="text-sm font-black leading-6">SPLIT BILL</h2>
          <input className="w-full border-[3px] border-ink bg-white px-4 py-4 text-[10px] font-black" defaultValue="156000" />
          <input className="w-full border-[3px] border-ink bg-white px-4 py-4 text-[10px] font-black" defaultValue="Sae, Dya, Raka" />
          <p className="text-[10px] font-black leading-6">RP 52.000 / ORANG</p>
          <Button>Bikin split</Button>
        </Card>
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <Card className="space-y-4">
          <h2 className="text-sm font-black leading-6">BUDGET</h2>
          {budgets.map((budget) => {
            const percent = Math.round((budget.used / budget.limit) * 100)
            return (
              <div key={budget.name} className="space-y-2">
                <div className="flex justify-between gap-3 text-[9px] font-black leading-5"><span>{budget.name}</span><span>{percent}%</span></div>
                <ProgressBar value={percent} color={budget.color} />
                <p className="text-[8px] font-black leading-4 text-muted">{formatRupiah(budget.used)} / {formatRupiah(budget.limit)}</p>
              </div>
            )
          })}
        </Card>
        <Card color="bg-sky" className="space-y-4">
          <PiggyBank />
          <h2 className="text-sm font-black leading-6">GOALS</h2>
          {goals.map((goal) => <div key={goal.name} className="border-[3px] border-ink bg-white p-4"><p className="text-[10px] font-black leading-5">{goal.name}</p><p className="mt-2 text-[8px] font-black leading-4 text-muted">{formatRupiah(goal.saved)} / {formatRupiah(goal.target)}</p></div>)}
        </Card>
        <Card color="bg-mint" className="space-y-4">
          <h2 className="text-sm font-black leading-6">TAGIHAN</h2>
          {bills.map((bill) => <div key={bill.name} className="flex justify-between gap-4 border-[3px] border-ink bg-white p-4"><div><p className="text-[10px] font-black leading-5">{bill.name}</p><p className="mt-1 text-[8px] font-black text-muted">{bill.date}</p></div><p className="text-[10px] font-black leading-5">{formatRupiah(bill.amount)}</p></div>)}
        </Card>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.4fr_.6fr]">
        <Card className="space-y-4">
          <h2 className="text-sm font-black leading-6">RIWAYAT</h2>
          {transactions.map((item) => <div key={item.id} className="grid gap-3 border-[3px] border-ink p-4 md:grid-cols-[1fr_auto] md:items-center"><div><p className="text-[10px] font-black leading-5">{item.title}</p><p className="mt-1 text-[8px] font-black text-muted">#{item.category} / {item.source} / {item.date}</p></div><p className={`text-[10px] font-black leading-5 ${item.type === 'income' ? 'text-green-700' : 'text-red-600'}`}>{item.type === 'income' ? '+' : '-'}{formatRupiah(item.amount)}</p></div>)}
        </Card>
        <Card color="bg-banana" className="space-y-4">
          <h2 className="text-sm font-black leading-6">FITUR PRO</h2>
          {['EXPORT CSV/PDF', 'MULTI WALLET', 'RECURRING BILL', 'DEBT TRACKER', 'OCR RECEIPT', 'AI CATEGORY'].map((feature) => <p key={feature} className="text-[10px] font-black leading-6">▣ {feature}</p>)}
        </Card>
      </section>
    </main>
  )
}
