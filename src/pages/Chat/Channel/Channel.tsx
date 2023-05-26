import { Link } from "react-router-dom"
import { useChannelHook } from "./useChannelHook"
import { AiOutlineLeft } from "react-icons/ai"
import { BsEmojiSmileFill, BsFillSendFill } from "react-icons/bs"
import { Children } from "react"
import Picker from 'emoji-picker-react'

export const Channel = () => {

    const {
        user, channel, navigateBack, messages, message, setMessage, handleKeyPress,
        handleClick, messagesEndRef, connectionStatus, ref, isVisible, handleToggleIsVisible,
        handleEmojiClick
    } = useChannelHook()

    if (!channel)
        return null

    return (
        <div className=" h-full w-full px-6 flex flex-col items-center">
            <div className="h-[12%] w-full lg:w-5/6 flex items-center">
                <Link to={'/'} className="md:hidden p-3 flex justify-center text-white text-lg ring-[1.2px] ring-gray-700 rounded-xl" onClick={navigateBack}><AiOutlineLeft /></Link>
                <div className="w-5/6 flex ml-4 overflow-hidden gap-x-2">
                    <div className="relative w-10 h-10">
                        <img className="w-full h-full rounded-full" src={channel.imgUrl} />
                        {connectionStatus === 'Online' ?
                            <span className="absolute top-0.5 right-0.5 p-[0.23rem] text-[55%] ring-2 ring-black bg-green-300 text-black rounded-full"></span>
                            :
                            <span className="absolute top-0.5 right-0.5 p-[0.23rem] text-[55%] ring-2 ring-gray-800 bg-gray-600 text-black rounded-full"></span>
                        }
                    </div>
                    <div className=" w-40 flex flex-col justify-center text-white overflow-hidden">
                        <h1 className=" font-bold truncate">{`${channel.friend.firstname} ${channel.friend.lastname}`}</h1>
                        <span className=" text-xs text-gray-300">{connectionStatus}</span>
                    </div>
                </div>
            </div>
            <div className="h-[78%] w-full lg:w-5/6 flex flex-col p-6 md:px-10 bg-gray-700/60 rounded-lg overflow-y-auto overflow-x-hidden text-sm text-white">
                <div className="flex flex-col gap-y-4">
                    {Children.toArray(messages.map(message => {
                        return message.author._id !== user?._id ?
                            <div className="w-full flex flex-col items-start gap-y-2">
                                <p className="py-4 px-6 max-w-md rounded-3xl rounded-bl-md bg-gray-500 break-all">{message.content}</p>
                                <div className="flex items-center gap-x-2">
                                    <img className="w-4 h-4 rounded-full flex-shrink-0" src={message.author.imgUrl} />
                                    <h1 className=" max-w-[7rem] text-xs font-medium truncate">{`${message.author.firstname} ${message.author.lastname}`}</h1>
                                </div>
                            </div>
                            :
                            <div className="w-full flex flex-col items-end gap-y-2">
                                <p className="py-4 px-6 max-w-md rounded-3xl rounded-br-md bg-blue-500 break-all">{message.content}</p>
                                <div className="flex items-center gap-x-2">
                                    <h1 className="text-xs font-medium">You</h1>
                                    <img className="w-4 h-4 rounded-full flex-shrink-0" src={message.author.imgUrl} />
                                </div>
                            </div>
                    }))}
                </div>
                <div ref={messagesEndRef} />
            </div>
            {channel.isLocked ?
                <div className="relative h-[8%] w-full lg:w-5/6 flex justify-center items-center text-red-500 text-sm lg:text-base">
                    you can't send messages in this channel
                </div>
            :
                <div className="relative h-[10%] w-full lg:w-5/6 flex items-center gap-x-3 mx-1">
                    <div
                        className=""
                        ref={ref}
                    >
                        <div className="p-3 flex text-lg bg-gray-700 justify-center text-yellow-300 text-l ring-[1.2px] ring-gray-700/60
                        rounded-xl cursor-pointer" onClick={handleToggleIsVisible} >
                            <BsEmojiSmileFill />
                        </div>
                        {isVisible &&
                            <div className="w-full sm:w-3/6 md:w-[16rem] lg:w-[19rem] absolute bottom-[5rem] left-0 ">
                                <Picker width={"100%"}  onEmojiClick={handleEmojiClick} />
                            </div>
                        }
                    </div>
                    <input
                        type="text" className="w-full py-1 px-2 outline-none ring-2 ring-gray-600 focus-within:ring-blue-500 text-white rounded-lg bg-gray-700"
                        placeholder="type your message"
                        disabled={channel.isLocked}
                        value={message}
                        onKeyDown={handleKeyPress}
                        onChange={(e) => setMessage(e.target.value.trimStart())}
                    />
                    <button
                        className=" p-3 flex bg-blue-600 justify-center text-white text-l ring-[1.2px] ring-blue-700 rounded-xl"
                        onClick={handleClick}
                    ><BsFillSendFill /></button>
                </div>
            }
        </div>
    )
}