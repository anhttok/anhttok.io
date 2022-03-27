import React, { useState, useEffect } from 'react'
import Router from 'next/router'
import Head from 'next/head'
import NProgress from 'nprogress'
import Error from 'next/error'
import { ThemeProvider } from 'next-themes'
import { DefaultSeo } from 'next-seo'

import { getSeoDefault } from '@/next-seo.config'
import { GlobalProvider } from '@/shared/context/global'
import LayoutDefault from '@/layouts/default'

import 'bootstrap/dist/css/bootstrap.css'
import '@/assets/css/unicons.css'
import '@/assets/css/theme.css'
import '@/assets/scss/globals.scss'

Router.events.on('routeChangeStart', (url) => {
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    let comment = document.createComment(`
=========================================================
* anhttok
=========================================================

* Website: https://anhttok.io
=========================================================
    `)
    document.insertBefore(comment, document.documentElement)
  }, [])

  const Layout = Component.layout || LayoutDefault
  const SEO = getSeoDefault(pageProps.website)

  return (
    <React.Fragment>
      <DefaultSeo {...SEO} />

      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />

        <meta charSet="utf-8" />
        <meta name="theme-color" content="#6c63ff" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider defaultTheme="system" enableSystem={true} attribute="class" themes={['light-mode', 'dark-mode']}>
        <GlobalProvider>
          <Layout>
            {pageProps.errorCode && <Error statusCode={pageProps.errorCode} />}
            {!pageProps.errorCode && <Component {...pageProps} />}
          </Layout>
        </GlobalProvider>
      </ThemeProvider>
    </React.Fragment>
  )
}

export default MyApp
