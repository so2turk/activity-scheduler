import axios from '../utils/axios'
import { useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import '../app.css'

const Register = ({ setShowReg }) => {
	const [regSuccess, setRegSucces] = useState(false)
	const [regFailure, setRegFailure] = useState(false)
	const emailRef = useRef()
	const nameRef = useRef()
	const passwordRef = useRef()
	const navigate = useNavigate()
	const location = useLocation()
	const from = location.state?.from?.pathname || '/login'

	const handleReg = async (e) => {
		e.preventDefault()

		const userToCreate = {
			email: emailRef.current.value,
			name: nameRef.current.value,
			password: passwordRef.current.value,
		}

		try {
			await axios.post('/users/register', userToCreate)
			setRegSucces(true)
			setRegFailure(false)

			setTimeout(() => {
				navigate(from, { replace: true })
			}, 1000)
		} catch (err) {
			console.log(err)
			setRegFailure(true)
			setRegSucces(false)
		}
	}

	return (
		<div className="container">
			<form onSubmit={handleReg}>
				<input type="email" placeholder="E-mail" ref={emailRef} />
				<input type="text" placeholder="User Name" ref={nameRef} />
				<input type="password" placeholder="Password" ref={passwordRef} />
				<button className="button btnLR" type="submit">
					Register
				</button>
			</form>
			<div>
				{regSuccess && (
					<span className="success">Registration is successful</span>
				)}
				{regFailure && <span className="failure">Registration is failed</span>}
			</div>
		</div>
	)
}

export default Register
