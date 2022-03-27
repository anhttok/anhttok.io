import React, { StrictMode } from 'react'
import { UncontrolledCarousel } from 'reactstrap'
import { NextSeo } from 'next-seo'

import WebsiteMixin from '@/shared/mixins/WebsiteMixin'
import { convertDataPage } from '@/shared/converters/HomePageConverter'
import { getPageData } from '@/shared/config'

const HomePage = ({ website }) => {
  const pageData = getPageData(website, 'anhttok-home')
  const { meta, content } = convertDataPage(pageData)
  let projects = []

  if (content.project && content.project.projects) {
    projects = content.project.projects.map((project, index) => {
      return {
        key: index,
        caption: '',
        src: project,
      }
    })
  }

  return (
    <>
      <NextSeo
        title={meta.title}
        description={meta.description}
        openGraph={{
          title: `${meta.title} 👨🏽‍💻 Anhttok`,
          site_name: `${meta.title}`
        }}
      />

      <section
        className="about full-screen d-lg-flex justify-content-center align-items-center"
        id="about"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-7 col-md-12 col-12 d-flex align-items-center">
              <div className="about-text">
                <small className="small-text">
                  Welcome to <span className="mobile-block">my portfolio website!</span>
                </small>
                <h1 className="animated animated-text">
                  <span className="me-2">{content.welcome.hello}</span>
                  <div className="animated-info">
                    {content.welcome.names &&
                      content.welcome.names.map((name) => (
                        <span className="animated-item" key={name}>
                          {name}
                        </span>
                      ))}
                  </div>
                </h1>

                <p>{content.welcome.description}</p>

                <div className="custom-btn-group mt-4">
                  <a
                    href={'mailto:' + content.welcome.email}
                    className="btn me-lg-2 custom-btn"
                    target="_blank" rel="noreferrer"
                  >
                    <i className="uil uil-file-alt"></i> Contact me
                  </a>
                  <a
                    href={content.welcome.upwork}
                    className="btn custom-btn custom-btn-bg custom-btn-link"
                    target="_blank" rel="noreferrer"
                  >
                    Hire me
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-5 col-md-12 col-12">
              <div className="about-image svg">
                <img
                  src="/images/undraw/undraw_add_information_j2wg.svg"
                  className="img-fluid"
                  alt="svg image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="project py-5" id="project">
        <div className="container">
          <div className="row">
            <div className="col-lg-11 text-center mx-auto col-12">
              <div className="col-lg-8 mx-auto mb-5">
                <h2>{content.project.name}</h2>
              </div>

              <UncontrolledCarousel items={projects} />
            </div>
          </div>
        </div>
      </section>

      <section
        className="resume py-5 d-lg-flex justify-content-center align-items-center"
        id="resume"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-12">
              <h2 className="mb-4">Experiences</h2>

              <div className="timeline">
                {content.experiences &&
                  content.experiences.map((experience, index) => (
                    <div className="timeline-wrapper" key={index}>
                      <div className="timeline-yr">
                        <span>{experience.year}</span>
                      </div>
                      <div className="timeline-info">
                        <h3>
                          <span>{experience.name}</span>
                          <small>{experience.location}</small>
                        </h3>
                        <p>{experience.description}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="col-lg-6 col-12">
              <h2 className="mb-4 mobile-mt-2">Educations</h2>

              <div className="timeline">
                {content.educations &&
                  content.educations.map((education, index) => (
                    <div className="timeline-wrapper" key={index}>
                      <div className="timeline-yr">
                        <span>{education.year}</span>
                      </div>
                      <div className="timeline-info">
                        <h3>
                          <span>{education.name}</span>
                          <small>{education.location}</small>
                        </h3>
                        <p>{education.description}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default HomePage

export async function getStaticProps() {
  const data = await WebsiteMixin.getStaticProps()

  return data
}
