import useAuth from './use-auth'
import axios from '../utils/axios'

const RefreshToken = () => {
	const { setAuth } = useAuth()

	const refresh = async () => {
		const res = await axios.get('/jwt/refreshToken', {
			withCredentials: true,
		})
		setAuth((prev) => ({ ...prev, accessToken: res.data.accessToken }))
		return res.data.accessToken
	}
	return refresh
}

export default RefreshToken
