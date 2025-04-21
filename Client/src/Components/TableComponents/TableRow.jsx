import React from 'react'

const TableRow = ({ children, isHeader }) => {
  return (
    <tr className={isHeader ? 'bg-gray-100' : 'hover:bg-gray-50'}>
      {children}
    </tr>
  )
}

export default TableRow
