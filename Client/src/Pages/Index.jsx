import {useFetch} from '../Hooks/useFetch'
import { getEnv } from '../Helpers/getEnv'
import Loading from '../Components/Loading'
import BlogCard from '../Components/BlogCard'

const Index = () => {

  const { data: blogData, loading, error } = useFetch(`${getEnv('VITE_API_BASE_URL')}/blog/get-all`, {
    method: 'GET',
    credentials: 'include',
  });

  if (loading) return <Loading />;

  return (
    <div className="container mx-auto px-4 py-8">
      {blogData && blogData.blog.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogData.blog.map((blog) => (
            <BlogCard key={blog._id} props={blog} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600 text-xl py-12">
          No blogs available
        </div>
      )}
    </div>
  )
}

export default Index