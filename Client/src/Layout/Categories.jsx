import React from 'react'
import {GoDotFill} from "react-icons/go"

function Categories({title}) {
  return (
    <div className="flex gap-2 m-1 my-6 p-3 cursor-pointer hover:scale-110 hover:shadow-2xl hover:bg-purple-200">
        <GoDotFill/> {title}
    </div>
  )
}

export default Categories