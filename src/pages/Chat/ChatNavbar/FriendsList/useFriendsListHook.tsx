import { useContext, useEffect, useState } from "react"
import { userDto, userDtoWithfilter } from "../../../../@types/user"
import { handleError } from "../../../../api/error"
import { getUserFriends } from "../../../../api/relationshipAPI"
import { userContext } from "../../../../context/UserContext"

export const useFriendsListHook = () => {

    const { socket } = useContext(userContext)

    const [textFilter, setTextFilter] = useState('')
    const [friendsList, setFriendsList] = useState<userDtoWithfilter[]>([])

    const applyFilter = (friend: userDto | userDtoWithfilter) => {
        const { firstname, lastname } = friend

        const display = `${firstname} ${lastname}`.includes(textFilter) ? true : false

        return {...friend, display}
    }

    const applyFilterAndSetState = (friends: userDto[] | userDtoWithfilter[]) => {
        setFriendsList(friends.map(friend => {
            return applyFilter(friend)
        }))
    }

    useEffect(() => {

        const fetchData = async () => {
            try {
                const friendsListData = await getUserFriends()
                applyFilterAndSetState(friendsListData)
            } catch (error) {
                handleError(error)
            }
        }
        fetchData()

    }, [])

    useEffect(() => {
        applyFilterAndSetState(friendsList)
    }, [textFilter])

    const removeUserFromFriendsList = (userId: string) => {
        setFriendsList(friendsList.filter(friend => friend._id !== userId))
    }

    const handleUnfriendButtonClick = (friendId: string) => {
        socket.emit('unfriend-user', friendId, (success: boolean) => {
            if (success)
                removeUserFromFriendsList(friendId)
        })
    }

    useEffect(() => {

        const  onRemoveFriendEvent = ({_id}: userDto) => {
            removeUserFromFriendsList(_id)
        }

        socket.on('unfriend-user', onRemoveFriendEvent)

        return () => {
            socket.off('unfriend-user', onRemoveFriendEvent)
        }

    }, [friendsList])

    return {
        friendsList, textFilter, setTextFilter, handleUnfriendButtonClick
    }
}