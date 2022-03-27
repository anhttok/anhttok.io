import { getMeta, getStrapiMedia } from '@/shared/config'

const SeoDefault = {
  title: '👨🏽‍💻',
  titleTemplate: '%s 👨🏽‍💻 Anhttok',
  description: `description`,
  openGraph: {
    type: 'website',
    title: 'title',
    site_name: 'site_name',
    description: `description`,
    url: 'https://anhttok.github.io',
    images: [
      {
        url: '/logo.png',
        alt: 'anhttok',
      }
    ]
  },
  twitter: {
    handle: '@handle',
    site: '@site',
    cardType: 'summary_large_image',
  },
};

export function getSeoDefault(config) {
  if (!config) {
    return SeoDefault
  }
  let image = getStrapiMedia(config.cover)
  let result = {
    title: config.title || SeoDefault.title,
    titleTemplate: SeoDefault.titleTemplate,
    description: config.description || SeoDefault.description,
    openGraph: {
      type: 'website',
      title: getMeta(config.metas, 'og:title', SeoDefault.openGraph.title),
      site_name: getMeta(config.metas, 'og:site_name', SeoDefault.openGraph.site_name),
      description: getMeta(config.metas, 'og:description', SeoDefault.openGraph.description),
      url: getMeta(config.metas, 'og:url', SeoDefault.openGraph.url),
      images: [
        {
          url: getMeta(config.metas, 'og:image', image),
          alt: getMeta(config.metas, 'og:image:alt', SeoDefault.openGraph.images[0].alt),
        }
      ]
    },
    twitter: SeoDefault.twitter
  }

  return result
}