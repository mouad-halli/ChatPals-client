import { Children } from "react"
import { useFindFriendsSearchHook } from "./useFindFriendsSearchHook"
import { BsPersonFillAdd } from "react-icons/bs"

export const FindFriendsSearch = () => {

    const {
        textFilter, setTextFilter, strangers, handleSendFriendRequest,
        handleCancelFriendRequest, handleRemoveBlock
    } = useFindFriendsSearchHook()

    return (
        <div className="z-10 absolute m-auto left-0 right-0 top-24 w-[17rem] h-[25rem] flex flex-col items-center gap-y-4 py-6 bg-[#08172E]/90 rounded-xl">
            <div className="w-full h-full flex flex-col items-center gap-y-6 rounded-xl bg-[#08172E]">
                <h1 className="font-bold">Find Friends</h1>
                <div className="w-full flex justify-center px-6">
                    <input value={textFilter} onChange={(e) => setTextFilter(e.target.value)} type="text" className="w-11/12 bg-[#2B3D5B] outline-none ring-2 px-4 rounded-lg py-0.5" />
                </div>
                <div className='w-5/6 flex flex-col gap-y-4 overflow-y-auto py-2 scroll-smooth'>
                {Children.toArray(strangers.map(stranger => {
                    if (stranger.display)
                    return <div>
                        <div className=" rounded-xl h-16 min-h-full flex items-center px-4 bg-slate-700">
                            <div className="w-5/6 flex gap-x-2 items-center">
                                <img className="w-9 h-9 rounded-full flex-shrink-0 " src={stranger.imgUrl} />
                                <h1 className="text-sm font-bold truncate">{`${stranger.firstname} ${stranger.lastname}`}</h1>
                            </div>
                            <button className="w-1/6 flex items-center justify-center text-lg">
                                {stranger.relationship === 'stranger' && <BsPersonFillAdd className='cursor-pointer text-lg' onClick={() => handleSendFriendRequest(stranger._id)} />}
                                {stranger.relationship === 'sent' &&  <span className='text-xs font-bold bg-red-500 rounded-lg p-[0.30rem]' onClick={() => handleCancelFriendRequest(stranger._id)}>cancel</span>}
                                {stranger.relationship === 'blocked' && <span className='text-xs font-bold bg-red-500 rounded-lg p-[0.30rem]' onClick={() => handleRemoveBlock(stranger._id)}>unblock</span>}
                            </button>
                        </div>
                    </div>
                }))}
                </div>
            </div>
        </div>
    )
}