import { Bot, Camera, ChartNoAxesCombined, ReceiptText, ShieldCheck, UsersRound, Zap } from 'lucide-react'
import { Card, LinkButton, SectionLabel } from '../components/ui.jsx'
import { featureCards, formatRupiah } from '../data/mockData.js'

const icons = [Bot, Camera, UsersRound, ChartNoAxesCombined]

export default function Landing({ setPage }) {
  return (
    <main className="pixel-bg">
      <section className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
        <div>
          <SectionLabel>Finance app buat Gen Z</SectionLabel>
          <h1 className="mt-7 max-w-4xl text-3xl font-black leading-[1.25] tracking-tight md:text-5xl lg:text-6xl">
            CATAT DUIT TANPA RIBET. DOMPET JADI KELIHATAN.
          </h1>
          <p className="mt-6 max-w-2xl text-[11px] font-black leading-7 text-muted md:text-xs">
            Duit GenZ bantu kamu nyatet pemasukan, pengeluaran, foto struk, split bill, budget, goals, sampai insight boncos. Simpel, rapi, dan tetap playful ala MUTATIT.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <LinkButton onClick={() => setPage('register')}>Mulai gratis</LinkButton>
            <LinkButton variant="light" onClick={() => setPage('dashboard')}>Lihat dashboard</LinkButton>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {['Chat langsung kesimpan', 'Scan struk OCR-ready', 'Split bill anti drama'].map((item) => (
              <div key={item} className="brutal-card-sm bg-white p-3 text-[9px] font-black leading-5">▣ {item}</div>
            ))}
          </div>
        </div>

        <Card color="bg-sky" className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[9px] font-black text-muted">SALDO BULAN INI</p>
              <h2 className="mt-3 text-xl font-black leading-8 md:text-2xl">{formatRupiah(2480000)}</h2>
            </div>
            <div className="brutal-card-sm grid h-14 w-14 place-items-center bg-banana"><ReceiptText /></div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="border-[3px] border-ink bg-mint p-4"><p className="text-[9px] font-black">MASUK</p><b className="mt-2 block text-sm">RP 4.5JT</b></div>
            <div className="border-[3px] border-ink bg-bubblegum p-4"><p className="text-[9px] font-black">KELUAR</p><b className="mt-2 block text-sm">RP 2.02JT</b></div>
          </div>
          <div className="border-[3px] border-ink bg-banana p-4 text-[10px] font-black leading-6">
            “BESTIE, JAJAN NAIK 28%. MASIH AMAN, TAPI JANGAN BARBAR DULU.”
          </div>
        </Card>
      </section>

      <section id="fitur" className="mx-auto w-full max-w-7xl px-4 py-10">
        <SectionLabel>Fitur lengkap</SectionLabel>
        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {featureCards.map(([title, desc], index) => {
            const Icon = icons[index]
            return (
              <Card key={title} className="min-h-56 space-y-4">
                <div className="brutal-card-sm grid h-14 w-14 place-items-center bg-bubblegum"><Icon /></div>
                <h3 className="text-sm font-black leading-6">{title}</h3>
                <p className="text-[10px] font-black leading-6 text-muted">{desc}</p>
              </Card>
            )
          })}
        </div>
      </section>

      <section id="dashboard" className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-12 lg:grid-cols-[.8fr_1.2fr]">
        <Card color="bg-darkcard" className="space-y-5 text-paper">
          <SectionLabel>Kenapa kepake?</SectionLabel>
          <h2 className="text-2xl font-black leading-9">BUKAN CUMA CATATAN. INI CONTROL CENTER DUIT.</h2>
          <p className="text-[10px] font-black leading-6 text-[#fff8db]">Dashboard dibuat lengkap tapi tetap gampang dibaca: cashflow, budget, goals, tagihan, riwayat, dan AI money coach.</p>
        </Card>
        <div className="grid gap-4 md:grid-cols-3">
          {[['24/7', 'Catat kapan aja'], ['OCR', 'Struk jadi data'], ['SAFE', 'Data via Supabase']].map(([big, small]) => (
            <Card key={big} color="bg-banana"><b className="block text-2xl leading-9">{big}</b><span className="mt-3 block text-[10px] font-black leading-6 text-muted">{small}</span></Card>
          ))}
        </div>
      </section>

      <section id="pricing" className="mx-auto w-full max-w-7xl px-4 py-12">
        <Card color="bg-mint" className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <h2 className="text-2xl font-black leading-9">SIAP BIKIN DUIT LEBIH RAPI?</h2>
            <p className="mt-3 text-[10px] font-black leading-6 text-muted">Register sekarang, setup Supabase nanti, lalu gas jadi aplikasi finansial proper.</p>
          </div>
          <LinkButton onClick={() => setPage('register')}>Gas daftar</LinkButton>
        </Card>
      </section>

      <footer className="border-t-[3px] border-ink bg-darkcard px-4 py-8 text-paper">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 md:flex-row">
          <p className="text-[10px] font-black leading-6">DUIT GENZ © 2026</p>
          <p className="text-[10px] font-black leading-6 text-[#fff8db]">BAGIAN DARI EKOSISTEM MUTATIT.COM</p>
        </div>
      </footer>
    </main>
  )
}
