import express from 'express'
import { refreshToken } from '../controllers/jwt-controller.js'
import { verifyRefreshToken } from '../utils/auth.js'
const jwtRouter = express.Router()

jwtRouter.get('/refreshToken', verifyRefreshToken, refreshToken)

export default jwtRouter
