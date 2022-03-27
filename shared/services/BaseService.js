import qs from 'qs'

import httpClient from '@/shared/httpClient'

export default class BaseService {
  constructor(baseName) {
    this.httpClient = httpClient
    this.baseName = baseName
  }

  // start: URLs
  getAllUrl(params){
    const query = params ? qs.stringify(params) : ''
    return `/${this.baseName}?${query}`
  }

  // CRUD
  async getAll(params) {
    try {
      const url = this.getAllUrl(params)
      const res = await this.httpClient({ url })
      const items = res.data
      return items
    } catch (error) {
      return null
    }
  }
}