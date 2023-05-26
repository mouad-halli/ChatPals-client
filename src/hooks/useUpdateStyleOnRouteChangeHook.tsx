import { useEffect, useRef } from "react"
import { useLocation } from "react-router-dom"

type stylingType = {
    [index: string]: string
}

export const useUpdateStyleOnRouteChangeHook = (routes: string[], styling: stylingType) => {

    const mapRefs = new Map(routes.map(route => [route, useRef<HTMLDivElement>(null)]))

    const currentRoute = useLocation().pathname.split('/').at(1)

    useEffect(() => {

		if (currentRoute === undefined)
			return

		let buttonStyle = mapRefs.get(currentRoute)?.current?.style

        if (!buttonStyle)
            return

		if (buttonStyle) {
            for (const key in styling)
                buttonStyle.setProperty(key, styling[key])
        }

		return () => {
            if (!buttonStyle)
                return

            for (const key in styling)
                buttonStyle.setProperty(key, "")
		}

    }, [currentRoute])

    return mapRefs
}