import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { RouteSignIn } from '../Helpers/RouteNames'

function OnlyAdminAllowed() {
    const { user } = useSelector((state) => state.user)

    if (user?.isLoggedIn && user?.role === 'admin') {
        return <Outlet />
    }
    
    return <Navigate to={RouteSignIn} />
}

export default OnlyAdminAllowed