import { useEffect } from 'react'
import { axiosJWT } from './axios'
import RefreshToken from './refresh-token'
import useAuth from './use-auth'

const AxiosJWT = () => {
	const refresh = RefreshToken()
	const { auth } = useAuth()

	useEffect(() => {
		const reqIntercept = axiosJWT.interceptors.request.use(
			(config) => {
				if (!config.headers['authorization']) {
					config.headers['authorization'] = `Bearer ${auth?.accessToken}`
				}
				return config
			},
			(error) => Promise.reject(error)
		)

		const resIntercept = axiosJWT.interceptors.response.use(
			(res) => res,
			async (error) => {
				const prevRequest = error?.config
				if (error?.response?.status === 403 && !prevRequest?.sent) {
					prevRequest.sent = true
					const newAccessToken = await refresh()
					prevRequest.headers['authorization'] = `Bearer ${newAccessToken}`
					return axiosJWT(prevRequest)
				}
				return Promise.reject(error)
			}
		)

		return () => {
			axiosJWT.interceptors.request.eject(reqIntercept)
			axiosJWT.interceptors.response.eject(resIntercept)
		}
	}, [auth, refresh])

	return axiosJWT
}

export default AxiosJWT
