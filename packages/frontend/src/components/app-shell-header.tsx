import { AppShellPageMeta } from '../constants/app'

interface AppShellHeaderProps {
  pageMeta: AppShellPageMeta
}

export const AppShellHeader = ({ pageMeta }: AppShellHeaderProps) => (
  <header className="sticky top-3 z-10 rounded-[1.5rem] border border-white/70 bg-white/85 px-5 py-4 shadow-ambient backdrop-blur sm:px-6">
    <p className="text-sm font-medium text-on-surface-variant">{pageMeta.section}</p>
    <h1 className="mt-2 text-2xl font-medium tracking-tight text-on-background sm:text-[2rem]">{pageMeta.title}</h1>
  </header>
)
