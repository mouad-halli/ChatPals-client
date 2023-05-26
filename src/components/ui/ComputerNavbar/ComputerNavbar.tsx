import { RiSettings3Fill } from 'react-icons/ri'
import { RiHomeFill } from 'react-icons/ri'
import { HiChatBubbleOvalLeftEllipsis } from 'react-icons/hi2'
import { IoLogOut } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import Logo from '../../../assets/logo.svg'
import { useComputerNavbarHook } from './useComputerNavbar'

export const ComputerNavbar = () => {

    const { img, mapRefs, handleLogout } = useComputerNavbarHook()

    return (
        <div className=" w-28 h-screen hidden md:flex flex-shrink-0 flex-col pb-12 pt-6">
            <div className="w-full h-1/6 flex justify-center items-start ">
                <img className="w-20 h-16" src={Logo} />
            </div>
            <div className='w-full h-4/6 flex flex-col justify-center items-center gap-y-10'>
                <div ref={mapRefs.get('')} className=" w-full flex justify-center text-gray-400/80">
                    <Link to='/' ><RiHomeFill size={22}/></Link>
                </div>
                <div ref={mapRefs.get('chat')} className="w-full flex justify-center text-gray-400/80">
                    <Link to='/chat'><HiChatBubbleOvalLeftEllipsis size={22} /></Link>
                </div>
                <div ref={mapRefs.get('settings')} className="w-full flex justify-center text-gray-400/80">
                    <Link to='/settings'><RiSettings3Fill size={22} /></Link>
                </div>
                <IoLogOut size={22} className=" cursor-pointer text-gray-400/80" onClick={handleLogout} />
            </div>
            <div className='w-full h-1/6 flex justify-center items-end'>
                <div className="relative w-8 h-8">
                    <img className="w-full h-full rounded-full ring-[3px] ring-gray-500" src={img}/>
                    <span className="absolute top-[0.02rem] right-[0.02rem] p-[0.20rem] text-[55%] ring-2 ring-black bg-green-300 text-black rounded-full"></span>
                </div>
            </div>
        </div>
    )
}