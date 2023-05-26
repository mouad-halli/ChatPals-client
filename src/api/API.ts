import axios, { AxiosError, isAxiosError } from 'axios'
import { logout, refreshAccessToken } from './authenticationAPI'

export const $api = axios.create({
    baseURL: import.meta.env.VITE_BACK_END_URL,
    withCredentials: true
})

let queue: any[] = []

let isRefreshing = false

const processQueue = (error: any) => {
    queue.forEach(promise => {
        if (error)
            promise.reject(error)
        else
            promise.resolve()
    })

    queue = []
}

$api.interceptors.response.use(
    response => response,
    async (error) => {
        if (error.response?.status === 401) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => queue.push({resolve, reject}))
                .then(() => $api(error.config))
                .catch(() => Promise.reject(error))
            }
            return new Promise((resolve, reject) => {
                isRefreshing = true
                refreshAccessToken()
                .then(() => {
                    processQueue(null)
                    resolve($api(error.config))
                })
                .catch((err) => {
                    processQueue(err)
                    reject(err)
                })
                .finally(() => isRefreshing = false)
            })
        }
        return Promise.reject(error)
    }
)