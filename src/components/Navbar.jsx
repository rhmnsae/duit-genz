import { WalletCards } from 'lucide-react'
import { Button } from './ui.jsx'

export default function Navbar({ page, setPage }) {
  return (
    <header className="sticky top-0 z-30 border-b-[3px] border-ink bg-paper/95 backdrop-blur">
      <nav className="mx-auto flex min-h-20 w-full max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <button onClick={() => setPage('landing')} className="flex items-center gap-3 text-left">
          <span className="brutal-card-sm grid h-12 w-12 place-items-center bg-banana">
            <WalletCards size={24} />
          </span>
          <span>
            <span className="block text-sm font-black leading-5">DUIT GENZ</span>
            <span className="block text-[8px] font-black leading-4 text-muted">UANG MASUK VIBES</span>
          </span>
        </button>

        <div className="hidden items-center gap-4 text-[9px] font-black uppercase leading-5 lg:flex">
          <a href="#fitur">Fitur</a>
          <a href="#dashboard">Dashboard</a>
          <a href="#split">Split Bill</a>
          <a href="#pricing">Paket</a>
        </div>

        <div className="flex flex-wrap justify-end gap-2">
          {page !== 'dashboard' && <Button variant="light" onClick={() => setPage('login')}>Login</Button>}
          <Button variant="mint" onClick={() => setPage(page === 'dashboard' ? 'landing' : 'register')}>
            {page === 'dashboard' ? 'Home' : 'Register'}
          </Button>
        </div>
      </nav>
    </header>
  )
}
