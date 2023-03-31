import { createContext, useEffect, useState } from "react"
import { userType } from "../@types/user"
import { getUser } from "../api/userAPI"
import { isAxiosError } from "axios"
import { refreshAccessToken } from "../api/authenticationAPI"

type userContextType = {
    user: userType | null
    setUser: React.Dispatch<React.SetStateAction<userType | null>>
    handleLogout: () => void
}

type userContextProviderType = {
    children: React.ReactNode
}

export const userContext = createContext({} as userContextType )

export const UserProvider = ({children}: userContextProviderType) => {

    const [user, setUser] = useState<userType | null>(null)

    const handleLogout = () => setUser(null)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getUser()
                setUser(userData)
            } catch (error: unknown) {
                if (isAxiosError(error) && error.response?.status === 401) {
                    try {
                        const userData = await refreshAccessToken()
                        setUser(userData)
                    } catch (error) {
                        console.log(error)
                    }
                }
                console.log(error)
            }
        }

        fetchUser()
    }, [])

    return <userContext.Provider value={{ user, setUser, handleLogout }}>{children}</userContext.Provider>
}