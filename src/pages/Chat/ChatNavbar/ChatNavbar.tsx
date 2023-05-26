import { HiUserAdd } from "react-icons/hi"
import { FindFriendsSearch } from "./FindFriendsSearch/FindFriendsSearch"
import { RequestsList } from "./RequestsList"
import { IoNotificationsSharp } from "react-icons/io5"
import { FaUserFriends } from "react-icons/fa"
import { useChatNavbarHook } from "./useChatNavbarHook"
import { FriendsList } from "./FriendsList"

export const ChatNavbar = () => {

    const {
        searchRef, isSearchVisible, handleToggleIsSearchVisible, requestslistRef,
        isRequestsListVisible, handleToggleIsRequestsListVisible, requestsCount, incrementRequestsCount,
        isFriendsListVisible, friendsListRef, handleToggleisFriendsListVisible,
        decrementRequestsCount
    } = useChatNavbarHook()

    return (
        <div className="w-full h-[7%] flex justify-between items-center">
            <h1 className="text-4xl font-bold px-2">Chats</h1>
            <div className="flex items-center gap-x-4">
                <div ref={searchRef} className="text-lg ring-2 ring-gray-500 text-white rounded-full p-1">
                    <HiUserAdd className=" cursor-pointer" onClick={handleToggleIsSearchVisible} />
                    { isSearchVisible &&
                        <FindFriendsSearch/>
                    }
                </div>
                <div ref={friendsListRef} className="text-lg ring-2 ring-gray-500 text-white rounded-full p-1">
                    <FaUserFriends className=" cursor-pointer" onClick={handleToggleisFriendsListVisible} />
                    { isFriendsListVisible &&
                        <FriendsList/>
                    }
                </div>
                <div ref={requestslistRef} className="text-lg ring-2 ring-gray-500 text-white rounded-full p-1">
                    <div className="relative cursor-pointer" onClick={handleToggleIsRequestsListVisible}>
                        <IoNotificationsSharp />
                        {requestsCount > 0 &&
                            <div className="absolute -bottom-3 -right-2 text-xs bg-red-600 rounded-full px-1 bg-red">
                                {requestsCount}
                            </div>
                        }
                    </div>
                    { isRequestsListVisible &&
                        <RequestsList
                            decrementRequestsCount={decrementRequestsCount} incrementRequestsCount={incrementRequestsCount}
                        />
                    }
                </div>
            </div>
        </div>
    )
}