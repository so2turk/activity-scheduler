import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import RefreshToken from '../utils/refresh-token'
import useAuth from '../utils/use-auth'
import Loading from '../components/loading'

const PersistentLogin = () => {
	const [isLoading, setIsLoading] = useState(true)
	const refresh = RefreshToken()
	const { auth, persist } = useAuth()

	useEffect(() => {
		let isMounted = true

		const verifyRefreshToken = async () => {
			try {
				await refresh()
			} catch (err) {
				console.error(err)
			} finally {
				isMounted && setIsLoading(false)
			}
		}

		!auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false)

		return () => (isMounted = false)

		// eslint-disable-next-line
	}, [])

	return <>{!persist ? <Outlet /> : isLoading ? <Loading /> : <Outlet />}</>
}

export default PersistentLogin
