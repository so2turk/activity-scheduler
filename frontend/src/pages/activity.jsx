import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import AxiosJWT from '../utils/axios-jwt'
import Loading from '../components/loading'

const Activity = () => {
	const { id } = useParams()
	const [activity, setActivity] = useState()
	const axiosPrivate = AxiosJWT()

	const navigate = useNavigate()
	const location = useLocation()
	const from = location.state?.from?.pathname || '/'

	useEffect(() => {
		getActivity()
	}, [id])

	const getActivity = async () => {
		try {
			const result = await axiosPrivate.get(`/activity/getActivity/${id}`)
			setActivity(result?.data)
		} catch (err) {
			console.error(err)
			navigate('/login', from, { replace: true })
		}
	}

	if (!activity) return <Loading />

	return (
		<main>
			<header>
				<Link to="/">
					<button className="button btnLR">Home</button>
				</Link>
			</header>
			<section>
				<div>{activity.task}</div>
				<div>{activity.date}</div>
				<div>{activity.duration}</div>
				<div>{activity.responsible.name}</div>
			</section>
		</main>
	)
}

export default Activity
