import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
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
	roles: [
		{
			type: String,
			required: true,
		},
	],
	created: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Activity',
		},
	],
	responsible: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Activity',
		},
	],
})

export default mongoose.model('User', userSchema)
