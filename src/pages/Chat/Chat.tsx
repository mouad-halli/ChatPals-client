import { ChatList } from "./ChatList"
import { ChatNavbar } from "./ChatNavbar"
import { Outlet, useOutlet } from "react-router-dom"

export const  Chat = () =>  {

    const isOutlet = useOutlet()

    return (
        <>
        <div className="h-full w-full hidden md:flex"> {/* computer */}
            <div className="relative h-screen w-[22rem] flex-shrink-0 p-6">
                <ChatNavbar />
                <ChatList  />
            </div>
            <div className="h-screen md:flex-grow">
                <Outlet />
            </div>
        </div>
        <div className="h-full w-full md:hidden"> {/* mobile */}
            {isOutlet ?
                <div className="h-screen w-full">
                    <Outlet />
                </div>
                : 
                <div className="relative h-screen w-full p-6">
                    <ChatNavbar />
                    <ChatList />
                </div>
            }
        </div>
        </>
    )
}
