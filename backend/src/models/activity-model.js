import mongoose from 'mongoose'

const activitySchema = new mongoose.Schema(
	{
		type: {
			type: String,
			required: [true, 'Please select an activity'],
		},
		description: {
			type: String,
			max: 500,
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
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{
		timestamps: true,
	}
)

export default mongoose.model('Activity', activitySchema)
