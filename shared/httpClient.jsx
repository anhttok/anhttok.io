import axios from 'axios'

import config from './config'

const instanceHttp = axios.create({
    baseURL: config.apiBaseUrl
})

export default instanceHttp