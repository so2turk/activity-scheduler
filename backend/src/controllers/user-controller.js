import User from '../models/user-model.js'
import bcrypt from 'bcryptjs'
import { genAccessToken, genRefreshToken } from '../utils/auth.js'

const saltRounds = 12

export const register = async (req, res) => {
	const { name, email, password } = req.body

	try {
		if (!name || !email || !password)
			return res.status(400).json('Please add all fields')

		const userExists = await User.findOne({ email: email })
		if (userExists) return res.status(400).json('User already exists')

		const salt = await bcrypt.genSalt(saltRounds)
		const hashedPassword = await bcrypt.hash(password, salt)

		const newUser = await User.create({
			email,
			name,
			password: hashedPassword,
			role: 'user',
			avatar: `https://avatars.dicebear.com/api/adventurer/${name}.svg`,
		})
		res.status(200).json({ success: `New user ${newUser.name} created` })
	} catch (err) {
		res.status(500).json({ msg: 'Something went wrong', eMsg: err.message })
	}
}

export const login = async (req, res) => {
	const { email, password } = req.body

	try {
		if (!email || !password)
			return res.status(400).json('Please add all fields')

		const user = await User.findOne({ email })
		if (!user) return res.status(400).json('Wrong email or password')

		const validPass = await bcrypt.compare(password, user.password)
		if (!validPass) return res.status(400).json('Wrong email or password1')

		const refreshToken = genRefreshToken(new Date(), user)
		const accessToken = genAccessToken(new Date(), user)

		user.refreshToken = refreshToken
		const loggedUser = await user.save()

		res.cookie('jwtRefresh', refreshToken, {
			httpOnly: true,
			secure: true,
			sameSite: 'None',
			maxAge: 24 * 60 * 60 * 1000,
		})

		res.status(200).json({ accessToken })
	} catch (err) {
		res.status(500).json(err)
	}
}

export const logout = async (req, res) => {
	const user = req.user

	user.refreshToken = ''
	const loggedoutUser = await user.save()

	res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
	res
		.status(204)
		.send({ success: `${loggedoutUser.userName} successufully logged out` })
}

export const updateUser = async (req, res) => {
	if (req.id === req.params.userId || req.role === 'admin') {
		try {
			const id = req.params.userId
			const updates = req.body

			const updatedUser = await User.findByIdAndUpdate(id, updates, {
				new: true,
			})
			res.send(`User is successfuly updated`)
		} catch (err) {
			res.status(400).json({ msg: 'Something went wrong' })
		}
	} else {
		return res.status(403).json('You are not allowed to update this user!')
	}
}

export const deleteUser = async (req, res) => {
	if (req.id === req.params.userId || req.role === 'admin') {
		try {
			const id = req.params.userId
			const deletedUser = await User.findByIdAndDelete(id)

			res.send(`User has been deleted.`)
		} catch (err) {
			res.status(400).json({ msg: 'Something went wrong' })
		}
	} else {
		return res.status(403).json('You are not allowed to delete this user!')
	}
}

export const getUser = async (req, res) => {
	if (req.id === req.params.userId || req.role === 'admin') {
		try {
			const user = await User.findById(req.params.userId).select('-password')
			if (user)
				res.status(200).json({
					user,
				})
			else res.status(400).json('No user found')
		} catch (err) {
			res.status(500).json({ msg: 'something went wrong', eMsg: err.message })
		}
	} else {
		return res.status(403).json('You are not allowed to get this data!')
	}
}

export const filterUsers = async (req, res) => {
	const filter = req.body.filter

	try {
		User.find(filter).exec((err, users) => {
			if (err) return res.status(400).json({ success: false, err })
			res.status(200).json({ success: true, users })
		})
	} catch (err) {
		res.status(500).json({ msg: 'Something went wrong', eMsg: err.message })
	}
}
