import ReactDOM from 'react-dom/client'
import './index.css'
import { UserProvider } from './context/UserContext'
import router from './pages/router'
import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<UserProvider>
		<RouterProvider router={router}></RouterProvider>
	</UserProvider>
)
