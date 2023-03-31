import { $api } from "./API"

export const getUser = async () => {
    return (await $api.get('user/me')).data
}

export const updateUser = async (data: any) => {
    return (await $api.put('user', data)).data
}