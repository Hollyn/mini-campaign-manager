const EMPTY_HTML = ''

const ALLOWED_TAGS = new Set(['a', 'blockquote', 'br', 'em', 'h2', 'h3', 'li', 'ol', 'p', 'strong', 'u', 'ul'])
const SAFE_LINK_PROTOCOLS = ['http:', 'https:', 'mailto:', 'tel:']

const unwrapElement = (element: Element) => {
  const parent = element.parentNode

  if (!parent) {
    return
  }

  while (element.firstChild) {
    parent.insertBefore(element.firstChild, element)
  }

  parent.removeChild(element)
}

const sanitizeAnchor = (element: Element) => {
  const href = element.getAttribute('href')

  if (!href) {
    element.removeAttribute('href')
    return
  }

  try {
    const resolvedUrl = new URL(href, window.location.origin)

    if (!SAFE_LINK_PROTOCOLS.includes(resolvedUrl.protocol)) {
      element.removeAttribute('href')
      return
    }

    element.setAttribute('href', resolvedUrl.toString())
    element.setAttribute('rel', 'noopener noreferrer')
    element.setAttribute('target', '_blank')
  } catch {
    element.removeAttribute('href')
  }
}

const sanitizeElement = (element: Element) => {
  const tagName = element.tagName.toLowerCase()

  if (!ALLOWED_TAGS.has(tagName)) {
    unwrapElement(element)
    return
  }

  Array.from(element.attributes).forEach((attribute) => {
    if (tagName === 'a' && attribute.name === 'href') {
      return
    }

    element.removeAttribute(attribute.name)
  })

  if (tagName === 'a') {
    sanitizeAnchor(element)
  }
}

export const sanitizeRichTextHtml = (html: string) => {
  if (typeof window === 'undefined') {
    return html.trim()
  }

  const parser = new DOMParser()
  const documentNode = parser.parseFromString(`<div>${html}</div>`, 'text/html')
  const root = documentNode.body.firstElementChild

  if (!root) {
    return EMPTY_HTML
  }

  const walker = documentNode.createTreeWalker(root, NodeFilter.SHOW_ELEMENT)
  const elements: Element[] = []

  let currentNode = walker.nextNode()

  while (currentNode) {
    elements.push(currentNode as Element)
    currentNode = walker.nextNode()
  }

  elements.reverse().forEach(sanitizeElement)

  return root.innerHTML.trim()
}

export const isRichTextEmpty = (html: string) => {
  const text = html
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .trim()

  return text.length === 0
}

export const normalizeRichTextHtml = (html: string) => {
  const sanitizedHtml = sanitizeRichTextHtml(html)

  if (isRichTextEmpty(sanitizedHtml)) {
    return EMPTY_HTML
  }

  return sanitizedHtml
}
