const ActivityCard = ({ activity }) => {
	return (
		<div className="card" key={activity._id}>
			<div className="card-detail">
				<div>{activity.task}</div>
				<div>{activity.date}</div>
				<div>{activity.duration}</div>
				<div>{activity.responsible.name}</div>
			</div>
		</div>
	)
}

export default ActivityCard
