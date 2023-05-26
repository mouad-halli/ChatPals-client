import underConstructionLogo from '../assets/under-construction.png'

// #374D85

export const UnderConstruction = () => {
    return (
        <div className="w-screen h-screen flex justify-center items-center px-10 md:px-20">
            <div className=' xl:w-full h-5/6 flex flex-col flex-grow gap-y-10 py-20 text-center'>
                <h1 className='text-3xl md:text-5xl xl:text-4xl 2xl:text-5xl font-bold text-[#4466E3]/80'>UNDER CONSTRUCTION</h1>
                <p className='text-lg text-[#374D85]'>This page is still not available due to lack of ideas lol</p>
            </div>
            <img className='hidden xl:block xl:min-w-[45rem] 2xl:min-w-[51rem] h-[39rem]' src={underConstructionLogo} />
        </div>
    )
}