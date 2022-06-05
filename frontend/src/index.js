import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app'
import { AuthProvider } from './utils/auth-provider'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<AuthProvider>
			<App />
		</AuthProvider>
	</React.StrictMode>
)
