import { useContext, useEffect, useRef, useState } from "react"
import { userContext } from "../../context/UserContext"
import { updateUser, uploadUserImg } from "../../api/userAPI"
import { handleError } from "../../api/error"
import { toast } from "react-toastify"
import { isAxiosError } from "axios"

export const useUserSettingsHook = () => {

    const { user, handleUpdateUser } = useContext(userContext)

    const [firstname, setFirstname] = useState("")

    const [isFirstnameUpdating, setIsFirstnameUpdating] = useState(false)
    
    const [lastname, setLastname] = useState("")

    const [isLastnameUpdating, setIsLastnameUpdating] = useState(false)

    const [email, setEmail] = useState("")

    const [isEmailUpdating, setIsEmailUpdating] = useState(false)

    const [password, setPassword] = useState("")

    const [isPasswordUpdating, setIsPasswordUpdating] = useState(false)

    const [isFirstnameDisabled, setIsFirstnameDisabled] = useState(true)

    const [isLastnameDisabled, setIsLastnameDisabled] = useState(true)

    const [isEmailDisabled, setIsEmailDisabled] = useState(true)
    
    const [isPasswordDisabled, setIsPasswordDisabled] = useState(true)

    const firstnameRef = useRef<HTMLInputElement>(null)
    const lastnameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (user) {
            setFirstname(user.firstname)
            setLastname(user.lastname)
            setEmail(user.email)
        }
    }, [user])

    const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!user || !files)
            return
        try {
            user.imgUrl = await uploadUserImg(files[0])
            handleUpdateUser(user)

        } catch (error: unknown) { handleError(error) }
    }

    const toggleStyleColor = (style: CSSStyleDeclaration | undefined, state: boolean) => {
        if (!style)
            return

        if (state === false) {
            style.color = "white"
        } else if (state === true) {
            style.color = "#6b7280"
        }
    }

    const handleUpdateFirstname = async () => {
        let toastId
        try {
            toastId = toast.loading('updating firstname')
            setIsFirstnameUpdating(true)
            await updateUser({firstname})
            if (user)
                handleUpdateUser({...user, lastname: lastname})
            toast.update(toastId, { render: "Firstname updated successfully", type: "success", isLoading: false, autoClose: 2000 });
            setIsFirstnameUpdating(false)
            return true
            
        } catch (error) {
            handleError(error, toastId)
            setIsFirstnameUpdating(false)
            return false
        }
    }

    const handleUpdateLastname = async () => {
        let toastId
        try {
            toastId = toast.loading('updating lastname...')
            setIsLastnameUpdating(true)
            await updateUser({lastname})
            if (user)
                handleUpdateUser({...user, lastname: lastname})
            toast.update(toastId, { render: "Lastname updated successfully", type: "success", isLoading: false, autoClose: 2000 });
            setIsLastnameUpdating(false)
            return true
            
        } catch (error) {
            handleError(error, toastId)
            setIsLastnameUpdating(false)
            return false
        }
    }

    const handleUpdateEmail = async () => {
        let toastId
        try {
            toastId = toast.loading('updating email...')
            setIsEmailUpdating(true)
            await updateUser({email})
            if (user)
                handleUpdateUser({...user, email: email})
            toast.update(toastId, { render: "Email updated successfully", type: "success", isLoading: false, autoClose: 2000 });
            setIsEmailUpdating(false)
            return true
            
        } catch (error) {
            handleError(error, toastId)
            setIsEmailUpdating(false)
            return false
        }
    }

    const handleUpdatePassword = async () => {
        let toastId
        try {
            toastId = toast.loading('Updating password...')
            setIsPasswordUpdating(true)
            await updateUser({password})
            toast.update(toastId, { render: "Password updated successfully", type: "success", isLoading: false, autoClose: 2000 });
            setIsPasswordUpdating(false)
            return true
            
        } catch (error) {
            handleError(error, toastId)
            setIsPasswordUpdating(false)
            return false
        }
    }

    const handleToggleIsFirstnameDisabled = async () => {
        const isSaveData = !isFirstnameDisabled

        setIsFirstnameDisabled(isSaveData)
        toggleStyleColor(firstnameRef.current?.style, isSaveData)

        if (isSaveData === true && !await handleUpdateFirstname()) {
            setIsFirstnameDisabled(!isSaveData)
            toggleStyleColor(firstnameRef.current?.style, !isSaveData)
        }
    }

    const handleToggleIsLastnameDisabled = async () => {
        const isSaveData = !isLastnameDisabled

        setIsLastnameDisabled(isSaveData)
        toggleStyleColor(lastnameRef.current?.style, isSaveData)

        if (isSaveData === true && !await handleUpdateLastname()) {
            setIsLastnameDisabled(!isSaveData)
            toggleStyleColor(lastnameRef.current?.style, !isSaveData)
        }
    }

    const handleToggleIsEmailDisabled = async () => {
        const isSaveData = !isEmailDisabled

        setIsEmailDisabled(isSaveData)
        toggleStyleColor(emailRef.current?.style, isSaveData)

        if (isSaveData === true && !await handleUpdateEmail()) {
            setIsEmailDisabled(!isSaveData)
            toggleStyleColor(emailRef.current?.style, !isSaveData)
        }
    }

    const handleToggleIsPasswordDisabled = async () => {
        const isSaveData = !isPasswordDisabled

        setIsPasswordDisabled(isSaveData)
        toggleStyleColor(passwordRef.current?.style, isSaveData)

        if (isSaveData === true && !await handleUpdatePassword()) {
            setIsPasswordDisabled(!isSaveData)
            toggleStyleColor(passwordRef.current?.style, !isSaveData)
        }
    }
    
    return {
        img: user?.imgUrl, firstname, lastname, email, password, setFirstname, setLastname, setEmail, setPassword,
        isFirstnameDisabled, isLastnameDisabled, isEmailDisabled, isPasswordDisabled,
        handleToggleIsFirstnameDisabled, handleToggleIsLastnameDisabled, handleToggleIsEmailDisabled, handleUploadImage,
        handleToggleIsPasswordDisabled, firstnameRef, lastnameRef, emailRef, passwordRef,
        isFirstnameUpdating, isLastnameUpdating, isEmailUpdating, isPasswordUpdating
    }
}