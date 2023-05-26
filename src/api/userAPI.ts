import { updateUsertype, userDto } from "../@types/user"
import { $api } from "./API"

export const getUser = async () : Promise<userDto> => {
    return (await $api.get('user/me')).data
}

export const updateUser = async (data: updateUsertype) => {
    return (await $api.put('user', data)).data
}

export const uploadUserImg = async (image: File) => {
    const form = new FormData()

    form.append('image', image)
    return (await $api.put('/user/upload/image', form, { headers: { 'Content-Type': "multipart/form-data" } })).data
}