import { Table, TableRow, TableCell, ColumnHeading } from '../Components/TableComponent';
import { useFetch } from '../Hooks/useFetch'
import { getEnv } from '../Helpers/getEnv'
import Loading from '../Components/Loading'
import { showToast } from '../Helpers/showToast'
import { MdDelete } from "react-icons/md";
import { deleteData } from '../Helpers/handleDelete'

const Comments = () => {
    const { data, loading, error } = useFetch(`${getEnv('VITE_API_BASE_URL')}/comment/get-all-comments`, {
        method: 'GET',
        credentials: 'include',
    });
    
    const handleDelete =  (id) => {
        const response =  deleteData(`${getEnv('VITE_API_BASE_URL')}/comment/delete/${id}`)
        
        if (response) {
          window.location.reload(); // Add this line to refresh the page
          showToast('success', 'Comment deleted successfully')
          showToast('success', 'Comment deleted successfully')
        } else {
          showToast('error', 'Failed to delete comment')
        }
    }

    if (error) {
      console.error('Error fetching categories:', error);
    }

    if (loading) 
      return <Loading/>
    
  
  return (
    <div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-gray-800">Comment Details</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <Table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <TableRow>
              <ColumnHeading className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blog Name</ColumnHeading>
              <ColumnHeading className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comment By</ColumnHeading>
              <ColumnHeading className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</ColumnHeading>
                <ColumnHeading className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comment</ColumnHeading>
                <ColumnHeading className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</ColumnHeading>
            </TableRow>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data?.comments?.map((comment) => (
              <TableRow key={comment._id} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{comment.blogid?.title}</TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{comment.author?.name}</TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(comment.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{comment.comment}</TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                  <button onClick={() => handleDelete(comment._id)} className="text-red-600 hover:text-red-900 mx-1 cursor-pointer">
                    <MdDelete className="w-5 h-5" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
           
          </tbody>
        </Table>
      </div>
    </div>
    </div>
  )
}

export default Comments