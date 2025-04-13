import React from 'react'
import Topbar from './Topbar'
import { Outlet } from 'react-router-dom'
import SideBar from './SideBar'
import Footer from './Footer'

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Topbar />

            <main className="flex flex-col md:flex-row flex-grow">
                <div className="w-full md:w-1/4 lg:w-1/5">
                    <SideBar />
                </div>
                <div className="w-full  md:w-3/4 lg:w-4/5 p-4 pb-16">
                    <Outlet />
                </div>
            </main>
            
            <Footer />
        </div>
    )
}

export default Layout