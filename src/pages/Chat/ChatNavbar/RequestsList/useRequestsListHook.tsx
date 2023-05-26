import { useContext, useEffect, useState } from 'react'
import { userDto } from '../../../../@types/user'
import { userContext } from '../../../../context/UserContext'
import { getReceivedFriendRequestsUsers } from '../../../../api/relationshipAPI'
import { handleError } from '../../../../api/error'

type paramsType = {
    decrementRequestsCount: () => void
    incrementRequestsCount: () => void
}

export const useRequestsListHook = ({ decrementRequestsCount, incrementRequestsCount }: paramsType) => {

    const { socket } = useContext(userContext)

    const [requesters, setRequesters] = useState<userDto[]>([])

    const removeRequesterAndDecrementRequestsCount = (requesterId: string) => {
        setRequesters(requesters.filter(user => user._id !== requesterId))
        decrementRequestsCount()   
    }

    const addRequesterAndIncrementRequestsCount = (newRequester: userDto) => {
        setRequesters([newRequester, ...requesters])
        incrementRequestsCount()
    }

    const handleAcceptRequest = (requesterId: string) => {
        socket.emit('accept-friend-request', requesterId, (success: boolean) => {
            if (success)
                removeRequesterAndDecrementRequestsCount(requesterId)
        })
    }

    const handleRejectRequest = (requesterId: string) => {
        socket.emit('decline-friend-request', requesterId, (success: boolean) => {
            if (success)
                removeRequesterAndDecrementRequestsCount(requesterId)
        })
    }

    useEffect(() => {

        const fetchData = async () => {
            try {
                const requesters = await getReceivedFriendRequestsUsers()
                setRequesters(requesters)
            } catch (error) {
                handleError(error)
            }
        }

        fetchData()
    }, [])

    useEffect(() => {

        const onReceiveFriendRequestEvent = (newRequester: userDto) => {
            addRequesterAndIncrementRequestsCount(newRequester)
        }
        
        const onCanceledFriendRequestEvent = ({_id}: userDto) => {
            removeRequesterAndDecrementRequestsCount(_id)
        }

        socket.on('receive-friend-request', onReceiveFriendRequestEvent)
        socket.on('canceled-friend-request', onCanceledFriendRequestEvent)

        return () => {
            socket.off('receive-friend-request', onReceiveFriendRequestEvent)
            socket.off('canceled-friend-request', onCanceledFriendRequestEvent)
        }

    }, [requesters])
    
    return {
        requesters, handleAcceptRequest, handleRejectRequest
    }
}