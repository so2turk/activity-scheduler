import axios from '../utils/axios'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import JWTDecode from 'jwt-decode'
import useAuth from '../utils/use-auth'
import './nav.css'

const Nav = () => {
	const { auth, setAuth } = useAuth()

	const navigate = useNavigate()
	const location = useLocation()
	const from = location.state?.from?.pathname || '/'

	const handleLogout = async () => {
		try {
			await axios.post('/users/logout')
			setAuth({})
			window.localStorage.clear()
			navigate(from, { replace: true })
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<div className="nav">
			<div>
				<Link to="/">
					<img className="logo-img" src="TC-logo.jpeg" alt="logo" />
				</Link>
			</div>
			<div>
				{auth.accessToken ? (
					<div className="avatar-field">
						<img
							className="avatar nav-avatar"
							alt="avatar"
							src={JWTDecode(auth.accessToken).avatar}
						/>
						<button className="logout button" onClick={handleLogout}>
							Logout
						</button>
					</div>
				) : (
					<>
						<div className="log-res">
							<Link to="/login">
								<button className="login button">Login</button>
							</Link>
							<Link to="/register">
								<button className="registerB button">Register</button>
							</Link>
						</div>
					</>
				)}
			</div>
		</div>
	)
}

export default Nav
