import React from 'react'

const InputText = ({ placeholder, type }) => {

  return (
    <input type={type} placeholder={placeholder} required className="border-3 border-purple-300 rounded-2xl p-0  m-2 hover:border-purple-400 hover:shadow-2xl focus:outline-none focus:shadow-2xl lg:p-2 w-100" />
  )
}
export default InputText
