import Activity from '../models/activity-model.js'
import User from '../models/user-model.js'
import mongoose from 'mongoose'

export const createActivity = async (req, res) => {
	const { type, description, date, responsible } = req.body
	const user = req.user

	try {
		if (!type || !description || !date || !responsible)
			return res.status(400).json('Please add all fields')

		const responsibleUser = await User.findById(responsible)

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

	console.log('user', req.user.created)
	console.log('id', id)

	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(401).send('No activity with that id')

	if (
		req.user.created.some((activity) => activity == id) ||
		req.user.role === 'admin'
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

export const deleteActivity = (req, res) => {}
export const getActivity = (req, res) => {}
export const getActivities = (req, res) => {}
