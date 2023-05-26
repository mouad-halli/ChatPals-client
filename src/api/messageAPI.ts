import { $api } from "./API"

export const getChannel = async (channelId: string) => {
    return (await $api.get(`channel/${channelId}`)).data
}

export const getChannelMessages = async (channelId: string) => {
    return (await $api.get(`message/channel-messages/${channelId}`)).data
}