import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import AxiosJWT from '../utils/axios-jwt'
import Loading from '../components/loading'

const User = () => {
	const { id } = useParams()
	const [user, serUser] = useState()
	const axiosPrivate = AxiosJWT()

	const emailRef = useRef()
	const nameRef = useRef()

	const [addSuccess, setAddSucces] = useState(false)
	const [addFailure, setAddFailure] = useState(false)

	const navigate = useNavigate()
	const location = useLocation()
	const from = location.state?.from?.pathname || `/`

	useEffect(() => {
		getUser()

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id])

	const getUser = async () => {
		try {
			const result = await axiosPrivate.get(`/users/getUser/${id}`)
			serUser(result?.data?.user)
		} catch (err) {
			console.error(err)
			navigate('/login', from, { replace: true })
		}
	}

	const handleUpdate = async (e) => {
		e.preventDefault()

		const updateVal = {
			email: emailRef.current.value,
			name: nameRef.current.value,
		}

		let userToUpdate = {}

		for (let key in updateVal) {
			if (updateVal[key] !== null && updateVal[key].length > 0) {
				userToUpdate[key] = updateVal[key]
			}
		}

		try {
			await axiosPrivate.patch(`/users/update/${user._id}`, userToUpdate)
			setAddSucces(true)
			setAddFailure(false)

			setTimeout(() => {
				getUser()
			}, 1000)
		} catch (err) {
			console.log(err)
			setAddFailure(true)
			setAddSucces(false)
		}
	}

	if (!user) return <Loading />

	return (
		<main>
			<section className="activityDetail">
				<div>
					<div>
						<Link to={`/user/${user._id}`}>
							<img
								style={{ width: '40px' }}
								className="avatar nav-avatar"
								alt={user.name}
								src={user.avatar}
							/>
						</Link>
					</div>{' '}
					<label>email:</label>
					{user.email}
				</div>
				<div>
					<label>Name:</label>
					{user.name}
				</div>
			</section>
			<section style={{ marginTop: '100px' }} className="activityUpdate">
				<form className="taskForm" onSubmit={handleUpdate}>
					<input type="email" placeholder="email" ref={emailRef} />
					<input type="text" placeholder="Name" ref={nameRef} />
					<button className="button btnLR" type="submit">
						Update
					</button>
				</form>
				<div>
					{addSuccess && (
						<span className="success">Activity is created successfuly</span>
					)}
					{addFailure && (
						<span className="failure">Activity creation is failed</span>
					)}
				</div>
			</section>
		</main>
	)
}

export default User
