import React, { useState } from 'react'
import { useDidMount } from 'rooks'
import cn from 'classnames'
import { NextSeo } from 'next-seo'
import { Container, Row, Col, Button } from 'reactstrap'

import WebsiteMixin from '@/shared/mixins/WebsiteMixin'
import config from '@/shared/config'
import { DemoService } from '@/shared/services'
import { convertDataPage } from '@/shared/converters/DemosPageConverter'
import { getPageData, getStrapiMedia } from '@/shared/config'

const goToExternal = (event, url) => {
  if (event.target.classList.contains('stackUpEl')) return false
  window.open(url)
}

const DemoItem = ({ className, demo }) => {
  const coverUrl = getStrapiMedia(demo.cover)

  return (
    <Col
      xs={12}
      md={6}
      className={`portfolio-item ${className}`}
      onClick={(event) => {
        goToExternal(event, demo.website_url)
      }}
    >
      <div
        className="portfolio-bg"
        style={{
          backgroundImage: `url(${coverUrl})`,
        }}
      >
        <div className="portfolio-link fw-bold">
          <a
            href={demo.repo_url}
            target="_blank" rel="noreferrer"
          >
            <i className="stackUpEl uil uil-code"></i>
          </a>
          <a
            href={demo.website_url}
            target="_blank" rel="noreferrer"
          >
            <i className="stackUpEl uil uil-external-link-alt"></i>
          </a>
        </div>
        <div className="portfolio-technologies">
          <h2 className="fs-4 fw-bold">{demo.name}</h2>
          <div className="technologies">
            {demo.tags &&
              demo.tags.map((tag) => (
                <span key={tag.slug}>
                  <img
                    src={`/technologies/${tag.slug}.png`}
                    alt={tag.name}
                  />
                </span>
              ))}
          </div>
        </div>
      </div>
    </Col>
  )
}

const DemosPage = ({ website, demos }) => {
  const pageData = getPageData(website, `anhttok-demos`)
  const { meta, content } = convertDataPage(pageData)

  const [filterStr, setFilterStr] = useState('')
  let [grid, setGrid] = useState()

  let tagFilters = content.tagFilters

  useDidMount(() => {
    const Isotope = require('isotope-layout')
    setGrid(
      new Isotope('#portfolios-grid', {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows',
      }),
    )

    onFilter('*')
  })
  const onFilter = (value) => {
    setFilterStr(value)
    if (value !== '*') {
      value = '.' + value
    }
    grid && grid.arrange({ filter: value })
  }
  const getDemoClass = (demo) => {
    let tags = demo.tags.map((tag) => {
      return tag.slug
    })

    return tags.join(' ')
  }

  return (
    <>
      <NextSeo
        title={meta.title}
        description={meta.description}
        openGraph={{
          title: `${meta.title} 👨🏽‍💻 Anhttok`,
          site_name: `${meta.title}`,
        }}
      />

      <Container>
        <Row className="mb-5">
          <Col>
            <h1 className="text-center">{content.name}</h1>
            <h3 className="text-center">{content.description}</h3>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            {tagFilters &&
              tagFilters.map((tagFilter) => (
                <Button
                  color="primary"
                  key={tagFilter.slug}
                  className={cn(
                    'mx-1',
                    {
                      'active': filterStr === tagFilter.slug,
                    },
                  )}
                  onClick={() => {
                    onFilter(tagFilter.slug)
                  }}
                >
                  {tagFilter.name}
                </Button>
              ))}
          </Col>
        </Row>
        <Row id="portfolios-grid">
          {demos &&
            demos.map((demo) => (
              <DemoItem
                key={demo.id}
                demo={demo}
                className={`py-4 cursor-pointer ${getDemoClass(
                  demo,
                )}`}
              />
          ))}
        </Row>
      </Container>
    </>
  )
}

export default DemosPage

export async function getStaticProps(context) {
  const { props } = await WebsiteMixin.getStaticProps()
  const demos = await DemoService.getAll({ 'website.slug': config.websiteSlug })
  return {
    props: {
      ...props,
      demos,
    },
  }
}
