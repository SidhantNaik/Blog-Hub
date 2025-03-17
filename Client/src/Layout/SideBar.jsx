import React from 'react'
import SideBarOptionsGroup from './SideBarOptionsGroup'
import CategoriesGroup from './CategoriesGroup'

function SideBar() {
  return (
    <div className=" border-1 border-gray-400 h-full p-2 w-1/7 shadow-2xl">

      <SideBarOptionsGroup/>

      <hr />
      <hr />
      <p className='text-gray-500 mt-2'>Categories</p>

      <CategoriesGroup/>
    </div>
  )
}

export default SideBar