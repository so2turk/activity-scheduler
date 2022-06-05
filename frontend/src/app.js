import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './pages/register'
import Login from './pages/login'
import Home from './pages/home'
import AuthPages from './components/auth-pages'
import AddTask from './pages/add-task'
import Activity from './pages/activity'
import PersistentLogin from './components/persist-login'
import Nav from './components/nav'
import './app.css'
import User from './pages/user'

function App() {
	return (
		<Router>
			<div className="app">
				<Nav />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />

					<Route element={<PersistentLogin />}>
						<Route element={<AuthPages />}>
							<Route path="/add-task" element={<AddTask />} />
							<Route path="/activity/:id" element={<Activity />} />
							<Route path="/user/:id" element={<User />} />
						</Route>
					</Route>
				</Routes>
			</div>
		</Router>
	)
}

export default App
