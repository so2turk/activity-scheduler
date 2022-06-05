import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../app.css'
import ActivityCard from '../components/activity-card'
import Loading from '../components/loading'
import axios from '../utils/axios'

const Home = () => {
	const [activities, setActivities] = useState([])
	const [loading, setLoading] = useState(false)
	const filter = {
		status: false,
	}

	useEffect(() => {
		setLoading(true)
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
		setLoading(false)
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
			<div>
				{activities.length > 0 ? (
					activities.map((activity) => (
						<Link to={`/activity/${activity._id}`}>
							<ActivityCard activity={activity} />
						</Link>
					))
				) : (
					<Loading />
				)}
			</div>
			{loading && <Loading />}
		</div>
	)
}

export default Home
