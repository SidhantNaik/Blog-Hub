import React from 'react'
import SideBarOptionsGroup from './SideBarOptionsGroup'
import CategoriesGroup from './CategoriesGroup'

function SideBar() {
  return (
    <div className=" border-1 border-gray-400 h-full  p-5 shadow-2xl">

      <SideBarOptionsGroup />

      <hr />
      <p className='text-gray-500 mt-2'>Categories</p>

      <CategoriesGroup  />

    </div>
  )
}

export default SideBar
