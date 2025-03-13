export const clearCookies = () => {
  document.cookie.split(';').forEach((cookie) => {
    const [name] = cookie.split('=')
    document.cookie = `${name.trim()}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`
  })
}
