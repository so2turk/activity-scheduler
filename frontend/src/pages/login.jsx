import { useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from '../utils/axios'
import useAuth from '../utils/use-auth'
import '../app.css'

const Login = () => {
	const { setAuth } = useAuth()

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
			const res = await axios.post('/users/login', userToLog)
			const user = res?.data?.user
			const accessToken = res?.data?.accessToken

			setAuth({ user, accessToken })
			navigate(from, { replace: true })
		} catch (err) {
			console.log(err)
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
				{logFailure && <span className="failure">Login is failed</span>}
			</div>
		</div>
	)
}

export default Login
