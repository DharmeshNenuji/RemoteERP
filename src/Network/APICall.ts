/* eslint-disable no-console */
/* eslint-disable default-param-last */

import axios, {type AxiosRequestConfig} from 'axios'

import {Config} from '@/Config'

type Methodtype = 'post' | 'get' | 'put' | 'delete' | 'patch'

const axiosInstance = axios.create({
  baseURL: Config.API_URL
})

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.request.use(
  (config) => {
    const tempConfig = config

    // const token = useUserStore.getState().userData?.token

    // if (token) {
    //   config.headers = {
    //     ...config?.headers,
    //     Authorization: `Bearer ${token}`
    //   } as any
    // }

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
    config.headers = {'Content-Type': 'multipart/form-data'}
  } else {
    config.data = body
  }

  if (onUploadProgress) {
    config.onUploadProgress = function (progressEvent: any) {
      const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
      onUploadProgress(percentCompleted)
    }
  }

  if (headers) {
    config.headers = headers
  }

  return new Promise<any>((resolve, reject) => {
    axiosInstance(config)
      .then((res) => {
        console.log('success', '<=======API Response======>', {
          requestedData: res.config.data,
          status: res.status,
          data: res.data,
          payload: body,
          baseUrl: url
        })
        return resolve({status: res.status, data: res.data})
      })
      .catch((error) => {
        console.log('error', error)
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
          console.log('error', '<=======API Error======>', error)
          return reject(errorData?.response || errorData)
        }
        console.log('warning', '<=======API Bad Request======>', error)
        return resolve(error?.response)
      })
  })
}

export default APICall
