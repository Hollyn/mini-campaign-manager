import { sanitizeRichTextHtml } from '../../lib/rich-text'

interface RichTextContentProps {
  className?: string
  html: string
}

export const RichTextContent = ({ className, html }: RichTextContentProps) => (
  <div className={className} dangerouslySetInnerHTML={{ __html: sanitizeRichTextHtml(html) }} />
)
