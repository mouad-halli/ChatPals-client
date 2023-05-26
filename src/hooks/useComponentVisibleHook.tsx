import { useEffect, useRef, useState } from "react"

export const useComponentVisibleHook = (initialState: boolean) => {

    const [isVisible, setIsVisible] = useState(initialState)

    const ref = useRef<HTMLDivElement>(null)

    const handleToggleIsVisible = () => setIsVisible(!isVisible)

    const handleClickOutside = (event: any) => {
        if (ref.current && !ref.current.contains(event.target))
            setIsVisible(false)
    }

    useEffect(() => {

        document.addEventListener('click', handleClickOutside, true)

        return () => {
            document.removeEventListener('click', handleClickOutside, true)
        }

    }, [])

    return {
        isVisible, handleToggleIsVisible, ref
    }
}