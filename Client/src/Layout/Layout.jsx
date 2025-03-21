import React from 'react'
import Topbar from './Topbar'
import { Outlet } from 'react-router-dom'
import SideBar from './SideBar'
import Footer from './Footer'

const Layout = () => {
    return (
        <>
            <Topbar></Topbar>

            <main className="flex space-x-5  ">
                <SideBar  />
                <Outlet />
                <Footer className="fixed bottom-0 w-full" />
            </main>
        </>
    )
}

export default Layout
