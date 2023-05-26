import { messageType } from "./message";
import { userDto } from "./user";

export interface channelType {
    _id: string,
    friend: userDto
    lastMessage: messageType
}

export interface channelTypeWithFilter extends channelType { display: boolean }

export interface channel {
    _id: string
    imgUrl: string
    friend: userDto
    isLocked: boolean
}