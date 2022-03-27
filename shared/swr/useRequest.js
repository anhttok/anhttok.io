import useSWR from 'swr'
import httpClient from '@/shared/httpClient'

/**
 * 
 * @param {*} request from https://github.com/axios/axios#request-config
 * @param {*} { initialData, ...config } from https://swr.vercel.app/docs/options#options 
 */
const useRequest = (request, { initialData, ...config } = {}) => {
  return useSWR(
    request && JSON.stringify(request),
    () => httpClient(request || {}).then(response => response.data),
    {
      ...config,
      initialData: initialData && {
        status: 200,
        statusText: 'InitialData',
        headers: {},
        data: initialData
      }
    }
  ) 
}

export default useRequest