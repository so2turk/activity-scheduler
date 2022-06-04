import Activity from '../models/activity-model.js'
import User from '../models/user-model.js'

export const createActivity = async (req, res) => {
	const { type, description, date, responsible } = req.body

	try {
		if (!type || !description || !date || !responsible)
			return res.status(400).json('Please add all fields')

		const user = await User.findById(req.id)
		const responsibleUser = await User.findById(responsible)

		if (user.role !== 'user' && user.role !== 'admin')
			return res
				.status(403)
				.json('You are not allowed to create this activity!')

		if (responsibleUser.role !== 'staff')
			return res
				.status(403)
				.json('You are not allowed to assign activity to this user')

		const newActivity = await Activity.create({
			type,
			description,
			date,
			responsible: responsibleUser,
			status: false,
			createdBy: user,
		})

		user.created.push(newActivity)
		await user.save()

		responsibleUser.responsible.push(newActivity)
		await responsibleUser.save()

		res.status(200).json({ success: 'New activity created' })
	} catch (err) {
		res.status(500).json({ msg: 'Something went wrong', eMsg: err.message })
	}
}

export const updateActivity = async (req, res) => {
	const id = req.params.activityId
	const updates = req.body
	const user = await User.findById(req.id)

	if (
		user.created.some((activity) => activity == id) ||
		user.role === 'admin'
	) {
		try {
			const updatedActivity = await Activity.findByIdAndUpdate(id, updates, {
				new: true,
			})
			res.status(200).json({ success: 'Activity is updated' })
		} catch (err) {
			res.status(400).json({ msg: 'Something went wrong' })
		}
	} else {
		return res.status(403).json('You are not allowed to update this activity!')
	}
}

export const deleteActivity = async (req, res) => {
	const id = req.params.activityId
	const user = await User.findById(req.id)

	if (
		user.created.some((activity) => activity == id) ||
		user.role === 'admin'
	) {
		try {
			const shop = await Activity.findByIdAndDelete(id)
			res.status(200).json({ success: 'Activity is deleted' })
		} catch (err) {
			res.status(500).json({ msg: 'Something went wrong', eMsg: err.message })
		}
	} else {
		return res.status(403).json('You are not allowed to delete this activity!')
	}
}

export const getActivity = async (req, res) => {
	const id = req.params.activityId

	try {
		const activity = await Activity.findById(id)
		if (activity) res.status(200).json(activity)
		else res.status(400).json('No activity is found!')
	} catch (err) {
		res.status(500).json({ msg: 'Something went wrong', eMsg: err.message })
	}
}

export const getActivities = async (req, res) => {
	try {
		const activities = await Activity.find()
		res.status(200).json(activities)
	} catch (err) {
		res.status(500).json({ msg: 'Something went wrong', eMsg: err.message })
	}
}
