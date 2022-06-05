import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './pages/register'
import Login from './pages/login'
import Home from './pages/home'
import AuthPages from './components/auth-pages'
import AddTask from './pages/add-task'
import './app.css'

function App() {
	return (
		<Router>
			<div className="app">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />

					<Route element={<AuthPages />}>
						<Route path="/add-task" element={<AddTask />} />
					</Route>
				</Routes>
			</div>
		</Router>
	)
}

export default App
