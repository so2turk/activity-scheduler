import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './pages/register'
import './app.css'

function App() {
	return (
		<Router>
			<div className="app">
				<Routes>
					<Route path="/" element={<Register />} />
				</Routes>
			</div>
		</Router>
	)
}

export default App
