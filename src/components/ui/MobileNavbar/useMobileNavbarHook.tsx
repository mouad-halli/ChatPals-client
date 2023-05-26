import { useContext, useEffect, useRef } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { logout } from "../../../api/authenticationAPI"
import { userContext } from "../../../context/UserContext"
import { useUpdateStyleOnRouteChangeHook } from "../../../hooks/useUpdateStyleOnRouteChangeHook"
import { handleError } from "../../../api/error"

export const useMobileNavbarHook = () => {

	const { handleUnsetUser } = useContext(userContext)

	const navigate = useNavigate()

	const mapRefs = useUpdateStyleOnRouteChangeHook(["", "chat", "settings"], {color: "#3b82f6", borderBottom: "3px solid #3b82f6"})
    
	const handleLogout = async () => {
		try {
			await logout()
		} catch (error) {
			handleError(error)
		}
		handleUnsetUser()
		navigate('/auth')
	}

    return { mapRefs, handleLogout }
}