import React from 'react'
import Topbar from './Topbar'
import { Outlet } from 'react-router-dom'
import SideBar from './SideBar'

 const Layout = () => {
    return (

        <>
            <Topbar></Topbar>

            <SideBar/>

            <main>

                <Outlet />

                
            </main>
        </>
    )
}

export default Layout