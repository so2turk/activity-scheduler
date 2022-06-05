import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import AxiosJWT from '../utils/axios-jwt'
import Loading from '../components/loading'

const Activity = () => {
	const { id } = useParams()
	const [activity, setActivity] = useState()
	const axiosPrivate = AxiosJWT()

	const taskRef = useRef()
	const descriptionRef = useRef()
	const dateRef = useRef()
	const durationRef = useRef()
	const responsibleRef = useRef()
	const [staffs, setStaffs] = useState([])

	const [addSuccess, setAddSucces] = useState(false)
	const [addFailure, setAddFailure] = useState(false)

	const navigate = useNavigate()
	const location = useLocation()
	const from = location.state?.from?.pathname || `/`

	const filter = {
		role: 'staff',
	}

	useEffect(() => {
		getStaff()

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		getActivity()

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id])

	const getStaff = async () => {
		try {
			const result = await axiosPrivate.post('/users/filter', { filter })
			setStaffs(result?.data?.users)
		} catch (err) {
			console.log(err)
		}
	}

	const handleUpdate = async (e) => {
		e.preventDefault()

		const updateVal = {
			task: taskRef.current.value,
			description: descriptionRef.current.value,
			date: dateRef.current.value,
			duration: durationRef.current.value,
			responsible: responsibleRef.current.value,
		}

		let activityToUpdate = {}

		for (let key in updateVal) {
			if (updateVal[key] !== null && updateVal[key].length > 0) {
				activityToUpdate[key] = updateVal[key]
			}
		}

		console.log(activityToUpdate)

		try {
			await axiosPrivate.patch(
				`/activity/update/${activity._id}`,
				activityToUpdate
			)
			setAddSucces(true)
			setAddFailure(false)

			setTimeout(() => {
				navigate(from, { replace: true })
			}, 1000)
		} catch (err) {
			console.log(err)
			setAddFailure(true)
			setAddSucces(false)
		}
	}

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
			<section className="activityDetail">
				<div>
					<div>
						<label>Created By:</label>
						<Link to={`/user/${activity.createdBy._id}`}>
							<img
								style={{ width: '40px' }}
								className="avatar nav-avatar"
								alt={activity.createdBy.name}
								src={activity.createdBy.avatar}
							/>
						</Link>
					</div>{' '}
					<label>Task:</label>
					{activity.task}
				</div>
				<div>
					<label>Date:</label>
					{activity.date}
				</div>
				<div>
					<label>Duratin (min):</label>
					{activity.duration}
				</div>
				<div>
					<label>Staff:</label>
					<Link to={`/user/${activity.responsible._id}`}>
						<img
							style={{ width: '40px' }}
							className="avatar nav-avatar"
							alt={activity.responsible.name}
							src={activity.responsible.avatar}
						/>
					</Link>
				</div>
			</section>
			<section style={{ marginTop: '100px' }} className="activityUpdate">
				<form className="taskForm" onSubmit={handleUpdate}>
					<select ref={taskRef}>
						<option value="Mowing">Mowing</option>
						<option value="Fertilisation">Fertilisation</option>
						<option value="Irrigation">Irrigation</option>
						<option value="Aeration">Aeration</option>
					</select>
					<textarea
						rows="5"
						cols="50"
						type="text"
						placeholder="Description"
						ref={descriptionRef}
					/>
					<input type="datetime-local" ref={dateRef} />
					<input
						type="number"
						placeholder="Duration (in minute)"
						ref={durationRef}
					/>
					<select ref={responsibleRef}>
						<option>Select</option>
						{staffs.map((e) => (
							<option key={e.id} value={e._id}>
								{e.name}
							</option>
						))}
					</select>
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

export default Activity
