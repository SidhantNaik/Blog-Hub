import React from 'react'
import { useSearchParams } from 'react-router-dom'
import {useFetch} from '../Hooks/useFetch'
import { getEnv } from '../Helpers/getEnv'
import Loading from '../Components/Loading'
import BlogCard from '../Components/BlogCard'

function SearchResult() {
  const [searchParams] = useSearchParams()
  const q = searchParams.get('q')

    const { data: blogData, loading, error } = useFetch(`${getEnv('VITE_API_BASE_URL')}/blog/search?q=${q}`, {
      method: 'GET',
      credentials: 'include',
    });
  
    if(loading) return <Loading/>
   

    return (
    <div>
      <h3 className="text-2xl font-bold mb-4 px-4">Search Results for: {q}</h3>
      <div className="container mx-auto px-4 py-8">
            {blogData?.blog && blogData.blog.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogData.blog.map((blog) => (
                        <BlogCard key={blog._id} props={blog} />
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-600 text-xl py-12">
                    No blogs found for "{q}"
                </div>
            )}
        </div>
    </div>
    )
}

export default SearchResult