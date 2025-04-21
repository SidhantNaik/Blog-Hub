import React from 'react'

const TableCell = ({ children, align = 'left' }) => {
  return (
    <td className={`px-6 py-4 text-${align} text-sm`}>
      {children}
    </td>
  )
}

export default TableCell
