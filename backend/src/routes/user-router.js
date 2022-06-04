import express from 'express'
import {
	deleteUser,
	getUser,
	login,
	logout,
	register,
	updateUser,
} from '../controllers/user-controller'

userRouter = express.Router()

userRouter
	.post('/register', register)
	.post('/login', login)
	.get('/logout', logout)
	.patch('/update/:userId', updateUser)
	.delete('/delete/:userId', deleteUser)
	.get('/getUser/:userId', getUser)

export default userRouter
