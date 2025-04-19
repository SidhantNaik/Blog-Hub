import React from 'react'
import { FaSpinner } from "react-icons/fa";

function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-4xl text-purple-500" />
    </div>
  )
}

export default Loading
