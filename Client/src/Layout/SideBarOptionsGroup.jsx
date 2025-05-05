import React from 'react'
import { IoHome } from "react-icons/io5";
import { BiSolidCategory } from "react-icons/bi";
import { ImBlogger } from "react-icons/im";
import { FaComments, FaUser } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { RouteBlog, RouteCategoryDetails, RouteCommentsDetails, RouteIndex, RouteUser, RouteUserBlog } from '../Helpers/RouteNames';
import { useSelector } from 'react-redux';


const sidebarItemClass = "flex items-center gap-3 p-2 my-3 rounded-lg cursor-pointer hover:bg-purple-100 hover:scale-105 transition-all duration-200";
const iconClass = "text-xl text-purple-600";
const textClass = "font-medium";


function SideBarOptionsGroup() {
  const user = useSelector((state) => state.user);
  
  return (
    <>
      <SideBarOption icon={<IoHome />} title="Home" to={RouteIndex} />
      
      {user?.isLoggedIn && 
     <>
      <SideBarOption icon={<ImBlogger />} title="Blogs" to={user.user.role==='admin'?RouteBlog:RouteUserBlog(user.user?._id)} />
      <SideBarOption icon={<FaComments />} title="Comments" to={RouteCommentsDetails} />
     
     {user?.role === 'admin' &&
      <>
      <SideBarOption icon={<BiSolidCategory />} title="Categories" to={RouteCategoryDetails} />
      <SideBarOption icon={<FaUser />} title="User" to={RouteUser} /></>
     }
     </>
     }
    </>
  )
}


function SideBarOption({ icon, title, to }) {
  return (
    <Link to={to} className={sidebarItemClass}>
      <span className={iconClass}>{icon}</span>
      <span className={textClass}>{title}</span>
    </Link>
  );
}


export default SideBarOptionsGroup