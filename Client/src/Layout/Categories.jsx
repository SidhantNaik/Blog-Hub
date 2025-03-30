import React from 'react'
import {GoDotFill} from "react-icons/go"

function Categories({title}) {
  return (
    <div className="flex items-center gap-2 p-2 my-1 rounded-lg cursor-pointer hover:bg-purple-100 hover:scale-105 transition-all duration-200">
      <GoDotFill className="text-purple-500" />
      <span>{title}</span>
    </div>
  )
}

export default Categories