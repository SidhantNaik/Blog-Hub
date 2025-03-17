import React from 'react'
import SideBarOptions from './SideBarOptions'
import { IoHome } from "react-icons/io5";
import { BiSolidCategory } from "react-icons/bi";
import { ImBlogger } from "react-icons/im";
import { FaComments } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { Link } from 'react-router-dom';



function SideBarOptionsGroup() {
  return (
    <>
      <SideBarOptions icon={<IoHome />} title={'Home'} >
        <Link to=""></Link>
      </SideBarOptions>

      <SideBarOptions icon={<BiSolidCategory />} title={'Categories'}  >
        <Link to=""></Link>
      </SideBarOptions>

      <SideBarOptions icon={<ImBlogger />} title={'Blogs'}  >
        <Link to=""></Link>
      </SideBarOptions>

      <SideBarOptions icon={<FaComments />} title={'Comments'} >
        <Link to=""></Link>
      </SideBarOptions>

      <SideBarOptions icon={<FaUser />} title={'User'}  >
        <Link to=""></Link>
      </SideBarOptions>

    </>
  )
}

export default SideBarOptionsGroup