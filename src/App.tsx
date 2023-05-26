import { useEffect, useState } from "react"
import { ComputerNavbar } from "./components/ui/ComputerNavbar"
import { MobileNavbar } from "./components/ui/MobileNavbar"
import { Outlet, useLocation } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

const App = () => {

	const path = useLocation().pathname.split('/')

	const [hideComputerNavbar, setHideComputerNavbar] = useState(false)

	const [hideMobileNavbar, setHideMobileNavbar] = useState(false)

	useEffect(() => {
		const {1: route, 2: childRoute} = path

		setHideMobileNavbar(childRoute === 'channel' || route === 'auth' ? true : false)
		setHideComputerNavbar(route === 'auth' ? true : false)

	}, [path])

	return (
		<div className=" h-full min-h-screen w-screen flex font-lato bg-gradient-to-r from-slate-900 from-30% via-slate-800 via-40% to-gray-900 to-30% text-white">
			{!hideComputerNavbar && <ComputerNavbar />}
			<Outlet />
			{!hideMobileNavbar && <MobileNavbar />}
			<ToastContainer
				position="top-center"
				autoClose={2000}
				limit={4}
				hideProgressBar
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
		</div>
	)
}

export default App
