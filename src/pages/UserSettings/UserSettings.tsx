import { useUserSettingsHook } from "./useUserSettingsHook"
import { FaPencilAlt } from 'react-icons/fa'

export const UserSettings = () => {

    const { 
        img, firstname, lastname, email, password, setFirstname, setLastname, setEmail, setPassword,
        isFirstnameDisabled, isLastnameDisabled, isEmailDisabled, isPasswordDisabled,
        handleToggleIsFirstnameDisabled, handleToggleIsLastnameDisabled, handleToggleIsEmailDisabled, handleUploadImage,
        handleToggleIsPasswordDisabled, firstnameRef, lastnameRef, emailRef, passwordRef,
        isFirstnameUpdating, isLastnameUpdating, isEmailUpdating, isPasswordUpdating
     } = useUserSettingsHook()

    return (
        <div className="h-full w-full flex flex-col gap-y-8 px-4 py-6">
            <h1 className="text-3xl font-bold sm:text-center pb-20">Account Settings</h1>
            <div className="w-full max-w-sm self-center flex items-center justify-center gap-x-4">
                <div className=" flex-shrink-0 relative w-14 h-14">
                    <img className="w-full h-full rounded-full" src={img} />
                    <label className="absolute top-0 right-0 p-[0.20rem] text-[55%] ring-2 ring-black bg-gray-200 text-black rounded-full cursor-pointer">
                        <FaPencilAlt/>
                        <input type="file" className="hidden" onChange={handleUploadImage} />
                    </label>
                </div>
                <h1 className=" font-bold text-lg truncate">{`${firstname} ${lastname}`}</h1>
            </div>
            <div className="w-full max-w-md self-center flex flex-col gap-y-4 py-3 px-4 bg-gray-700/60 rounded-lg">
                <div className="flex items-center">
                    <div className="w-5/6 flex flex-col">
                        <span className="text-sm font-light">Firstname</span>
                        <input
                            ref={firstnameRef} type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)}
                            className="bg-inherit w-5/6 font-bold outline-none text-gray-600" disabled={isFirstnameDisabled}
                        />
                    </div>
                    <button disabled={isFirstnameUpdating} className="w-1/6 py-1 text-sm font-bold bg-gray-600 rounded-md" onClick={handleToggleIsFirstnameDisabled}>
                        {isFirstnameDisabled ? 'Edit' : 'Save'}
                    </button>
                </div>
                <div className="flex items-center">
                    <div className="w-5/6 flex flex-col">
                        <span className="text-sm font-light">Lastname</span>
                        <input
                            ref={lastnameRef} type="text" value={lastname} onChange={(e) => setLastname(e.target.value)}
                            className="bg-inherit w-5/6 font-bold outline-none text-gray-600" disabled={isLastnameDisabled}
                        />
                    </div>
                    <button disabled={isLastnameUpdating} className="w-1/6 py-1 text-sm font-bold bg-gray-600 rounded-md" onClick={handleToggleIsLastnameDisabled}>
                        {isLastnameDisabled ? 'Edit' : 'Save'}
                    </button>
                </div>
                <div className="flex items-center">
                    <div className="w-5/6 flex flex-col">
                        <span className="text-sm font-light">Email</span>
                        <input
                            ref={emailRef} type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                            className="bg-inherit w-5/6 font-bold outline-none text-gray-600" disabled={isEmailDisabled}
                        />
                    </div>
                    <button disabled={isEmailUpdating} className="w-1/6 py-1 text-sm font-bold bg-gray-600 rounded-md" onClick={handleToggleIsEmailDisabled}>
                        {isEmailDisabled ? 'Edit' : 'Save'}
                    </button>
                </div>
                <div className="flex items-center justify-between">
                    <div className=" w-5/6 flex flex-col">
                        <span className="text-sm font-light">Password</span>
                        <input
                            ref={passwordRef} type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                            className="bg-inherit w-5/6 font-bold outline-none text-gray-600" disabled={isPasswordDisabled}
                        />
                    </div>
                    <button disabled={isPasswordUpdating} className=" w-1/6 py-1 text-sm font-bold bg-gray-600 rounded-md" onClick={handleToggleIsPasswordDisabled}>
                        {isPasswordDisabled ? 'Edit' : 'Save'}
                    </button>
                </div>
            </div>
        </div>
    )
}