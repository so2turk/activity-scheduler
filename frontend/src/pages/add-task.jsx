import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AxiosJWT from '../utils/axios-jwt'
import '../app.css'

const AddTask = () => {
	const taskRef = useRef()
	const descriptionRef = useRef()
	const dateRef = useRef()
	const durationRef = useRef()
	const responsibleRef = useRef()
	const axiosPrivate = AxiosJWT()
	const [staffs, setStaffs] = useState([])
	const [backendMsg, setBackendMsg] = useState(null)

	const [addSuccess, setAddSucces] = useState(false)

	const navigate = useNavigate()
	const location = useLocation()
	const from = location.state?.from?.pathname || '/'

	const filter = {
		role: 'staff',
	}

	useEffect(() => {
		getStaff()

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const getStaff = async () => {
		try {
			const result = await axiosPrivate.post('/users/filter', { filter })
			setStaffs(result?.data?.users)
		} catch (err) {
			console.log(err)
		}
	}

	const handleReg = async (e) => {
		e.preventDefault()
		setBackendMsg(null)

		const activityToCreate = {
			task: taskRef.current.value,
			description: descriptionRef.current.value,
			date: dateRef.current.value,
			duration: durationRef.current.value,
			responsible: responsibleRef.current.value,
		}

		try {
			await axiosPrivate.post('/activity/create', activityToCreate)
			setAddSucces(true)

			setTimeout(() => {
				navigate(from, { replace: true })
			}, 1000)
		} catch (err) {
			setBackendMsg(err.response.data)
			setAddSucces(false)
		}
	}

	return (
		<div className="taskContainer">
			<form className="taskForm" onSubmit={handleReg}>
				<select ref={taskRef}>
					<option>Select Task</option>
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
					<option>Select Responsible Staff</option>
					{staffs.map((e) => (
						<option key={e._id} value={e._id}>
							{e.name}
						</option>
					))}
				</select>
				<button className="button btnLR" type="submit">
					Create an Activity
				</button>
			</form>
			<div>
				{addSuccess && (
					<span className="success">Activity is created successfuly</span>
				)}
				{backendMsg && <span className="failure">{backendMsg}</span>}
			</div>
		</div>
	)
}

export default AddTask
