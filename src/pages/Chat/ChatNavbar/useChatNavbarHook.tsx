import { useState, useEffect, useContext } from "react"
import { useComponentVisibleHook } from "../../../hooks/useComponentVisibleHook"
import { userContext } from "../../../context/UserContext"
import { getReceivedFriendRequestsUsers } from "../../../api/relationshipAPI"
import { userDto } from "../../../@types/user"

export const useChatNavbarHook = () => {

        const {
        isVisible: isSearchVisible,
        handleToggleIsVisible: handleToggleIsSearchVisible,
        ref: searchRef
    } = useComponentVisibleHook(false)

    const {
        isVisible: isRequestsListVisible,
        handleToggleIsVisible: handleToggleIsRequestsListVisible,
        ref: requestslistRef
    } = useComponentVisibleHook(false)

    const {
        isVisible: isFriendsListVisible,
        handleToggleIsVisible: handleToggleisFriendsListVisible,
        ref: friendsListRef
    } = useComponentVisibleHook(false)

    const { socket } = useContext(userContext)

    const [requestsCount, setRequestsCount] = useState(0)

    const incrementRequestsCount = () => setRequestsCount(requestsCount + 1)
    const decrementRequestsCount = () => setRequestsCount(requestsCount - 1)

    useEffect(() => {
        const fetchData = async () => {
            setRequestsCount((await getReceivedFriendRequestsUsers()).length)
        }

        fetchData()
    }, [])

    useEffect(() => {

        const onReceiveFriendRequestEvent = ({_id}: userDto) => {
            setRequestsCount(requestsCount + 1)
        }
        
        const onCanceledFriendRequestEvent = (user: userDto) => {
            setRequestsCount(requestsCount - 1)
        }

        socket.on('receive-friend-request', onReceiveFriendRequestEvent)
        socket.on('canceled-friend-request', onCanceledFriendRequestEvent)

        return () => {
            socket.off('receive-friend-request', onReceiveFriendRequestEvent)
            socket.off('canceled-friend-request', onCanceledFriendRequestEvent)
        }

    }, [requestsCount])

    return {
        searchRef, isSearchVisible, handleToggleIsSearchVisible,
        requestslistRef, isRequestsListVisible, handleToggleIsRequestsListVisible,
        isFriendsListVisible, friendsListRef, handleToggleisFriendsListVisible,
        requestsCount, incrementRequestsCount, decrementRequestsCount,

    }
}