import express from 'express'
import {
	createActivity,
	deleteActivity,
	filterActivities,
	getActivities,
	getActivity,
	updateActivity,
} from '../controllers/activity-controller.js'
import { verify } from '../utils/auth.js'

const activityRouter = express.Router()

activityRouter
	.post('/create', verify, createActivity)
	.patch('/update/:activityId', verify, updateActivity)
	.delete('/delete/:activityId', verify, deleteActivity)
	.get('/getActivity/:activityId', verify, getActivity)
	.get('/getAll', getActivities)
	.get('/filter', filterActivities)

export default activityRouter
