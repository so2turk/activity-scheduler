import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../app.css'
import axios from '../utils/axios'

const Home = () => {
	const [activities, setActivities] = useState([])
	const filter = {
		status: false,
	}

	useEffect(() => {
		getActivities()

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const getActivities = async () => {
		try {
			const result = await axios.get('/activity/filter', { filter })
			setActivities(result?.data?.activities)
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<div className="home">
			<h2>Dash Board</h2>
			<Link to="/login">
				<button className="button btnLR">Login</button>
			</Link>
			<Link to="/register">
				<button className="button btnLR">Register</button>
			</Link>
			<Link to="/add-task">
				<button className="button btnLR">Add Task</button>
			</Link>
			<section>
				{activities.length > 0 &&
					activities.map((activity) => {
						return (
							<>
								<div>{activity.task}</div>
								<div>{activity.date}</div>
								<div>{activity.duration}</div>
								<div>{activity.responsible.name}</div>
							</>
						)
					})}
			</section>
		</div>
	)
}

export default Home
