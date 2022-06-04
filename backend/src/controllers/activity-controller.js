import Activity from '../models/activity-model.js'
import User from '../models/user-model.js'

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

export const updateActivity = (req, res) => {}
export const deleteActivity = (req, res) => {}
export const getActivity = (req, res) => {}
export const getActivities = (req, res) => {}
