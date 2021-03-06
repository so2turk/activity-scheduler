import mongoose from 'mongoose'
import autopopulate from 'mongoose-autopopulate'

const activitySchema = new mongoose.Schema(
	{
		task: {
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
		duration: {
			type: Number,
			required: [true, 'Please provide a duration'],
		},
		responsible: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			autopopulate: { maxDepth: 1 },
		},
		status: {
			type: Boolean,
			required: true,
		},
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			autopopulate: { maxDepth: 1 },
		},
	},
	{
		timestamps: true,
	}
)

activitySchema.plugin(autopopulate)

export default mongoose.model('Activity', activitySchema)
