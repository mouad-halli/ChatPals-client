import { useContext } from "react"
import { Authentication } from "./pages/Authentication"
import { userContext } from "./context/UserContext"

const App = () => {

	const { user } = useContext(userContext)

	return (
		<div className="h-screen w-screen font-lato bg-gradient-to-r from-slate-900 from-30% via-slate-800 via-40% to-gray-900 to-30% text-white">
			{!user ?
				<Authentication />
				:
				<h1>lol nadi</h1>
			}
		</div>
	)
}

export default App
