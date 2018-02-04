export function unEntity (str) {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
}

export function truncate (str, n) {
  return (str.length > n) ? str.substr(0, n-1) + '...' : str;
}