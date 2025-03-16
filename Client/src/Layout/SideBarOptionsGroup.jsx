import React from 'react'
import SideBarOptions from './SideBarOptions'
import { IoHome } from "react-icons/io5";
import { BiSolidCategory } from "react-icons/bi";
import { ImBlogger } from "react-icons/im";
import { FaComments } from "react-icons/fa";
import { FaUser } from "react-icons/fa";






function SideBarOptionsGroup() {
  return (
    <>
        <SideBarOptions icon={<IoHome/>} title={'Home'}/>
        <SideBarOptions icon={<BiSolidCategory />} title={'Categories'}/>
        <SideBarOptions icon={<ImBlogger />} title={'Blogs'}/>
        <SideBarOptions icon={<FaComments />} title={'Comments'}/>
        <SideBarOptions icon={<FaUser/>} title={'User'}/>
    </>
  )
}

export default SideBarOptionsGroup