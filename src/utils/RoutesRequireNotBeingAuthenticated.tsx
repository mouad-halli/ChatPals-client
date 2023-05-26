import { useContext, useEffect, useState } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { userContext } from "../context/UserContext"
import { getUser } from "../api/userAPI"

export const RoutesRequireNotBeingAuthenticated = () => {

    const { handleSetUser, handleUnsetUser } = useContext(userContext)

    const [grantPass, setGrantPass] = useState<undefined | boolean>()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getUser()
                handleSetUser(userData)
                setGrantPass(false)
            } catch (error: unknown) {
                handleUnsetUser()
                setGrantPass(true)
            }
        }

        fetchUser()
    }, [])

    if (grantPass === undefined) return null

    return grantPass ? <Outlet /> : <Navigate to="/"></Navigate>
}