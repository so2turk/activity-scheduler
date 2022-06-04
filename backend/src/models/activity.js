import mongoose from 'mongoose'

const activitySchema = new mongoose.Schema(
	{
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		type: {
			type: String,
			required: [true, 'Please select an activity'],
		},
		date: {
			type: Date,
			required: [true, 'Please select a date'],
		},
		reponsible: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		status: {
			type: Boolean,
			required: true,
		},
	},
	{
		timestamps: true,
	}
)

export default mongoose.model('Activity', activitySchema)
