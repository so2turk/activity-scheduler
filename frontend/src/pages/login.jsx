import { useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import JWTDecode from 'jwt-decode'
import '../app.css'

const Login = ({ user, setUser }) => {
	const [logSuccess, setLogSuccess] = useState(false)
	const [logFailure, setLogFailure] = useState(false)
	const emailRef = useRef()
	const passwordRef = useRef()
	const navigate = useNavigate()
	const location = useLocation()
	const from = location.state?.from?.pathname || '/'

	const handleLog = async (e) => {
		e.preventDefault()

		const userToLog = {
			email: emailRef.current.value,
			password: passwordRef.current.value,
		}

		try {
			const res = await axios.post('/api/users/login', userToLog)
			setUser(JWTDecode(res?.data?.accessToken).name)
			setLogSuccess(true)
			setLogFailure(false)

			setTimeout(() => {
				navigate(from, { replace: true })
			}, 500)
		} catch (err) {
			console.log(err)
			setLogSuccess(false)
			setLogFailure(true)
		}
	}

	return (
		<div className="container">
			<form onSubmit={handleLog}>
				<input type="email" placeholder="E-mail" ref={emailRef} required />
				<input
					type="password"
					placeholder="Password"
					ref={passwordRef}
					required
				/>
				<button className="button btnLR" type="submit">
					Login
				</button>
			</form>
			<div>
				{logSuccess && (
					<span className="success">{user}'s login is successful</span>
				)}
				{logFailure && <span className="failure">Login is failed</span>}
			</div>
		</div>
	)
}

export default Login
