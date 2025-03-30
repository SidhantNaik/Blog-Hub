import React from 'react'

const InputText = ({ placeholder, type, value, onChange }) => {
  return (
    <input 
      type={type} 
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required 
      className="w-full border-2 border-purple-300 rounded-lg p-2 mt-1 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
    />
  )
}

export default InputText