import { useContext, useState } from "react"
import { login, register } from "../../api/authenticationAPI"
import { userContext } from "../../context/UserContext"

export const useAuthenticationHook = () => {

    const { setUser } = useContext(userContext)

    const [passwordVisibility, setPasswordVisibility] = useState("password")

    const [authMethod, setAuthMethod] = useState("sign up")

    const [firstname, setFirstname] = useState("")
    
    const [lastname, setLastname] = useState("")

    const [email, setEmail] = useState("")

    const [password, setPassword] = useState("")

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
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            if (authMethod === "sign up") {
                await register({ firstname, lastname, email, password })
                handleToggleAuthMethod()
            }
            else {
                const res = await login({ email, password })
                setUser(res)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return {
        passwordVisibility, handleTogglePasswordVisibility, authMethod, handleToggleAuthMethod,
        firstname, lastname, email, password, setFirstname, setLastname, setEmail, setPassword,
        handleSubmit
    }
}