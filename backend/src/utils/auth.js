import jwt from 'jsonwebtoken'
import User from '../models/user-model.js'
const accessTokenKey = process.env.ACCESS_TOKEN_KEY
const refreshTokenKey = process.env.REFRESH_TOKEN_KEY

export const genAccessToken = (date, user) => {
	return jwt.sign(
		{
			date: date,
			name: user.name,
			id: user._id,
			role: user.role,
			avatar: user.avatar,
		},
		accessTokenKey,
		{
			expiresIn: '15s',
		}
	)
}

export const genRefreshToken = (date, user) => {
	return jwt.sign(
		{
			date: date,
			name: user.name,
			id: user._id,
			role: user.role,
			avatar: user.avatar,
		},
		refreshTokenKey,
		{ expiresIn: '1d' }
	)
}

export const verify = (req, res, next) => {
	const authHeader = req.headers.authorization || req.headers.Authorization

	if (!authHeader) return res.status(401).send('Authorization failed: no token')
	else if (!authHeader.startsWith('Bearer'))
		return res.status(401).send('Authorization failed: token is not valid')

	const token = authHeader.split(' ')[1]

	jwt.verify(token, accessTokenKey, async (err, user) => {
		if (err)
			return res.status(403).send('Authorization failed: token is not valid')

		req.id = user.id
		req.role = user.role
		next()
	})
}

export const verifyRefreshToken = async (req, res, next) => {
	const cookies = req.cookies
	if (!cookies?.jwtRefresh)
		return res.status(401).send('Authorization failed: no token provided')
	const refreshToken = cookies.jwtRefresh

	const user = await User.findOne({ refreshToken })
	if (!user)
		return res.status(403).send('Authorization failed: token is not valid')

	jwt.verify(refreshToken, refreshTokenKey, (err, decodedUser) => {
		if (err || user._id.toString() !== decodedUser.id)
			return res.status(403).send('Authorization failed: token is not valid')

		req.user = user
		next()
	})
}
