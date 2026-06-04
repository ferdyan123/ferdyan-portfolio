export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function formatWhatsApp(number, message = '') {
  const clean = number.replace(/\D/g, '')
  const encoded = encodeURIComponent(message)
  return `https://wa.me/${clean}${message ? `?text=${encoded}` : ''}`
}