import React from 'react'

function SideBarOptions({icon,title}) {
  return (
    <p className="flex gap-2 m-3 p-3 cursor-pointer hover:scale-110 hover:shadow-2xl hover:bg-purple-200"><big>{icon}</big> {title}</p>
  )
}

export default SideBarOptions