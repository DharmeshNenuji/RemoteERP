/* eslint-disable default-param-last */

import axios, {type AxiosRequestConfig} from 'axios'

import {Config} from '@/Config'
import {HttpCodes, showToast} from '@/Helpers'
import {NavigateToAuth} from '@/Router/RootNavigator'
import {MMKVStorage} from '@/Store/storage'

type Methodtype = 'post' | 'get' | 'put' | 'delete' | 'patch'

const axiosInstance = axios.create({
  baseURL: Config.API_URL
})

const isLogsEnabled = false

axiosInstance.interceptors.response.use(
  (res) => {
    const cookie = res.request['responseHeaders']['Set-Cookie']

    if (cookie) {
      MMKVStorage.set('Cookie', cookie)
    }
    return res
  },
  async (error) => {
    if (error.status === HttpCodes.UNAUTHORIZED) {
      MMKVStorage.clearAll()
      showToast('Session expired. Please log in again', 'error')
      NavigateToAuth()
    }
    return Promise.reject(error)
  }
)

const logs = (...logs: any) => {
  if (!isLogsEnabled) {
    return
  }
  // eslint-disable-next-line no-console
  console.log('logs', ...logs)
}

axiosInstance.interceptors.request.use(
  (config) => {
    const tempConfig = config
    const Cookie = MMKVStorage.getString('Cookie')
    if (Cookie) {
      tempConfig.headers.set('Cookie', Cookie)
      tempConfig.headers.set('Set-Cookie', Cookie)
    }

    return tempConfig
  },
  async (error) => Promise.reject(error)
)

const getFormData = (object: Record<string, any>) => {
  const formData = new FormData()
  Object.keys(object).forEach((key) => {
    return formData.append(key, object[key])
  })
  return formData
}

const APICall = async (
  method: Methodtype,
  body: any,
  url: string | null = null,
  headers = {},
  formData = false,
  onUploadProgress?: (progressEvent: any) => void
) => {
  const config: AxiosRequestConfig<any> = {
    method,
    withCredentials: true
  }
  if (url) {
    config.url = url
  }

  if (body && method === 'get') {
    config.params = body
  } else if (body && (method === 'post' || method === 'put') && formData) {
    config.data = getFormData(body)
    config.headers = {...config.headers, 'Content-Type': 'multipart/form-data'}
  } else {
    config.data = body
  }

  if (onUploadProgress) {
    config.onUploadProgress = function (progressEvent: any) {
      const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
      onUploadProgress(percentCompleted)
    }
  }

  if (Object.keys(headers).length > 0) {
    config.headers = headers
  }

  return new Promise<any>((resolve, reject) => {
    axiosInstance(config)
      .then((res) => {
        logs('success', '<=======API Response======>', {
          requestedData: res.config.data,
          status: res.status,
          data: res.data,
          payload: body,
          baseUrl: url
        })
        return resolve({status: res.status, data: res.data})
      })
      .catch((error) => {
        if (
          error?.response?.status === 500 ||
          error?.status === 500 ||
          error?.response?.status === 400 ||
          error?.status === 400 ||
          error?.response?.status === 502 ||
          error?.status === 502 ||
          error?.code === 'ERR_NETWORK' ||
          error?.code === 'ECONNABORTED'
        ) {
          const errorData = {
            ...error,
            status: 500,
            data: {
              message:
                "We're sorry for the inconvenience. We've encountered a technical issue and our team is currently working on resolving it."
            }
          }
          logs('error', '<=======API Error======>', error)
          return reject(errorData?.response || errorData)
        }
        logs('warning', '<=======API Bad Request======>', error)
        return resolve(error?.response)
      })
  })
}

export default APICall
