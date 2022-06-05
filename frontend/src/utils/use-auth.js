import { useContext } from 'react'
import AuthContext from './auth-provider'

const useAuth = () => {
	return useContext(AuthContext)
}

export default useAuth
