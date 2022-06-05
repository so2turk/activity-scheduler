const ActivityCard = ({ activity }) => {
	return (
		<div className="card" key={activity._id}>
			<div className="card-detail">
				<img
					style={{ width: '40px' }}
					className="avatar nav-avatar"
					alt={activity.responsible.name}
					src={activity.responsible.avatar}
				/>
				<div>{activity.task}</div>
			</div>
		</div>
	)
}

export default ActivityCard
