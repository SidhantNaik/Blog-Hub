import React from 'react'
import Topbar from './Topbar'
import { Outlet } from 'react-router-dom'
import SideBar from './SideBar'
import Footer from './Footer'

 const Layout = () => {
    return (

        <>
            <Topbar></Topbar>

            <SideBar/>

            <main className="w-full h-full bg-red-400">

                <Outlet  />

                <Footer  />
                
            </main>
        </>
    )
}

export default Layout