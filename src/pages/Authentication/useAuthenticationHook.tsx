import { useState } from "react"
import { login, register } from "../../api/authenticationAPI"
import { useNavigate } from "react-router-dom"
import { handleError } from "../../api/error"

export const useAuthenticationHook = () => {

    const navigate = useNavigate()

    const [passwordVisibility, setPasswordVisibility] = useState("password")

    const [authMethod, setAuthMethod] = useState("sign in")

    const [firstname, setFirstname] = useState("")
    
    const [lastname, setLastname] = useState("")

    const [email, setEmail] = useState("")

    const [password, setPassword] = useState("")

    const [passwordConfirmation, setPasswordConfirmation] = useState("")

    const handleTogglePasswordVisibility = () => {
        if (passwordVisibility === "password")
            setPasswordVisibility("text")
        else
            setPasswordVisibility("password")
    }

    const handleToggleAuthMethod = () => {
        
        if (authMethod === "sign in")
            setAuthMethod("sign up")
        else
            setAuthMethod("sign in")

        setFirstname("")
        setLastname("")
        setEmail("")
        setPassword("")
        setPasswordConfirmation("")
        setPasswordVisibility("text")
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            if (authMethod === "sign up") {
                await register({ firstname, lastname, email, password, passwordConfirmation })
                handleToggleAuthMethod()
            }
            else {
                await login({ email, password })
                navigate('/settings')
            }
        } catch (error) {
            handleError(error)
        }
    }

    return {
        passwordVisibility, handleTogglePasswordVisibility, authMethod, handleToggleAuthMethod,
        firstname, lastname, email, password, setFirstname, setLastname, setEmail, setPassword,
        passwordConfirmation, setPasswordConfirmation, handleSubmit
    }
}