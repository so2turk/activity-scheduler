import mongoose from 'mongoose'
import autopopulate from 'mongoose-autopopulate'

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			unique: true,
			required: [true, 'Please add an email'],
			max: 50,
		},
		name: {
			type: String,
			unique: true,
			required: [true, 'Please add a (user) name'],
			min: 2,
			max: 15,
		},
		password: {
			type: String,
			required: [true, 'Please add a password'],
			min: 6,
		},
		role: {
			type: String,
			required: true,
		},
		created: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Activity',
				autopopulate: { maxDepth: 1 },
			},
		],
		responsible: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Activity',
				autopopulate: { maxDepth: 1 },
			},
		],
		refreshToken: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
)

export default mongoose.model('User', userSchema)
