import { BiCategory } from "react-icons/bi"
import { useParams } from 'react-router-dom'
import {useFetch} from '../../Hooks/useFetch.js'

import { getEnv } from '../../Helpers/getEnv'
import Loading from '../../Components/Loading'
import BlogCard from '../../Components/BlogCard'

function BlogByCategory() {
    const { category } = useParams()

    const { data: blogData, loading, error } = useFetch(`${getEnv('VITE_API_BASE_URL')}/blog/get-blog-by-category/${category}`, {
        method: 'GET',
        credentials: 'include',
    });

    if (error) return <div className="text-center text-red-600 text-xl py-12">Error: {error.message}</div>;
    if (loading) return <Loading />;

    return (
        <>
            <h1 className='font-bold text-purple-500 text-2xl flex items-center gap-2'>
                <BiCategory/> {blogData.categoryData?.name} Blogs
            </h1>
            <br />
            <hr />
            <div className="container mx-auto px-4 py-8">
            {blogData?.blog && blogData.blog.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogData.blog.map((blog) => (
                        <BlogCard key={blog._id} props={blog} />
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-600 text-xl py-12">
                    No blogs available in {category} category
                </div>
            )}
        </div>
        </>
    )
}

export default BlogByCategory