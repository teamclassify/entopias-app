export function formatPrice(price) {
  return `$${new Intl.NumberFormat().format(price || 0)}`;
}