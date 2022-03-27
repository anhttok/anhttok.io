const config = {
  node: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
  isDevelopment: !!!process.env.NODE_ENV || process.env.NODE_ENV === 'development',
  appName: process.env.NEXT_PUBLIC_APP_NAME,
  websiteSlug: process.env.WEBSITE_SLUG,
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
  apiBaseUrl: process.env.NEXT_PUBLIC_STRAPI_API_URL,
}
export default config

export function getMeta(tags, name, defaultValue) {
  let result = tags.find(tag => {
    return tag.name === name
  })
  return result ? result.content : (defaultValue || '')
}

export function getByName(items, name, defaultValue) {
  let result = items.find(item => {
    return item.name === name
  })
  return result || defaultValue || null
}

export function getPageData(website, slug) {
  let result = website.pages.find(page => {
    return page.slug === slug
  })
  return result || {}
}

export function getStrapiURL(path = '') {
  return `${process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'}${path}`
}

export function getStrapiMedia(media) {
  const imageUrl = media.url.startsWith('/')
    ? getStrapiURL(media.url)
    : media.url
  return imageUrl
}

export function getSocialUrl(path) {
  const siteUrl = `${config.siteUrl}${path}`

  return siteUrl
}

export function getSocialImage(media) {
  let imageUrl = '/thumb.jpg'

  if (media) {
    imageUrl = getStrapiMedia(media)
  }

  return imageUrl
}