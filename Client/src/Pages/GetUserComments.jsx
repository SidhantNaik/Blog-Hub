import { formatDate } from '../utils/formatDate';
import { Table, TableRow, TableCell, ColumnHeading } from '../Components/TableComponent'
import { deleteData } from '../Helpers/handleDelete';
import { showToast } from '../Helpers/showToast';
import Loading from '../Components/Loading';
import { useFetch } from '../Hooks/useFetch';
import { getEnv } from '../Helpers/getEnv';
import { MdDelete } from "react-icons/md";
import { useParams } from "react-router-dom";

const GetUserComments = () => {
  const { userid } = useParams();

  const { data: commentData, loading, error } = useFetch(
    `${getEnv('VITE_API_BASE_URL')}/comment/get-user-comments/${userid}`, // Corrected endpoint
    {
      method: 'GET',
      credentials: 'include',
    }
  );

  const handleDelete = async (id) => {
    try {
      const response = await deleteData(`${getEnv('VITE_API_BASE_URL')}/comment/delete/${id}`); // Corrected endpoint

      if (response) {
        showToast('success', 'Comment deleted successfully');
        window.location.reload();
      } else {
        showToast('error', 'Failed to delete comment');
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
      showToast('error', 'An error occurred while deleting the comment');
    }
  };

  if (error) {
    console.error('Error fetching user comments:', error); // Improved error log
  }

  if (loading) return <Loading />;

  if (!commentData?.comments || commentData.comments.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">My Comments</h1>
        <div className="text-center text-gray-500 text-lg">No comments found</div>
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">My Comments</h1>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <Table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <TableRow>
                <ColumnHeading className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Blog Title
                </ColumnHeading>
                <ColumnHeading className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Comment
                </ColumnHeading>
                <ColumnHeading className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </ColumnHeading>
                <ColumnHeading className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </ColumnHeading>
              </TableRow>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {commentData?.comments?.map((comment) => (
                <TableRow key={comment._id} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {comment.blogid.title}
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{comment.comment}</TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(comment.createdAt)}
                  </TableCell>
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
  );
};

export default GetUserComments;