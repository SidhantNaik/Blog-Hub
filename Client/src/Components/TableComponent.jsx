export const ColumnHeading = ({ children, align = 'left' }) => {
  return (
    <th className={`px-6 py-3 text-${align} bg-blue-100 text-sm font-semibold text-gray-600`}>
      {children}
    </th>
  )
}

export const Table = ({ children }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        {children}
      </table>
    </div>
  )
}


export const TableCell = ({ children, align = 'left' }) => {
  return (
    <td className={`px-6 py-4 text-${align} text-sm`}>
      {children}
    </td>
  )
}


export const TableRow = ({ children, isHeader }) => {
  return (
    <tr className={isHeader ? 'bg-gray-100' : 'hover:bg-gray-50'}>
      {children}
    </tr>
  )
}