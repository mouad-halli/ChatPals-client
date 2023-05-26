import { HiIdentification, HiMail, HiEye, HiEyeOff } from 'react-icons/hi'
import { useAuthenticationHook } from './useAuthenticationHook'
import Logo from '../../assets/logo.svg'

export const Authentication = () => {

    const { 
        passwordVisibility, handleTogglePasswordVisibility, authMethod, handleToggleAuthMethod,
        firstname, lastname, email, password, setFirstname, setLastname, setEmail, setPassword,
        passwordConfirmation, setPasswordConfirmation, handleSubmit
    } = useAuthenticationHook()

    return (
        <div className="h-screen w-screen flex flex-col justify-center items-center sm:items-start font-lato bg-gradient-to-r from-slate-900 from-30% via-slate-800 via-40% to-gray-900 to-30% text-white">
            <div className='h-40 pt-6 sm:ml-14'>
                <img src={Logo} className='object-cover object-center h-3/6' />
            </div>
            <form className="w-5/6 sm:w-[33rem] h-[80%] flex flex-col gap-y-10 sm:ml-20" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-y-4">
                    <h2 className="text-lg font-semibold text-slate-400">welcom</h2>
                    <h1 className=" text-3xl sm:text-6xl font-semibold">{ authMethod === "sign up" ? "Create an account.": "Log in" }</h1>
                    <label className="font-semibold text-slate-400">{ authMethod === "sign up" ? "Already a member?": "You don't have an account?" }<a className='text-blue-500 font-normal cursor-pointer'
                        onClick={handleToggleAuthMethod}> { authMethod === "sign up" ? "Sign In" : "Sign Up" }</a>
                    </label>
                </div>
                <div className=" w-full sm:w-10/12 flex flex-col gap-y-5">
                {authMethod === "sign up" &&
                    <div className="flex justify-between">
                        <div className=" h-12 sm:h-14 flex px-5 bg-gray-700 w-[46%] rounded-2xl focus-within:ring-2 ring-blue-500">
                            <div className="w-5/6 h-full flex flex-col justify-center ">
                                <span className='text-[65%] text-gray-400'>First name</span>
                                <input
                                    type="text" value={firstname} placeholder='firstname'
                                    className='w-full font-bold bg-inherit placeholder:text-gray-500 placeholder:text-sm placeholder:font-normal outline-none'
                                    onChange={(e) => setFirstname(e.target.value)}
                                />
                            </div>
                            <div className="w-1/6 h-full flex justify-end items-center text-xl text-gray-400"><HiIdentification /></div>
                        </div>
                        <div className=" h-12 sm:h-14 flex px-5 bg-gray-700 w-[46%] rounded-2xl focus-within:ring-2 ring-blue-500">
                            <div className="w-5/6 h-full flex flex-col justify-center ">
                                <span className='text-[65%] text-gray-400'>Last name</span>
                                <input
                                    type="text" value={lastname} placeholder='lastname'
                                    className='w-full font-bold bg-inherit outline-none placeholder:text-gray-500 placeholder:text-sm placeholder:font-normal'
                                    onChange={(e) => setLastname(e.target.value)}
                                />
                            </div>
                            <div className="w-1/6 h-full flex justify-end items-center text-xl text-gray-400"><HiIdentification /></div>
                        </div>
                    </div>}
                    <div className="h-12 sm:h-[3.2rem] w-full flex px-5 bg-gray-700 rounded-2xl focus-within:ring-2 ring-blue-500">
                        <div className="w-5/6 h-full flex flex-col justify-center ">
                            <span className='text-[65%] text-gray-400'>Email</span>
                            <input
                                type="email" value={email} placeholder='email'
                                className='w-full font-bold bg-inherit outline-none placeholder:text-gray-500 placeholder:text-sm placeholder:font-normal'
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="w-1/6 h-full flex justify-end items-center text-xl text-gray-400"><HiMail /></div>
                    </div>
                    <div className="h-12 sm:h-[3.2rem] w-full flex px-5 bg-gray-700 rounded-2xl focus-within:ring-2 ring-blue-500">
                        <div className="w-5/6 h-full flex flex-col justify-center ">
                            <span className='text-[65%] text-gray-400'>Password</span>
                            <input
                                type={passwordVisibility} value={password} placeholder='password'
                                className='w-full font-bold bg-inherit outline-none placeholder:text-gray-500 placeholder:text-sm placeholder:font-normal'
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="w-1/6 h-full flex justify-end items-center text-xl text-gray-400">
                            { passwordVisibility === "password" ?
                                <HiEyeOff onClick={handleTogglePasswordVisibility} />
                                :
                                <HiEye onClick={handleTogglePasswordVisibility} />
                            }
                        </div>
                    </div>
                {authMethod === "sign up" &&
                    <div className="h-12 sm:h-[3.2rem] w-full flex px-5 bg-gray-700 rounded-2xl focus-within:ring-2 ring-blue-500">
                        <div className="w-5/6 h-full flex flex-col justify-center ">
                            <span className='text-[65%] text-gray-400'>Confirm Password</span>
                            <input
                                type={passwordVisibility} value={passwordConfirmation} placeholder='confirm password'
                                className='w-full font-bold bg-inherit outline-none placeholder:text-gray-500 placeholder:text-sm placeholder:font-normal'
                                onChange={(e) => setPasswordConfirmation(e.target.value)}
                            />
                        </div>
                        <div className="w-1/6 h-full flex justify-end items-center text-xl text-gray-400">
                            { passwordVisibility === "password" ?
                                <HiEyeOff onClick={handleTogglePasswordVisibility} />
                                :
                                <HiEye onClick={handleTogglePasswordVisibility} />
                            }
                        </div>
                    </div>}
                </div>
                <div className='w-full sm:w-10/12 flex flex-col sm:flex-row items-center gap-y-4 justify-between'>
                    <button
                        onClick={() => { location.href = `${import.meta.env.VITE_BACK_END_URL}/authentication/google` }}
                        type="button" className=" h-12 sm:h-[3.2rem] w-11/12 sm:w-[48%] text-sm font-semibold text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 rounded-3xl flex items-center justify-center">
                        <svg className="w-4 h-4 mr-2 -ml-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
                        <span className=''>Continue with Google</span>
                    </button>
                    <button className='h-12 sm:h-[3.2rem] w-11/12 sm:w-[48%] bg-gray-600 hover:bg-gray-600/90 text-sm sm:text-base font-semibold rounded-3xl'>
                        {authMethod === "sign up" ? "Create account" : "Log In"}
                    </button>
                </div>
            </form>
        </div>
    )
}