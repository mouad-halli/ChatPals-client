import { $api } from "./API"

export const getUserChannels = async () => {
    return (await $api.get('/channel/user-channels')).data
}