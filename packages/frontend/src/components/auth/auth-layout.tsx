import { ReactNode } from 'react'

interface AuthLayoutProps {
  children: ReactNode
}

export const AuthLayout = ({ children }: AuthLayoutProps) => (
  <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[linear-gradient(180deg,var(--color-auth-shell-start),var(--color-auth-shell-end))] px-4 py-10 text-on-surface sm:px-6">
    <div
      aria-hidden
      className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,83,220,0.14),transparent_36%),radial-gradient(circle_at_bottom,rgba(31,49,89,0.08),transparent_34%)]"
    />
    <div
      aria-hidden
      className="absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-auth-shell-glow)] blur-3xl"
    />

    <section className="relative w-full max-w-[28rem] animate-[auth-enter_360ms_cubic-bezier(0.22,1,0.36,1)]">
      {children}
    </section>
  </main>
)
