import { formatDate } from '../utils/formatDate';
import { Table, TableRow, TableCell, ColumnHeading } from '../Components/TableComponent';
import { Link } from "react-router-dom";
import { RouteBlogAdd, RouteBlogEdit } from "../Helpers/RouteNames";
import Button from "../Components/Button";
import { deleteData } from '../Helpers/handleDelete'
import { showToast } from '../Helpers/showToast'
import Loading from '../Components/Loading'
import { useFetch } from '../Hooks/useFetch'
import { getEnv } from '../Helpers/getEnv'
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useParams } from "react-router-dom";

const GetUserBlogs = () => {
  const { userid } = useParams();


  const { data: blogData, loading, error } = useFetch(
    `${getEnv('VITE_API_BASE_URL')}/blog/get-user-blog/${userid}`,
    {
      method: 'GET',
      credentials: 'include',
    }
  );

  const handleDelete = async (id) => {
    try {
      const response = await deleteData(`${getEnv('VITE_API_BASE_URL')}/blog/delete/${id}`);
      
      if (response) {
        showToast('success', 'Blog deleted successfully')
        window.location.reload();
      } else {
        showToast('error', 'Failed to delete blog')
      }

    } catch (error) {
      console.error('Error deleting blog:', error);
      showToast('error', 'An error occurred while deleting the blog');
    }
  };


  if (error) {
    console.error('Error fetching blogs:', error);
  }

  if (loading) return <Loading />;

  if (!blogData?.blogs || blogData.blogs.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">My Blogs</h1>
        <div className="text-center text-gray-500 text-lg">No blogs found</div>
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-semibold text-gray-800">
            My Blogs
          </h1>
          <Link to={RouteBlogAdd}>
            <Button
              title="Add Blog"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm transition duration-150 ease-in-out"
            />
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <Table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <TableRow>
                <ColumnHeading className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Author
                </ColumnHeading>
                <ColumnHeading className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </ColumnHeading>
                <ColumnHeading className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </ColumnHeading>
                <ColumnHeading className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Blog
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
              {blogData?.blogs?.map((blog) => (
                <TableRow key={blog._id} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{blog?.author?.name}</TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{blog?.category?.name}</TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{blog?.title}</TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{blog?.slug}</TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(blog?.createdAt)}
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                    <button className="text-blue-600 hover:text-blue-900 mx-1 cursor-pointer">
                      <Link to={RouteBlogEdit(blog._id)}>
                        <FaEdit className="w-5 h-5" />
                      </Link>
                    </button>
                    <button onClick={() => handleDelete(blog._id)} className="text-red-600 hover:text-red-900 mx-1 cursor-pointer">
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

export default GetUserBlogs;
