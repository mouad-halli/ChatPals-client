import { Children } from "react"
import { useFriendsListHook } from "./useFriendsListHook"
import { BsPersonFillDash } from "react-icons/bs"

type propsType = {
    friendId: string
    imgUrl: string
    fullName: string
    handleUnfriendButtonClick: (friendId: string) => void
}

const FriendsListItem = (props: propsType) => {

    const { friendId, imgUrl, fullName, handleUnfriendButtonClick } = props

    return (
        <div>
            <div className="relative rounded-xl h-16 min-h-full flex items-center p-4 bg-slate-700">
                <div className="w-5/6 flex gap-x-2 items-center">
                    <img className="w-9 h-9 rounded-full flex-shrink-0 " src={imgUrl} />
                    <h1 className="text-sm font-bold truncate">{fullName}</h1>
                </div>
                <div className="w-1/6 h-full flex gap-x-2 items-center justify-center ">
                    <BsPersonFillDash onClick={() => handleUnfriendButtonClick(friendId)} />
                </div>
            </div>
        </div>
    )
}

export const FriendsList = () => {

    const { friendsList, textFilter, setTextFilter, handleUnfriendButtonClick } = useFriendsListHook()

    return (
        <div className="z-10 absolute m-auto left-0 right-0 top-24 w-[17rem] h-[25rem] flex flex-col items-center gap-y-4 py-6 bg-[#08172E]/90 rounded-xl">
            <div className="w-full h-full overflow-visible flex flex-col items-center gap-y-6 rounded-xl bg-[#08172E]">
                <h1 className="font-bold">Friends</h1>
                <div className="w-full flex justify-center px-6">
                    <input value={textFilter} onChange={(e) => setTextFilter(e.target.value)} type="text" className="w-11/12 bg-[#2B3D5B] outline-none ring-2 px-4 rounded-lg py-0.5" />
                </div>
                <div className='w-5/6 flex flex-col gap-y-4 overflow-y-auto p-2 scroll-smooth'>
                {Children.toArray(friendsList.map(friend => {
                    if (friend.display)
                        return  <FriendsListItem
                            friendId={friend._id}
                            fullName={`${friend.firstname} ${friend.lastname}`}
                            imgUrl={friend.imgUrl}
                            handleUnfriendButtonClick={handleUnfriendButtonClick}
                        />
                }))}
                </div>
            </div>
        </div>
    )
}