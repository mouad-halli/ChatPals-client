import { createContext, useState } from "react"
import { userDto } from "../@types/user"
import { Socket, io } from "socket.io-client"

type userContextType = {
    user: userDto | null
    socket: Socket<any, any>
    handleSetUser: (user: userDto) => void
    handleUnsetUser: () => void
    handleUpdateUser: (newUserData: userDto) => void
}

type userContextProviderType = {
    children: React.ReactNode
}

export const userContext = createContext({} as userContextType )

export const UserProvider = ({children}: userContextProviderType) => {

    const [user, setUser] = useState<userDto | null>(null)

    // const socket = io(import.meta.env.VITE_BACK_END_URL, { withCredentials: true, autoConnect: false })

    const [socket, setSocket] = useState(io(import.meta.env.VITE_BACK_END_URL, { withCredentials: true, autoConnect: false }))
    
    const handleSetUser = (user: userDto) => {
        setUser(user)
        if (user.imgUrl)
            user.imgUrl += '?' + new Date().getTime()
        socket.connect()
    }

    const handleUnsetUser = () => {
        if (user)
            setUser(null)
        socket.disconnect()
    }

    const handleUpdateUser = (newUserData: userDto) => {
        if (newUserData.imgUrl)
            newUserData.imgUrl += '?' + new Date().getTime()
        setUser({...newUserData})
    }

    // useEffect(() => {
    //     const fetchUser = async () => {
    //         try {
    //             const userData = await getUser()
    //             handleSetUser(userData)
    //         } catch (error: unknown) {
    //             if (user) {
    //                 handleUnsetUser()
    //                 location.href = "auth"
    //             }
    //         }
    //     }

    //     fetchUser()
    // }, [])

    return <userContext.Provider value={{ user, socket, handleSetUser, handleUnsetUser, handleUpdateUser }}>{children}</userContext.Provider>
}