import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { UserSettings } from "./UserSettings";
import { Chat } from "./Chat";
import { Authentication } from "./Authentication";
import { UnderConstruction } from "./UnderConstruction";
import { Channel } from "./Chat/Channel";
import { RoutesRequireBeingAuthenticated } from "../utils/RoutesRequireBeingAuthenticated";
import { RoutesRequireNotBeingAuthenticated } from "../utils/RoutesRequireNotBeingAuthenticated";

const router = createBrowserRouter([
	{
		path: "",
		element: <App />,
		errorElement: <div className="h-screen w-screen text-center pt-20 bg-slate-900 text-white text-6xl font-bold">404 Not Found</div>,
		children: [
			{
				element: <RoutesRequireBeingAuthenticated />,	
				children: [
					{
						path: '/',
						element: <UnderConstruction />
					},
					{
						path: '/chat',
						element: <Chat />,
						children: [
							{
								path: 'channel/:channelId',
								element: <Channel />
							}
						]
					},
					{
						path: '/settings',
						element: <UserSettings />
					},
				]
			},
			{
				element: <RoutesRequireNotBeingAuthenticated />,	
				children: [
					{
						path: '/auth',
						element: <Authentication />
					},
				]
			}
		]
	},
])

export default router