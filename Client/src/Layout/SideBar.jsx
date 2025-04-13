import React, { useState } from 'react'
import SideBarOptionsGroup from './SideBarOptionsGroup'
import CategoriesGroup from './CategoriesGroup'
import { IoChevronDown, IoChevronUp } from 'react-icons/io5'

function SideBar() {
  const [showCategories, setShowCategories] = useState(false);

  return (
    <div className="border border-gray-400  shadow-md md:shadow-xl md:h-full md:sticky md:top-20">
      {/* Desktop Sidebar */}
      <div className="hidden md:block p-5">
        <SideBarOptionsGroup />
        <hr className="my-3" />
        <p className='text-gray-500 mt-2 font-medium'>Categories</p>
        <CategoriesGroup />
      </div>

      {/* Mobile Sidebar */}
      <div className="md:hidden">
        <div className="p-4">
          <SideBarOptionsGroup />
        </div>

        <div className="border-t border-gray-200">
          <button
            onClick={() => setShowCategories(!showCategories)}
            className="flex justify-between w-full p-4 text-gray-500 font-medium"
          >
            Categories
            <span>{showCategories ? <IoChevronUp /> : <IoChevronDown />}</span>
          </button>

          {showCategories && (
            <div className="p-2">
              <CategoriesGroup />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SideBar