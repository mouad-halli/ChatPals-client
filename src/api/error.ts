import { isAxiosError } from "axios"
import { toast, Id } from "react-toastify"

export const handleError = async (error: unknown, toastId: Id = '') => {
    let toastErrMsg = ''

    if (isAxiosError(error)) {
        const axiosErrorStatus =  error.response?.status
        const axiosErrorMsg = error.response?.data?.message

        if (axiosErrorStatus === 401 || axiosErrorStatus === 403)
            toastErrMsg = 'Action require authentication'
        else
            toastErrMsg = axiosErrorMsg
    }
    else {
        toastErrMsg = 'something went wrong'
    }

    if (toastId)
        toast.update(toastId, { render: toastErrMsg, type: "error", isLoading: false, autoClose: 2000 })
    else
        toast.error(toastErrMsg)
}