import { Link } from 'react-router-dom'
import '../app.css'

const Home = () => {
	return (
		<div className="home">
			<h2>Dash Board</h2>
			<Link to="/login">
				<button className="button btnLR">Login</button>
			</Link>
			<Link to="/register">
				<button className="button btnLR">Register</button>
			</Link>
		</div>
	)
}

export default Home
