import config from '@/shared/config'
import { WebsiteService } from '@/shared/services'

const getStaticProps = async ({props} = {props: {}}) => {
  const websites = await WebsiteService.getAll({ slug: config.websiteSlug })
  let newProps = { ...props }
  if (!websites && websites.length === 0) {
    newProps.errorCode = 400
  } else {
    newProps.website = websites[0]
  }

  return {
    props: newProps
  }
}

export default {
  getStaticProps
}