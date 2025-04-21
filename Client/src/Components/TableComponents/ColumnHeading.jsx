import React from 'react'

const ColumnHeading = ({ children, align = 'left' }) => {
  return (
    <th className={`px-6 py-3 text-${align} text-sm font-semibold text-gray-600`}>
      {children}
    </th>
  )
}

export default ColumnHeading
