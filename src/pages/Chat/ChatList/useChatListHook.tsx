import { useContext, useEffect, useState } from "react"
import { channelType, channelTypeWithFilter } from "../../../@types/channel"
import { getUserChannels } from "../../../api/channelAPI"
import { handleError } from "../../../api/error"
import { userContext } from "../../../context/UserContext"
import { messageType } from "../../../@types/message"

export const useChatListHook = () => {

    const [channelsList, setChannelsList] = useState<channelTypeWithFilter[]>([])

    const [textFilter, setTextFilter] = useState('')

    const { socket, user } = useContext(userContext)

    const applyFilter = (channel: channelType | channelTypeWithFilter) => {
        const { friend: {firstname, lastname} } = channel

        const display = `${firstname} ${lastname}`.includes(textFilter) ? true : false

        return {...channel, display}
    }

    const applyFilterAndSetState = (channels: channelType[] | channelTypeWithFilter[]) => {
        setChannelsList(channels.map(channel => {
            return applyFilter(channel)
        }))
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const channels = await getUserChannels()
                applyFilterAndSetState(channels)
            } catch (error) {
                handleError(error)
            }
        }

        fetchData()

    }, [])

    useEffect(() => {
        applyFilterAndSetState(channelsList)
    }, [textFilter])

    const handleUpdateChannelLastMsg = (channelId: string, msg: messageType) => {
        setChannelsList(channelsList.map(channel => {
            if (channel._id === channelId)
                channel.lastMessage = msg
            return channel
        }))
    }

    useEffect(() => {

        const onReceiveMessageEvent = (newMessage: messageType) => {
            handleUpdateChannelLastMsg(newMessage.channelId, newMessage)
        }

        const onAddChannelEvent = (channel: channelType) => {
            setChannelsList([applyFilter(channel), ...channelsList])
        }

        socket.on('add-channel', onAddChannelEvent)

        socket.on('receive-message', onReceiveMessageEvent)

        return () => {
            socket.off('add-channel', onAddChannelEvent)
            socket.off('receive-message', onReceiveMessageEvent)
        }
    }, [channelsList])

    return {
        channelsList, textFilter, setTextFilter, userId: user?._id
    }
}