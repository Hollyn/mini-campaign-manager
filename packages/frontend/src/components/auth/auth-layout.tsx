import { ReactNode } from 'react'

import { AUTH_COPY } from '../../constants/auth'

interface AuthLayoutProps {
  children: ReactNode
  description: string
  title: string
}

export const AuthLayout = ({ children, description, title }: AuthLayoutProps) => (
  <main className="min-h-screen bg-surface px-4 py-6 text-on-surface sm:px-6 lg:px-8 lg:py-8">
    <div className="mx-auto grid min-h-[calc(100vh-3rem)] max-w-6xl gap-4 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="flex flex-col justify-between rounded-md bg-surface-container-low px-6 py-8 sm:px-8 sm:py-10 lg:px-10">
        <div className="space-y-8">
          <div className="space-y-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-md bg-primary text-sm font-medium tracking-[0.18em] text-on-primary">
              MC
            </div>
            <div className="space-y-3">
              <p className="text-[0.75rem] font-medium uppercase tracking-[0.32em] text-primary">
                {AUTH_COPY.hero.badge}
              </p>
              <h1 className="max-w-xl font-body text-[2.5rem] font-medium leading-none tracking-tight text-on-background sm:text-[3.5rem]">
                {AUTH_COPY.hero.title}
              </h1>
              <p className="max-w-lg text-sm leading-6 text-on-surface-variant sm:text-base">
                {AUTH_COPY.hero.intro}
              </p>
            </div>
          </div>

          <div className="space-y-3 rounded-md bg-surface px-5 py-5">
            {AUTH_COPY.hero.items.map((item) => (
              <div className="flex items-center gap-3" key={item}>
                <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                <span className="text-sm text-on-surface">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="flex flex-col justify-center rounded-md bg-surface-container-highest px-6 py-8 sm:px-8 sm:py-10 lg:px-10">
        <div className="mb-8 space-y-2">
          <p className="text-[0.75rem] font-medium uppercase tracking-[0.32em] text-on-surface-variant">
            {AUTH_COPY.hero.badge}
          </p>
          <h2 className="text-[2rem] font-medium leading-none tracking-tight text-on-background sm:text-[2.5rem]">
            {title}
          </h2>
          <p className="max-w-md text-sm leading-6 text-on-surface-variant">{description}</p>
        </div>

        {children}
      </section>
    </div>
  </main>
)
