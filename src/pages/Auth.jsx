import { Card, Button } from '../components/ui.jsx'

export default function Auth({ mode, setPage }) {
  const isLogin = mode === 'login'

  return (
    <main className="pixel-bg grid min-h-[calc(100vh-80px)] place-items-center px-4 py-12">
      <Card color={isLogin ? 'bg-sky' : 'bg-banana'} className="w-full max-w-xl space-y-5">
        <div>
          <p className="text-[9px] font-black uppercase text-muted">{isLogin ? 'Welcome back' : 'Start your money era'}</p>
          <h1 className="mt-4 text-2xl font-black leading-9">{isLogin ? 'LOGIN DULU' : 'BIKIN AKUN'}</h1>
        </div>
        <p className="text-[10px] font-black leading-6 text-muted">
          {isLogin ? 'Lanjut pantau duit kamu biar nggak misterius.' : 'Mulai catat uang dengan cara yang lebih santai dan rapi.'}
        </p>
        <form className="space-y-4" onSubmit={(event) => { event.preventDefault(); setPage('dashboard') }}>
          {!isLogin && <input className="w-full border-[3px] border-ink bg-white px-4 py-4 text-[10px] font-black outline-none" placeholder="NAMA PANGGILAN" />}
          <input className="w-full border-[3px] border-ink bg-white px-4 py-4 text-[10px] font-black outline-none" placeholder="EMAIL" type="email" />
          <input className="w-full border-[3px] border-ink bg-white px-4 py-4 text-[10px] font-black outline-none" placeholder="PASSWORD" type="password" />
          <Button className="w-full" type="submit">{isLogin ? 'Login' : 'Register'}</Button>
        </form>
        <button className="w-full text-center text-[10px] font-black leading-6 underline" onClick={() => setPage(isLogin ? 'register' : 'login')}>
          {isLogin ? 'BELUM PUNYA AKUN? REGISTER' : 'UDAH PUNYA AKUN? LOGIN'}
        </button>
      </Card>
    </main>
  )
}
