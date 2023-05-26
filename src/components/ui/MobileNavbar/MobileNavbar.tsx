import { useMobileNavbarHook } from "./useMobileNavbarHook"
import { RiSettings3Fill } from 'react-icons/ri'
import { RiHomeFill } from 'react-icons/ri'
import { HiChatBubbleOvalLeftEllipsis } from 'react-icons/hi2'
import { IoLogOut } from 'react-icons/io5'
import { Link } from "react-router-dom"

export const MobileNavbar = () => {

    const { mapRefs, handleLogout } = useMobileNavbarHook()

    return (
        <div className=" h-[4.5rem] w-[17rem] md:hidden fixed flex justify-evenly items-center bottom-4 left-1/2 -translate-x-1/2 rounded-[3rem] bg-gray-600 bg-opacity-90 text-gray-400 text-2xl">
            <div ref={mapRefs.get("")} className="h-full flex items-center">
                <Link to='/' ><RiHomeFill/></Link>
            </div>
            <div ref={mapRefs.get("chat")} className="h-full flex items-center">
                <Link to='/chat'><HiChatBubbleOvalLeftEllipsis className="h-full" /></Link>
            </div>
            <div ref={mapRefs.get("settings")} className="h-full flex items-center">
                <Link to='/settings'><RiSettings3Fill className="h-full" /></Link>
            </div>
            <IoLogOut className="h-full" onClick={handleLogout} />
        </div>
    )
}