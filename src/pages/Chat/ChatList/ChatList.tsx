import { Children } from "react"
import { Link } from "react-router-dom"
import { BsSearch } from 'react-icons/bs'
import { useChatListHook } from "./useChatListHook"


export const ChatList = () => {

    const { channelsList, textFilter, setTextFilter, userId } = useChatListHook()

    return (
            <div className="h-[93%] w-full flex flex-col gap-y-4 py-6">
                <div className="relative h-[6%] w-full px-2">
                    <input
                        className="w-full h-full pl-12 pr-6 rounded-xl bg-gray-700/80 outline-none ring-2 ring-gray-700 focus-within:ring-blue-700"
                        type="text" placeholder="Search" value={textFilter}
                        onChange={(e) => setTextFilter(e.target.value)}
                    />
                    <BsSearch className="absolute left-6 top-1/2 transform -translate-y-1/2 text-xl text-gray-400 " />
                </div>
                <div className="h-[94%] w-full flex-grow flex flex-col items-center gap-y-4 py-6 overflow-y-auto scroll-smooth">
                    {Children.toArray(channelsList.map((channel, i) => {
                        if (channel.display)
                        return  <div className="w-5/6 md:w-full md:px-3">
                                    <Link
                                        to={`channel/${channel._id}`}
                                        className="h-[4.8rem] w-full flex items-center px-3 rounded-xl bg-gray-700/80" >
                                        <img className="w-12 h-12 rounded-lg flex-shrink-0" src={channel.friend.imgUrl} />
                                        <div className="w-full h-full flex flex-col justify-center gap-y-1 px-4 overflow-hidden">
                                            <h1 className="font-bold truncate">{`${channel.friend.firstname} ${channel.friend.lastname}`}</h1>
                                            {channel.lastMessage && <span className="text-xs truncate">
                                                {userId !== channel.lastMessage.author._id ?
                                                    `${channel.lastMessage.author.firstname} ${channel.lastMessage.author.lastname} : `
                                                    :
                                                    'you : '}
                                                <label className="text-slate-400">{channel.lastMessage.content}</label>
                                            </span>}
                                        </div>
                                        {/* <div className="w-2/6 h-full flex justify-end items-center pr-3"> */}
                                            {/* <div className="w-5 h-5 bg-blue-600 rounded-full text-xs flex justify-center items-center"><span>2</span></div> */}
                                        {/* </div> */}
                                    </Link>
                                </div>
                    }))}
                </div>
            </div>
    )
}