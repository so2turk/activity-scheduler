export const refreshToken = async (req, res) => {
	const user = req.user

	const accessToken = genAccessToken(new Date(), user)
	res.status(200).json({
		accessToken,
	})
}
