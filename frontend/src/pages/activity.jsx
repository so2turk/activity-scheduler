import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import AxiosJWT from '../utils/axios-jwt'

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

	return <div>{activity.task}</div>
}

export default Activity
