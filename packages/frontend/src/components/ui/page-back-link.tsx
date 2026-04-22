interface PageBackLinkProps {
  label: string
  onClick: () => void
}

export const PageBackLink = ({ label, onClick }: PageBackLinkProps) => (
  <button className="inline-flex items-center gap-2 text-sm font-medium text-primary" onClick={onClick} type="button">
    <span aria-hidden="true">&larr;</span>
    <span>{label}</span>
  </button>
)
