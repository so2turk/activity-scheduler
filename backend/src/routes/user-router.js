import express from 'express'
import {
	deleteUser,
	filterUsers,
	getUser,
	login,
	logout,
	register,
	updateUser,
} from '../controllers/user-controller.js'
import { verify } from '../utils/auth.js'

const userRouter = express.Router()

userRouter
	.post('/register', register)
	.post('/login', login)
	.get('/logout', verify, logout)
	.patch('/update/:userId', verify, updateUser)
	.delete('/delete/:userId', verify, deleteUser)
	.get('/getUser/:userId', verify, getUser)
	.post('/filter', verify, filterUsers)

export default userRouter
