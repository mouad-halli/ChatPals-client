import { userDto } from "./user"

export interface messageType {
    channelId: string
    author: userDto,
    content: string,
    // seen: boolean
}