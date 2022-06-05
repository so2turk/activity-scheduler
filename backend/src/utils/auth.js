import jwt from 'jsonwebtoken'
const accessTokenKey = process.env.ACCESS_TOKEN_KEY
const refreshTokenKey = process.env.REFRESH_TOKEN_KEY

export const genAccessToken = (date, user) => {
	return jwt.sign(
		{
			date: date,
			name: user.name,
			id: user._id,
			role: user.role,
		},
		accessTokenKey,
		{
			expiresIn: '15s',
		}
	)
}

export const genRefreshToken = (date, user) => {
	return jwt.sign(
		{ date: date, name: user.name, id: user._id, role: user.role },
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

export const verifyRefreshToken = async (req, res, next) => {}
