import { useContext, useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { userDto, userType } from "../../../@types/user"
import { userContext } from "../../../context/UserContext"
import { getChannel, getChannelMessages } from "../../../api/messageAPI"
import { channel } from "../../../@types/channel"
import { EmojiClickData } from "emoji-picker-react"
import { useComponentVisibleHook } from "../../../hooks/useComponentVisibleHook"

type messageType = {
    channelId?: string
    author: userDto,
    content: string,
    // seen: boolean
}

export const useChannelHook = () => {

    const { user, socket } = useContext(userContext)

    const { channelId } = useParams<string>()

    const navigate = useNavigate()

    const navigateBack = () => navigate(-1)

    const [messages, setMessages] = useState<messageType[]>([])

    const [channel, setChannel] = useState<channel>()

    const [message, setMessage] = useState('')

    const [connectionStatus, setConnectionStatus] = useState('')

    const messagesEndRef = useRef<HTMLDivElement>(null)

    const {ref, isVisible, handleToggleIsVisible} = useComponentVisibleHook(false)

    const handleEmojiClick = (emoji: EmojiClickData, event: MouseEvent) => {
        setMessage(message + emoji.emoji)
    }

    useEffect(() => {
        const fetchData = async () => {
            if (!channelId)
                return
            const channel = await getChannel(channelId)
            const channelMessages = await getChannelMessages(channelId)
            setChannel(channel)
            setMessages(channelMessages)
        }

        fetchData()
    }, [channelId])

    useEffect(() => {
        const getFriendConnectionStatus = () => {
            if (!channel) return

            socket.emit('connection-status', channel.friend._id, (status: string) => {
                setConnectionStatus(status)
            })
        }

        getFriendConnectionStatus()

        const intervalId = setInterval(getFriendConnectionStatus, 1000 * 3)

        return () => clearInterval(intervalId)

    }, [channel])

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    useEffect(() => {

        const onReceiveMessageEvent = (newMessage: messageType) => {
            if (newMessage.channelId === channelId)
                setMessages([...messages, newMessage])
        }

        const onUnlockChannelEvent = (channelIdToUnlock: string) => {
            console.log('unlocking channel Id:', channelIdToUnlock)
            console.log(channelId)
            if (channel && channelIdToUnlock === channelId)
                setChannel({...channel, isLocked: false})
        }

        const onLockChannelEvent = (channelIdTolock: string) => {
            if (channel && channelIdTolock === channelId)
                setChannel({...channel, isLocked: true})
        }

        socket.on('receive-message', onReceiveMessageEvent)
        socket.on('unlock-channel', onUnlockChannelEvent)
        socket.on('lock-channel', onLockChannelEvent)

        return () => {
            socket.off('receive-message', onReceiveMessageEvent)
            socket.off('unlock-channel', onUnlockChannelEvent)
            socket.off('lock-channel', onLockChannelEvent)
        }

    }, [messages, channel])

    const handleSendMessage = () => {
        if (!user)
            return
        const newMessage: messageType = {
            author: user,
            content: message.trimEnd(),
            // seen: false
        }

        // setMessages([...messages, newMessage])
        setMessage('')

        //To Do: -add callback later for removing msg in-case of failure
        socket.emit('send-message', channelId, newMessage.content)
    }

    const handleKeyPress = ({key}: React.KeyboardEvent<HTMLInputElement>) => {
        if (key === 'Enter' && message)
            handleSendMessage()
    }

    const handleClick = () => {
        if (message)
            handleSendMessage()
    }

    return {
        user,
        channel,
        navigateBack,
        messages,
        message,
        setMessage,
        handleKeyPress,
        handleClick,
        messagesEndRef,
        connectionStatus,
        ref, isVisible, handleToggleIsVisible,
        handleEmojiClick
    }
}