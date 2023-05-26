import { useContext, useEffect, useState } from 'react'
import { userAndRelationship, userAndRelationshipWithFilter, userDto } from '../../../../@types/user'
import { userContext } from '../../../../context/UserContext'
import { RelationshipType } from '../../../../@types/relationship'
import { getUserStrangers } from '../../../../api/relationshipAPI'
import { handleError } from '../../../../api/error'

export const useFindFriendsSearchHook = () => {

    const { socket } = useContext(userContext)
    const [strangers, setStrangers] = useState<userAndRelationshipWithFilter[]>([])
    const [textFilter, setTextFilter] = useState('')

    const applyFilter = (stranger: userAndRelationship | userAndRelationshipWithFilter) => {
        const { firstname, lastname } = stranger

        const display = `${firstname} ${lastname}`.includes(textFilter) ? true : false

        return {...stranger, display}
    }

    const applyFilterAndSetState = (strangers: userAndRelationship[] | userAndRelationshipWithFilter[]) => {
        setStrangers(strangers.map(stranger => {
            return applyFilter(stranger)
        }))
    }

    const handleUpdateUserRelationship = (userId: string, newRelationship: RelationshipType) => {
        setStrangers(
            strangers.map(stranger => {
                if (stranger._id === userId)
                    stranger.relationship = newRelationship
                return stranger
            })
        )
    }

    useEffect(() => {

        const fetchData = async () => {
            try {
                const strangers = await getUserStrangers()
                applyFilterAndSetState(strangers)
            } catch (error) {
                handleError(error)
            }
        }

        fetchData()
    }, [])

    useEffect(() => {
        applyFilterAndSetState(strangers)
    }, [textFilter])

    const handleRemoveStranger = (strangerId: string) => {
        setStrangers(strangers.filter(stranger => stranger._id !== strangerId))
    }

    const handleAddStranger = (user: userDto) => {
        const newStranger: userAndRelationship = {...user, relationship: RelationshipType.STRANGER}
        setStrangers([applyFilter(newStranger), ...strangers])
    }

    useEffect(() => {

        const onRemoveStrangerEvent = ({_id}: userDto) => {
            handleRemoveStranger(_id)
        }
    
        const onAddStrangerEvnet = (user: userDto) => {
            handleAddStranger(user)
        }

        const onDeclinedFriendRequestEvent = ({_id}: userDto) => {
            handleUpdateUserRelationship(_id, RelationshipType.STRANGER)
        }

        socket.on('receive-friend-request', onRemoveStrangerEvent)
        socket.on('canceled-friend-request', onAddStrangerEvnet)
        socket.on('unfriend-user', onAddStrangerEvnet)
        socket.on('declined-friend-request', onDeclinedFriendRequestEvent)
        socket.on('accepted-friend-request', onRemoveStrangerEvent)

        return () => {
            socket.off('receive-friend-request', onRemoveStrangerEvent)
            socket.on('canceled-friend-request', onAddStrangerEvnet)
            socket.off('unfriend-user', onAddStrangerEvnet)
            socket.off('declined-friend-request', onDeclinedFriendRequestEvent)
            socket.off('accepted-friend-request', onRemoveStrangerEvent)
        }

    }, [strangers])

    const handleSendFriendRequest = (strangerId: string) => {
        socket.emit('send-friend-request', strangerId, (success: boolean) => {
            if (success)
                handleUpdateUserRelationship(strangerId, RelationshipType.SENT)
        })
    }

    const handleCancelFriendRequest = (strangerId: string) => {
        socket.emit('cancel-friend-request', strangerId, (success: boolean) => {
            if (success)
                handleUpdateUserRelationship(strangerId, RelationshipType.STRANGER)
        })
    }

    const handleRemoveBlock = (strangerId: string) => {
        socket.emit('remove-block', strangerId, (success: boolean) => {
            if (success)
                handleUpdateUserRelationship(strangerId, RelationshipType.SENT)
        })
    }

    return {
        textFilter, setTextFilter, strangers, handleSendFriendRequest,
        handleCancelFriendRequest, handleRemoveBlock
    }
}