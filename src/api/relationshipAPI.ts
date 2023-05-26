import { userDto } from "../@types/user"
import { $api } from "./API"

export const getUserStrangers = async () => {

    return (await $api.get('/relationship/strangers')).data
}

export const getUserFriends = async () => {
    return (await $api.get('/relationship/friends')).data
}

export const getReceivedFriendRequestsUsers = async () => {

    return (await $api.get('/relationship/received/pending')).data
}