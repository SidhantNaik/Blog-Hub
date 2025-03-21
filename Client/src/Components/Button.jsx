import React from 'react'

const Button = ({title}) => {
  return (
    <div className="bg-purple-500 text-white w-40 rounded-full text-center p-2 hover:cursor-pointer hover:scale-110 hover:bg-purple-600 hover:shadow-black hover:shadow-2xl">{title}</div>
  )
}

export default Button