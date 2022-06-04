import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Register from './pages/register'
import Login from './pages/login'
import Home from './pages/home'
import './app.css'

function App() {
	const [user, setUser] = useState()

	return (
		<Router>
			<div className="app">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/register" element={<Register />} />
					<Route
						path="/login"
						element={<Login user={user} setUser={setUser} />}
					/>
				</Routes>
			</div>
		</Router>
	)
}

export default App
