import { useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Auth from './pages/Auth.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Landing from './pages/Landing.jsx'

export default function App() {
  const [page, setPage] = useState('landing')

  return (
    <div className="min-h-screen bg-paper font-pixel text-ink">
      <Navbar page={page} setPage={setPage} />
      {page === 'landing' && <Landing setPage={setPage} />}
      {page === 'login' && <Auth mode="login" setPage={setPage} />}
      {page === 'register' && <Auth mode="register" setPage={setPage} />}
      {page === 'dashboard' && <Dashboard />}
    </div>
  )
}
