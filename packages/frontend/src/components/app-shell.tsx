import { FOUNDATION_BADGES, FOUNDATION_COPY } from '../constants/app'
import { Card } from './ui/card'

export const AppShell = () => (
  <main className="min-h-screen bg-background px-6 py-10 text-foreground sm:px-10">
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      <section className="space-y-4">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-primary/80">
          {FOUNDATION_COPY.eyebrow}
        </p>
        <div className="space-y-3">
          <h1 className="font-display text-4xl leading-tight sm:text-6xl">
            {FOUNDATION_COPY.heading}
          </h1>
          <p className="max-w-2xl text-base leading-7 text-foreground/80 sm:text-lg">
            {FOUNDATION_COPY.description}
          </p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-[1.5fr_1fr]">
        <Card>
          <div className="flex flex-wrap gap-3">
            {FOUNDATION_BADGES.map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
              >
                {badge}
              </span>
            ))}
          </div>
        </Card>

        <Card className="flex flex-col justify-between gap-3">
          <p className="text-sm uppercase tracking-[0.25em] text-foreground/55">
            {FOUNDATION_COPY.statusLabel}
          </p>
          <p className="font-display text-3xl text-primary">{FOUNDATION_COPY.statusValue}</p>
        </Card>
      </section>
    </div>
  </main>
)
