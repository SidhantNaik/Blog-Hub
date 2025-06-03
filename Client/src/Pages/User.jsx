import { Table, TableRow, TableCell, ColumnHeading } from '../Components/TableComponent';
import { useFetch } from '../hooks/useFetch'
import { getEnv } from '../Helpers/getEnv'
import Loading from '../Components/Loading'
import { showToast } from '../Helpers/showToast'
import { MdDelete } from "react-icons/md";
import { deleteData } from '../Helpers/handleDelete'
import FormatDate from '../Helpers/FormatDate'
import Avatar from '../Layout/UserProfile/Avatar'

const User = () => {
    const { data, loading, error } = useFetch(`${getEnv('VITE_API_BASE_URL')}/user/get-all-user`, {
        method: 'GET',
        credentials: 'include',
    });

    const handleDelete = (id) => {
        const response = deleteData(`${getEnv('VITE_API_BASE_URL')}/user/delete/${id}`)

        if (response) {
            window.location.reload();
            showToast('success', 'User deleted successfully')
        } else {
            showToast('error', 'Failed to delete user')
        }
    }

    if (error) {
        console.error('Error fetching User:', error);
    }

    if (loading)
        return <Loading />


    return (
        <div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-6 flex justify-between items-center">
                    <h1 className="text-3xl font-semibold text-gray-800">User Details</h1>
                </div>


                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <Table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <TableRow>
                                <ColumnHeading className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</ColumnHeading>
                                <ColumnHeading className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</ColumnHeading>
                                <ColumnHeading className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</ColumnHeading>
                                <ColumnHeading className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avatar</ColumnHeading>
                                <ColumnHeading className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</ColumnHeading>
                                <ColumnHeading className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</ColumnHeading>
                            </TableRow>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data?.user?.map((user) => (
                                <TableRow key={user._id} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.role}</TableCell>
                                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.name}</TableCell>
                                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</TableCell>
                                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">          
                                          <Avatar src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
                                    </TableCell>
                                   
                                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {user.createdAt ? FormatDate(user.createdAt) : 'N/A'}
                                    </TableCell>
                                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                                        <button onClick={() => handleDelete(user._id)} className="text-red-600 hover:text-red-900 mx-1 cursor-pointer">
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

export default User