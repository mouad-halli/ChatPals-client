import { useContext, useEffect, useRef } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { logout } from "../../../api/authenticationAPI"
import { userContext } from "../../../context/UserContext"
import { useUpdateStyleOnRouteChangeHook } from "../../../hooks/useUpdateStyleOnRouteChangeHook"

export const useComputerNavbarHook = () => {

	const { handleUnsetUser, user } = useContext(userContext)

	const navigate = useNavigate()

	const mapRefs = useUpdateStyleOnRouteChangeHook(["", "chat", "settings"], {color: "#3b82f6", borderLeft: "3px solid #3b82f6"})
    
	const handleLogout = async () => {
		try {
			await logout()
		} catch (error) {
			console.log(error)
		}
		handleUnsetUser()
		navigate('/auth')
	}

    return { img: user?.imgUrl, mapRefs, handleLogout }
}