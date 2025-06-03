import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { RouteSignIn } from '../Helpers/RouteNames'

function AuthUserProtection() {
    const { user } = useSelector((state) => state.user)

    if(!user || !user.isLoggedIn) {
        return <Navigate to={RouteSignIn} />
    }

    return <Outlet />
}

export default AuthUserProtection