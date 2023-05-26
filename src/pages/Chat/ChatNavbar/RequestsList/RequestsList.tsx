import { Children } from 'react'
import { BsFillCheckCircleFill, BsXCircleFill } from 'react-icons/bs'
import { useRequestsListHook } from './useRequestsListHook'

type propsType = {
    decrementRequestsCount: () => void
    incrementRequestsCount: () => void
}

export const RequestsList = (props: propsType) => {

    const { requesters, handleAcceptRequest, handleRejectRequest } = useRequestsListHook(props)

    return (
        <div className="z-10 absolute top-24 left-1/2 transform -translate-x-1/2 w-[17rem] h-[25rem] flex flex-col items-center gap-y-4 bg-[#08172E]/90 rounded-xl py-6 overflow-y-auto">
            <h1 className="font-bold">New Requests</h1>
            <div className="flex justify-center">
                {Children.toArray(requesters.map(user => (
                    <div className=" w-56 rounded-xl h-16 min-h-full flex items-center px-4 bg-slate-700">
                        <div className="w-4/6 flex gap-x-2 items-center">
                            <img className="w-9 h-9 flex-shrink-0 rounded-full" src={user.imgUrl} />
                            <h1 className="text-sm font-bold truncate">{`${user.firstname} ${user.lastname}`}</h1>
                        </div>
                        <div className="w-2/6 flex items-center justify-center gap-x-2">
                            <BsFillCheckCircleFill className='cursor-pointer' onClick={() => {handleAcceptRequest(user._id)}} />
                            <BsXCircleFill className='cursor-pointer' onClick={() => {handleRejectRequest(user._id)}}/>
                        </div>
                    </div>
                )))}
            </div>
        </div>
    )
}