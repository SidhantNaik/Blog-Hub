import React from 'react'

const Button = ({title, onClick}) => {
  return (
    <button 
      onClick={onClick} 
      className="bg-purple-500 text-white py-2 px-6 rounded-full hover:bg-purple-600 hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
    >
      {title}
    </button>
  )
}

export default Button