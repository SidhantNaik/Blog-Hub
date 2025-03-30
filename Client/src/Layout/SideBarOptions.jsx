import React from 'react'

function SideBarOptions({ icon, title}) {
  return (
    <div className="flex items-center gap-3 p-2 my-1 rounded-lg cursor-pointer hover:bg-purple-100 hover:scale-105 transition-all duration-200">
      <span className="text-xl text-purple-600">{icon}</span>
      <span className="font-medium">{title}</span>
    </div>
  )
}

export default SideBarOptions