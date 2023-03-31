import { $api } from "./API"

export const register = async (data: any) => {
    return (await $api.post('authentication/register', data)).data
}

export const login = async (data: any) => {
    return (await $api.post('authentication/login', data)).data
}

export const logout = async () => {
    return (await $api.get('authentication/logout')).data
}

export const refreshAccessToken = async () => {
    return (await $api.get('authentication/refresh-token')).data
}