import { ArrowRight } from 'lucide-react'

export function Button({ children, variant = 'dark', className = '', ...props }) {
  const styles = {
    dark: 'bg-ink text-paper',
    light: 'bg-white text-ink',
    mint: 'bg-mint text-ink',
    banana: 'bg-banana text-ink',
    pink: 'bg-bubblegum text-ink',
  }

  return (
    <button
      className={`brutal-card-sm inline-flex items-center justify-center gap-3 px-5 py-4 text-[10px] leading-5 font-black uppercase transition active:translate-x-1 active:translate-y-1 active:shadow-none ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export function Card({ children, color = 'bg-white', className = '' }) {
  return <section className={`brutal-card ${color} p-5 ${className}`}>{children}</section>
}

export function SectionLabel({ children }) {
  return <div className="brutal-card-sm inline-flex bg-mint px-4 py-3 text-[9px] leading-5 font-black uppercase">{children}</div>
}

export function LinkButton({ children, onClick, variant = 'dark' }) {
  return (
    <Button onClick={onClick} variant={variant}>
      {children}
      <ArrowRight size={16} />
    </Button>
  )
}

export function ProgressBar({ value = 0, color = 'bg-banana' }) {
  return (
    <div className="h-6 border-[3px] border-ink bg-paper">
      <div className={`h-full ${color}`} style={{ width: `${Math.min(value, 100)}%` }} />
    </div>
  )
}
